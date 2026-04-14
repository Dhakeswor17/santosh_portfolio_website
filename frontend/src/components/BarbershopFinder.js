import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import { FaArrowLeft, FaStar, FaMapMarkerAlt, FaSearch, FaCut, FaSpinner, FaLocationArrow } from 'react-icons/fa';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const shopIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function MapUpdater({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom || 14);
    }
  }, [center, zoom, map]);
  return null;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function BarbershopFinder() {
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(true);
  const [searchRadius, setSearchRadius] = useState(3);
  const [selectedShop, setSelectedShop] = useState(null);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setLocating(false);
        },
        () => {
          setUserLocation({ lat: 60.1699, lng: 24.9384 });
          setLocating(false);
          setError('Could not get your location. Showing Helsinki as default.');
        }
      );
    } else {
      setUserLocation({ lat: 60.1699, lng: 24.9384 });
      setLocating(false);
    }
  }, []);

  const searchBarbershops = useCallback(async () => {
    if (!userLocation) return;
    setLoading(true);
    setError(null);
    setSearched(true);

    const radiusMeters = searchRadius * 1000;
    const query = `
      [out:json][timeout:25];
      (
        node["shop"="hairdresser"](around:${radiusMeters},${userLocation.lat},${userLocation.lng});
        node["shop"="barber"](around:${radiusMeters},${userLocation.lat},${userLocation.lng});
        way["shop"="hairdresser"](around:${radiusMeters},${userLocation.lat},${userLocation.lng});
        way["shop"="barber"](around:${radiusMeters},${userLocation.lat},${userLocation.lng});
      );
      out center body;
    `;

    try {
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: `data=${encodeURIComponent(query)}`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      if (!response.ok) throw new Error('Overpass API request failed');
      const data = await response.json();

      const results = data.elements
        .map((el) => {
          const lat = el.lat || (el.center && el.center.lat);
          const lon = el.lon || (el.center && el.center.lon);
          if (!lat || !lon) return null;

          const tags = el.tags || {};
          const dist = calculateDistance(userLocation.lat, userLocation.lng, lat, lon);

          return {
            id: el.id,
            name: tags.name || 'Barbershop',
            lat,
            lon,
            distance: dist,
            address: [tags['addr:street'], tags['addr:housenumber'], tags['addr:city']].filter(Boolean).join(', ') || null,
            phone: tags.phone || tags['contact:phone'] || null,
            website: tags.website || tags['contact:website'] || null,
            openingHours: tags.opening_hours || null,
            type: tags.shop === 'barber' ? 'Barber' : 'Hairdresser',
          };
        })
        .filter(Boolean)
        .sort((a, b) => a.distance - b.distance);

      setShops(results);
      if (results.length === 0) {
        setError(`No barbershops found within ${searchRadius} km. Try increasing the radius.`);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [userLocation, searchRadius]);

  const mapCenter = useMemo(() => {
    if (selectedShop) return [selectedShop.lat, selectedShop.lon];
    if (userLocation) return [userLocation.lat, userLocation.lng];
    return [60.1699, 24.9384];
  }, [userLocation, selectedShop]);

  const mapZoom = useMemo(() => {
    if (selectedShop) return 16;
    if (searchRadius <= 2) return 15;
    if (searchRadius <= 5) return 13;
    return 12;
  }, [selectedShop, searchRadius]);

  if (locating) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 section-bg">
        <FaSpinner className="animate-spin theme-accent text-3xl" />
        <p className="theme-text-secondary">Getting your location...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen section-bg">
      {/* Header */}
      <div className="sticky top-0 z-[1000] nav-scrolled">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate('/')}
              data-testid="back-button"
              className="theme-text-secondary hover:theme-text transition-colors"
            >
              <FaArrowLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
              <FaCut className="theme-accent" />
              <h1 className="text-base sm:text-xl font-bold theme-text">Barbershop Finder</h1>
            </div>
          </div>
          {shops.length > 0 && (
            <span className="text-xs sm:text-sm theme-text-muted">{shops.length} found</span>
          )}
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 py-6">
        {/* Search Controls */}
        <div className="theme-card rounded-xl p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="block text-xs font-medium theme-text-muted mb-2 uppercase tracking-wider">
                Search Radius
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={searchRadius}
                  onChange={(e) => setSearchRadius(Number(e.target.value))}
                  data-testid="radius-slider"
                  className="flex-1 h-2 rounded-lg appearance-none cursor-pointer"
                  style={{ accentColor: 'var(--accent)' }}
                />
                <span className="theme-text font-semibold text-sm w-14 text-right">{searchRadius} km</span>
              </div>
            </div>

            <button
              onClick={searchBarbershops}
              disabled={loading}
              data-testid="search-button"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-medium text-sm transition-all hover:scale-105 disabled:opacity-50"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              {loading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaSearch />
              )}
              {loading ? 'Searching...' : 'Find Barbershops'}
            </button>
          </div>

          {userLocation && (
            <div className="flex items-center gap-2 mt-3">
              <FaLocationArrow className="theme-accent text-xs" />
              <span className="text-xs theme-text-muted">
                Your location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
              </span>
            </div>
          )}
        </div>

        {error && (
          <div className="theme-card rounded-xl p-4 mb-6 border-yellow-500/30" style={{ borderColor: 'rgba(234, 179, 8, 0.3)' }}>
            <p className="text-sm" style={{ color: '#EAB308' }}>{error}</p>
          </div>
        )}

        {/* Map + Results */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Map */}
          <div className="lg:col-span-3 theme-card rounded-xl overflow-hidden" style={{ height: '500px' }}>
            {userLocation && (
              <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapUpdater center={mapCenter} zoom={mapZoom} />

                {/* User marker */}
                <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
                  <Popup>
                    <div className="text-center">
                      <strong>Your Location</strong>
                    </div>
                  </Popup>
                </Marker>

                {/* Radius circle */}
                <Circle
                  center={[userLocation.lat, userLocation.lng]}
                  radius={searchRadius * 1000}
                  pathOptions={{ color: '#4D9FFF', fillColor: '#4D9FFF', fillOpacity: 0.05, weight: 1 }}
                />

                {/* Shop markers */}
                {shops.map((shop) => (
                  <Marker
                    key={shop.id}
                    position={[shop.lat, shop.lon]}
                    icon={shopIcon}
                    eventHandlers={{
                      click: () => setSelectedShop(shop),
                    }}
                  >
                    <Popup>
                      <div style={{ minWidth: '180px' }}>
                        <strong style={{ fontSize: '14px' }}>{shop.name}</strong>
                        <br />
                        <span style={{ fontSize: '12px', color: '#666' }}>{shop.type}</span>
                        <br />
                        <span style={{ fontSize: '12px' }}>{shop.distance.toFixed(1)} km away</span>
                        {shop.address && (
                          <>
                            <br />
                            <span style={{ fontSize: '11px', color: '#888' }}>{shop.address}</span>
                          </>
                        )}
                        {shop.phone && (
                          <>
                            <br />
                            <a href={`tel:${shop.phone}`} style={{ fontSize: '12px', color: '#4D9FFF' }}>{shop.phone}</a>
                          </>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            )}
          </div>

          {/* Results List */}
          <div className="lg:col-span-2 space-y-3 overflow-y-auto" style={{ maxHeight: '500px' }}>
            {!searched && (
              <div className="theme-card rounded-xl p-8 text-center">
                <FaCut className="theme-text-muted text-3xl mx-auto mb-3" />
                <p className="theme-text-secondary text-sm">Set your search radius and click "Find Barbershops" to discover nearby shops.</p>
              </div>
            )}

            {searched && shops.length === 0 && !loading && (
              <div className="theme-card rounded-xl p-8 text-center">
                <FaMapMarkerAlt className="theme-text-muted text-3xl mx-auto mb-3" />
                <p className="theme-text-secondary text-sm">No barbershops found. Try increasing the radius.</p>
              </div>
            )}

            {shops.map((shop) => (
              <div
                key={shop.id}
                data-testid={`shop-card-${shop.id}`}
                onClick={() => setSelectedShop(shop)}
                className={`theme-card rounded-xl p-4 cursor-pointer transition-all hover:scale-[1.01] ${
                  selectedShop?.id === shop.id ? 'ring-2' : ''
                }`}
                style={selectedShop?.id === shop.id ? { ringColor: 'var(--accent)', borderColor: 'var(--accent)' } : {}}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 min-w-0 mr-3">
                    <h3 className="font-semibold theme-text text-sm truncate">{shop.name}</h3>
                    <span className="theme-tag text-xs px-2 py-0.5 rounded inline-block mt-1">{shop.type}</span>
                  </div>
                  <span className="theme-accent font-bold text-sm whitespace-nowrap">{shop.distance.toFixed(1)} km</span>
                </div>

                {shop.address && (
                  <div className="flex items-start gap-2 mt-2">
                    <FaMapMarkerAlt className="theme-text-muted text-xs mt-0.5 flex-shrink-0" />
                    <p className="theme-text-muted text-xs">{shop.address}</p>
                  </div>
                )}

                {shop.openingHours && (
                  <div className="flex items-start gap-2 mt-1">
                    <FaStar className="theme-text-muted text-xs mt-0.5 flex-shrink-0" />
                    <p className="theme-text-muted text-xs">{shop.openingHours}</p>
                  </div>
                )}

                <div className="flex items-center gap-3 mt-3">
                  {shop.phone && (
                    <a
                      href={`tel:${shop.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs font-medium px-3 py-1.5 rounded-md transition-all hover:scale-105"
                      style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
                    >
                      Call
                    </a>
                  )}
                  {shop.website && (
                    <a
                      href={shop.website}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs font-medium theme-tag px-3 py-1.5 rounded-md transition-all hover:scale-105"
                    >
                      Website
                    </a>
                  )}
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${shop.lat},${shop.lon}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs font-medium theme-tag px-3 py-1.5 rounded-md transition-all hover:scale-105"
                  >
                    Directions
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}