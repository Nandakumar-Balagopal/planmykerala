/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';

interface OpenStreetMapProps {
  locations: Array<{ lat: number; lng: number; label: string; spend?: number; activities?: string[] }>;
}

export default function OpenStreetMap({ locations }: OpenStreetMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    const container = mapRef.current;
    if (!container) return;
    let cancelled = false;

    const ensureCss = () => {
      if (document.getElementById('leaflet-css')) return;
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet/dist/leaflet.css';
      document.head.appendChild(link);
    };

    const loadAndInit = async () => {
      try {
        ensureCss();
        const { default: L } = await import('leaflet');
        if (cancelled) return;

        let map = mapInstanceRef.current;
        if (!map) {
          map = L.map(container).setView([locations[0]?.lat || 10, locations[0]?.lng || 76], 7);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
          }).addTo(map);
          mapInstanceRef.current = map;
          setTimeout(() => {
            try { map.invalidateSize(); } catch (_) {}
          }, 40);
        }

        if (map._markers) {
          map._markers.forEach((m: any) => m.remove());
        }
        map._markers = [];

        const icon = L.icon({
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -28],
          shadowSize: [41, 41],
        });

        locations.forEach(loc => {
          const popupContent = `
            <div style='min-width:120px;'>
              <div><strong>${loc.label}</strong></div>
              <div>Avg Spend: ₹${loc.spend ?? '—'}</div>
              <div>Activities:</div>
              <ul style='margin:0;padding-left:16px;'>
                ${(loc.activities || []).map(a => `<li>${a}</li>`).join('')}
              </ul>
            </div>
          `;
          const marker = L.marker([loc.lat, loc.lng], { icon }).addTo(map).bindPopup(popupContent);
          map._markers.push(marker);
        });

        if (locations.length > 0) {
          if (locations.length === 1) {
            map.setView([locations[0].lat, locations[0].lng], 9);
          } else {
            const bounds = L.latLngBounds(locations.map(l => [l.lat, l.lng]));
            map.fitBounds(bounds, { padding: [20, 20] });
          }
        }

        try { map.invalidateSize(); } catch (_) {}
      } catch (err) {
        console.error('Failed to load map', err);
      }
    };

    loadAndInit();

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [locations]);

  return (
    <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
  );
}
