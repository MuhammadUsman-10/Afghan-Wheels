import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create Context
export const CarContext = createContext();

// Provider Component
export const CarProvider = ({ children }) => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    };

    fetchCars();
  }, []);

  return (
    <CarContext.Provider value={{ cars }}>
      {children}
    </CarContext.Provider>
  );
};
