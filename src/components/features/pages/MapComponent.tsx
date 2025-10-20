'use client';

import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Next.js
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapComponent = () => {
  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      // Coordinates for Amrahia-Dodowa Road area (approximate center point)
      const map = L.map('map').setView([5.7016, -0.1869], 13);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Add a marker for Amrahia-Dodowa Road
      L.marker([5.7016, -0.1869], { icon: defaultIcon })
        .addTo(map)
        .bindPopup('Amrahia-Dodowa Road')
        .openPopup();

      // Clean up function
      return () => {
        map.remove();
      };
    }
  }, []);

  return (
    <div className="w-full h-full relative z-0">
      <div id="map" className="w-full h-full relative z-0"></div>
    </div>
  );
};

export default MapComponent;
