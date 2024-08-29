import { ReactElement, useCallback, useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import TableHOC from "../components/TableHOC";
import { Column } from "react-table";
import { Link, useNavigate} from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import axios from 'axios';

interface DataType {
  _id: string;
  photo: ReactElement;
  name: string;
  model: string;
  price: number;
  category: string;
  variant: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Make",
    accessor: "name",
  },
  {
    Header: "Model",
    accessor: "model",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Category",
    accessor: "category",
  },
  {
    Header: "Variant",
    accessor: "variant",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Cars = () => {
  const [data, setData] = useState<DataType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/cars');
        const cars = response.data.map((car: any) => ({
          photo: <img src={car.imageURL} alt={car.name} />,
          _id: car._id,
          name: car.make,
          model: car.model,
          price: car.price,
          category: car.category,
          variant: car.variant,
          action: (
            <>
            <button onClick={() => navigate(`/admin/cars/${car._id}`)}>
              <FaEdit />
            </button>
            <button onClick={() => handleDelete(car._id)}>
              <FaTrash />
            </button>
          </>
          ),
        }));
        setData(cars);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:4000/api/cars/${id}`);
      setData((prevData) => prevData.filter((car) => car._id !== id));
    } catch (error) {
      console.error("Error deleting  car:", error);
    }
  };

  const Table = useCallback(
    TableHOC<DataType>(
      columns,
      data,
      "dashboard-product-box",
      "Cars",
      true
    ),
    [data]
  );

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table()}</main>
      <Link to="/admin/cars/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Cars;
