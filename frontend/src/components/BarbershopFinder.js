import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { FaArrowLeft, FaStar, FaPhone, FaClock, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 13);
    }
  }, [center, map]);
  return null;
}

export default function BarbershopFinder() {
  const navigate = useNavigate();
  const [barbershops, setBarbershops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedShop, setSelectedShop] = useState(null);
  const [searchRadius, setSearchRadius] = useState(5);
  const [sortBy, setSortBy] = useState('distance');

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (userLocation) {
      searchNearbyShops();
    }
  }, [userLocation, searchRadius]);

  useEffect(() => {
    sortShops();
  }, [sortBy, barbershops]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
        },
        (error) => {
          console.error('Error getting location:', error);
          const defaultLocation = { lat: 60.1699, lng: 24.9384 };
          setUserLocation(defaultLocation);
        }
      );
    } else {
      const defaultLocation = { lat: 60.1699, lng: 24.9384 };
      setUserLocation(defaultLocation);
    }
  };

  const searchNearbyShops = async () => {
    if (!userLocation) return;
    
    try {
      const response = await axios.post(`${backendUrl}/api/barbershop/search`, {
        latitude: userLocation.lat,
        longitude: userLocation.lng,
        radiusKm: searchRadius
      });
      setBarbershops(response.data);
      setFilteredShops(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching barbershops:', error);
      setLoading(false);
    }
  };

  const sortShops = () => {
    let sorted = [...barbershops];
    if (sortBy === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'reviews') {
      sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (sortBy === 'price-low') {
      sorted.sort((a, b) => a.priceRange.length - b.priceRange.length);
    } else if (sortBy === 'price-high') {
      sorted.sort((a, b) => b.priceRange.length - a.priceRange.length);
    }
    setFilteredShops(sorted);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="text-yellow-400" style={{ opacity: 0.5 }} />);
    }
    const remaining = 5 - stars.length;
    for (let i = 0; i < remaining; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-600" />);
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0A0A' }}>
        <p className="text-[#A1A1AA]">Finding barbershops near you...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0A0A' }}>
      <div className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              data-testid="back-to-portfolio"
              className="text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors"
            >
              <FaArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-[#F4F4F5]">Barbershop Finder</h1>
          </div>
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-[#4D9FFF]" />
            <span className="text-sm text-[#A1A1AA]">Helsinki Region</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 py-8">
        <div className="mb-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm text-[#A1A1AA] mb-2 block">Search Radius</label>
              <select
                value={searchRadius}
                onChange={(e) => setSearchRadius(Number(e.target.value))}
                data-testid="radius-select"
                className="w-full bg-[#18181B] border border-white/10 rounded-lg px-4 py-3 text-[#F4F4F5] focus:outline-none focus:border-[#4D9FFF]"
              >
                <option value={2}>2 km</option>
                <option value={5}>5 km</option>
                <option value={10}>10 km</option>
                <option value={20}>20 km</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-[#A1A1AA] mb-2 block">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                data-testid="sort-select"
                className="w-full bg-[#18181B] border border-white/10 rounded-lg px-4 py-3 text-[#F4F4F5] focus:outline-none focus:border-[#4D9FFF]"
              >
                <option value="distance">Distance</option>
                <option value="rating">Highest Rating</option>
                <option value="reviews">Most Reviews</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={searchNearbyShops}
                data-testid="search-button"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#4D9FFF] text-white font-medium rounded-lg hover:bg-[#7CB9FF] transition-colors"
              >
                <FaSearch />
                Search ({filteredShops.length} found)
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto pr-4" style={{ scrollbarWidth: 'thin' }}>
            {filteredShops.length === 0 ? (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-12 text-center">
                <p className="text-[#A1A1AA] text-lg">No barbershops found in this area.</p>
                <p className="text-[#71717A] text-sm mt-2">Try increasing the search radius.</p>
              </div>
            ) : (
              filteredShops.map((shop) => (
                <div
                  key={shop.id}
                  data-testid={`barbershop-${shop.id}`}
                  onClick={() => setSelectedShop(shop)}
                  className={`bg-[#18181B] border rounded-lg p-6 cursor-pointer transition-all ${
                    selectedShop?.id === shop.id ? 'border-[#4D9FFF] shadow-lg' : 'border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex gap-4">
                    {shop.imageUrl && (
                      <img
                        src={shop.imageUrl}
                        alt={shop.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-[#F4F4F5]">{shop.name}</h3>
                        <span className="text-[#4D9FFF] font-medium">{shop.priceRange}</span>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex gap-1">
                          {renderStars(shop.rating)}
                        </div>
                        <span className="text-sm text-[#F4F4F5]">{shop.rating.toFixed(1)}</span>
                        <span className="text-xs text-[#71717A]">({shop.reviewCount} reviews)</span>
                      </div>

                      <div className="flex items-center gap-2 mb-2 text-sm text-[#A1A1AA]">
                        <FaMapMarkerAlt className="text-[#4D9FFF]" size={12} />
                        <span>{shop.address}</span>
                      </div>

                      {userLocation && (
                        <div className="text-xs text-[#71717A] mb-3">
                          {calculateDistance(userLocation.lat, userLocation.lng, shop.latitude, shop.longitude)} km away
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 mb-3">
                        {shop.services.slice(0, 3).map((service, i) => (
                          <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-[#A1A1AA]">
                            {service}
                          </span>
                        ))}
                      </div>

                      {shop.phone && (
                        <div className="flex items-center gap-2 text-sm text-[#A1A1AA]">
                          <FaPhone className="text-[#4D9FFF]" size={12} />
                          <a href={`tel:${shop.phone}`} className="hover:text-[#4D9FFF]">{shop.phone}</a>
                        </div>
                      )}

                      {shop.openingHours && (
                        <div className="flex items-center gap-2 text-xs text-[#71717A] mt-2">
                          <FaClock size={10} />
                          <span>{shop.openingHours}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="sticky top-32 h-[calc(100vh-200px)]">
            <div className="bg-[#18181B] border border-white/5 rounded-lg overflow-hidden h-full">
              {userLocation && (
                <MapContainer
                  center={[userLocation.lat, userLocation.lng]}
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  />
                  {filteredShops.map((shop) => (
                    <Marker
                      key={shop.id}
                      position={[shop.latitude, shop.longitude]}
                      eventHandlers={{
                        click: () => setSelectedShop(shop)
                      }}
                    >
                      <Popup>
                        <div className="text-sm">
                          <p className="font-semibold text-black">{shop.name}</p>
                          <p className="text-xs text-gray-600 mt-1">{shop.address}</p>
                          <div className="flex items-center gap-1 mt-2">
                            <FaStar className="text-yellow-400" size={12} />
                            <span className="text-xs">{shop.rating.toFixed(1)} ({shop.reviewCount})</span>
                          </div>
                          <p className="text-xs font-semibold text-blue-600 mt-1">{shop.priceRange}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                  {selectedShop && <MapUpdater center={[selectedShop.latitude, selectedShop.longitude]} />}
                </MapContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
