import React, { useState, useEffect, useCallback } from 'react';
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

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          setUserLocation({ lat: 60.1699, lng: 24.9384 });
        }
      );
    } else {
      setUserLocation({ lat: 60.1699, lng: 24.9384 });
    }
  };

  const searchNearbyShops = useCallback(async () => {
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
  }, [userLocation, searchRadius, backendUrl]);

  const sortShops = useCallback(() => {
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
  }, [barbershops, sortBy]);

  useEffect(() => {
    if (userLocation) {
      searchNearbyShops();
    }
  }, [userLocation, searchRadius, searchNearbyShops]);

  useEffect(() => {
    sortShops();
  }, [sortBy, barbershops, sortShops]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
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
            <button onClick={() => navigate('/')} className="text-[#A1A1AA] hover:text-[#F4F4F5]">
              <FaArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-[#F4F4F5]">Barbershop Finder</h1>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 py-8">
        <button
          onClick={searchNearbyShops}
          className="px-6 py-3 bg-[#4D9FFF] text-white rounded-lg"
        >
          <FaSearch /> Search ({filteredShops.length})
        </button>

        {filteredShops.map((shop) => (
          <div key={shop.id}>
            <h3>{shop.name}</h3>
            {userLocation && (
              <p>
                {calculateDistance(
                  userLocation.lat,
                  userLocation.lng,
                  shop.latitude,
                  shop.longitude
                )}{' '}
                km
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}