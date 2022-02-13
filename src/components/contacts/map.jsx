import { useRef, useState, useEffect } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

function Map({address}) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const currentCustomIcon = leaflet.icon({
    iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: address.lat,
          lng: address.lng,
        },
        zoom: address.zoom,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);

      setMap(instance);

      leaflet
        .marker({
          lat: address.lat,
          lng: address.lng,
        },{
          icon: currentCustomIcon,
        })
        .addTo(instance);
    }
  }, [mapRef, map, address, currentCustomIcon]);

  return (
    <div
      style={{height: '336px', width: '649px'}}
      ref={mapRef}
    >
    </div>
  );
}

export default Map;
