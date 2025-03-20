
import React, { useEffect, useRef, useState } from 'react';
import { attractions } from '@/lib/data';
import AttractionMarker from './AttractionMarker';

// This is a simulation of a map - in a real implementation we'd use a library like Mapbox or Google Maps
const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedAttraction, setSelectedAttraction] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[500px] overflow-hidden rounded-xl shadow-md">
      {/* Map loading state */}
      {!mapLoaded && (
        <div className="absolute inset-0 bg-secondary flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            <span className="text-sm font-medium">Kraunamas žemėlapis...</span>
          </div>
        </div>
      )}

      {/* Lithuania map background */}
      <div 
        ref={mapRef}
        className={`w-full h-full relative transition-opacity duration-1000 ${mapLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          backgroundImage: 'url("/lovable-uploads/4c2fdec9-be0f-4290-ba6c-37e8aaf7dee3.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Attraction markers */}
        {attractions.map((attraction) => (
          <AttractionMarker
            key={attraction.id}
            attraction={attraction}
            isSelected={selectedAttraction === attraction.id}
            onClick={() => setSelectedAttraction(attraction.id)}
          />
        ))}

        {/* Glass effect overlay at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/30 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

export default Map;
