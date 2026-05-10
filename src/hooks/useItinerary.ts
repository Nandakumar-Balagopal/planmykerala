import { useState } from 'react';
import { ItineraryItem } from '../types';

const useItinerary = () => {
    const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);

    const addItem = (item: ItineraryItem) => {
        setItinerary(prev => [...prev, item]);
    };

    const updateItem = (index: number, updatedItem: ItineraryItem) => {
        setItinerary(prev => {
            const newItinerary = [...prev];
            newItinerary[index] = updatedItem;
            return newItinerary;
        });
    };

    const removeItem = (index: number) => {
        setItinerary(prev => prev.filter((_, i) => i !== index));
    };

    const clearItinerary = () => {
        setItinerary([]);
    };

    return {
        itinerary,
        addItem,
        updateItem,
        removeItem,
        clearItinerary,
    };
};

export default useItinerary;