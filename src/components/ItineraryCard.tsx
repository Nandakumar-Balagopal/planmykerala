import React from 'react';

interface ItineraryCardProps {
  title: string;
  description: string;
  image: string;
}

const ItineraryCard: React.FC<ItineraryCardProps> = ({ title, description, image }) => {
  return (
    <div className="air-card overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--pmk-text)' }}>{title}</h2>
        <p className="air-muted mb-4">{description}</p>
        <button className="bg-[var(--pmk-text)] px-4 py-2 rounded-md text-white font-semibold">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ItineraryCard;