// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Bookings from '../pages/Booking';
// import Dashboard from '../pages/Dashboard';

// const DashboardContainer = () => {
//   const [bookings, setBookings] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/api/bookings');
//         setBookings(response.data);
//       } catch (err) {
//         setError('Error fetching bookings');
//         console.error("Error fetching bookings:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <Bookings bookings={bookings} />
//       <Dashboard bookings={bookings} />
//     </div>
//   );
// };

// export default DashboardContainer;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const DashboardCategories = () => {
//   const [carStats, setCarStats] = useState({
//     newCars: 0,
//     usedCars: 0,
//     automatic: 0,
//     manual: 0,
//   });

//   useEffect(() => {
//     // Assuming you have a fetchCars function that fetches your car data
//     const fetchCarData = async () => {
//       const carData = await axios.get('http://localhost:4000/api/cars');

//       const newCars = carData.filter(car => car.type === 'New').length;
//       const usedCars = carData.filter(car => car.type === 'Used').length;
//       const automatic = carData.filter(car => car.transmission === 'Automatic').length;
//       const manual = carData.filter(car => car.transmission === 'Manual').length;

//       setCarStats({ newCars, usedCars, automatic, manual });
//     };

//     fetchCarData();
//   }, []);

//   const categories = [
//     { heading: 'New Cars', value: carStats.newCars },
//     { heading: 'Used Cars', value: carStats.usedCars },
//     { heading: 'Automatic', value: carStats.automatic },
//     { heading: 'Manual', value: carStats.manual },
//   ];

//   return (
//     <div className="dashboard-categories">
//       <h2>Inventory</h2>
//       <div>
//         {categories.map((category) => (
//           <CategoryItem
//             key={category.heading}
//             heading={category.heading}
//             value={category.value}
//             color={`hsl(${category.value * 4},${category.value}%,50%)`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DashboardCategories;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define the type for a single car object
interface Car {
  category: "New Car" | "Used Car";
  variant: "Automatic" | "Manual";
}

// Define the type for the car statistics state
interface CarStats {
  newCars: number;
  usedCars: number;
  automatic: number;
  manual: number;
}

// Define the type for the category item prop
interface CategoryItemProps {
  heading: string;
  value: number;
  color: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ heading, value}) => (
  <div>
    <h3>{heading}</h3>
    <p>{value}</p>
  </div>
);

const DashboardCategories: React.FC = () => {
  const [carStats, setCarStats] = useState<CarStats>({
    newCars: 0,
    usedCars: 0,
    automatic: 0,
    manual: 0,
  });

  useEffect(() => {
    const fetchCarData = async () => {
      const response = await axios.get('http://localhost:4000/api/cars'); // Make sure fetchCars returns an array of Car objects
      const carData = response.data;

      if(Array.isArray(carData)) {
      const newCars = carData.filter(car => car.category === 'New Car').length;
      console.log('New Cars:', newCars);
      const usedCars = carData.filter(car => car.category === 'Used Car').length;
      console.log('Used Cars:', usedCars);
      const automatic = carData.filter(car => car.variant === 'Automatic').length;
      console.log('Automatic:', automatic);
      const manual = carData.filter(car => car.variant === 'Manual').length;
      console.log('Manual:', manual);

      setCarStats({ newCars, usedCars, automatic, manual });
      }
    };
  

    fetchCarData();
  }, []);

  const categories = [
    { heading: 'New Cars', value: carStats.newCars },
    { heading: 'Used Cars', value: carStats.usedCars },
    { heading: 'Automatic', value: carStats.automatic },
    { heading: 'Manual', value: carStats.manual },
  ];

  return (
    <div className="dashboard-categories">
      <h2>Inventory</h2>
      <div>
        {categories.map((category) => (
          <CategoryItem
            key={category.heading}
            heading={category.heading}
            value={category.value}
            color={`hsl(${category.value * 4},${category.value}%,50%)`}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardCategories;
