import React, { useRef, useEffect, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(14);
  const [API_KEY] = useState('FZT7hZoohtpQoDTWktP6');
  const [nearbyLocations, setNearbyLocations] = useState([
    {
      id: 1,
      name: "Location A",
      location: { lat: 31.245456, lng: 34.781482 },
    },
    {
      id: 2,
      name: "Holmes Place Beer-Sheva",
      location: { lat: 31.245352, lng: 34.783487 },
    },
    {
      id: 3,
      name: "Space fix",
      location: { lat: 31.237323, lng: 34.798565 },
    },
    {
      id: 4,
      name: "Shape Plus",
      location: { lat: 31.243292, lng: 34.802367 },
    },
  ]);

  useEffect(() => {
    if (map.current) return;
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom
    });

    new maplibregl.Marker()
      .setLngLat([lng, lat])
      .addTo(map.current);

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    navigator.geolocation.getCurrentPosition(position => {
      setLng(position.coords.longitude);
      setLat(position.coords.latitude);
      map.current.setCenter([position.coords.longitude, position.coords.latitude]);
      new maplibregl.Marker()
        .setLngLat([position.coords.longitude, position.coords.latitude])
        .addTo(map.current);
    });

    // Add markers for nearby locations
    nearbyLocations.forEach(location => {
      new maplibregl.Marker({ color: 'red' })
        .setLngLat([location.location.lng, location.location.lat])
        .addTo(map.current);
    });

  }, [lng, lat, zoom, nearbyLocations]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}