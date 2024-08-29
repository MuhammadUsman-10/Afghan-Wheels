import { ReactElement, useCallback, useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import TableHOC from "../components/TableHOC";
import { Column } from "react-table";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import axios from 'axios';

interface DataType {
  _id: string;
  photo: ReactElement;
  partName: string;
  price: number;
  description: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Part Name",
    accessor: "partName",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const AutoParts = () => {
  const [data, setData] = useState<DataType[]>([]);
const navigate =  useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/parts');
        const parts = response.data.map((part: any) => ({
          _id: part._id,
          photo: <img src={part.imageUrl} alt={part.partName} />,
          partName: part.partName,
          price: part.price,
          action: (
            <>
            <button onClick={() => navigate(`/admin/parts/${part._id}`)}>
              <FaEdit />
            </button>
            <button onClick={() => handleDelete(part._id)}>
              <FaTrash />
            </button>
          </>
          ),
        }));
        setData(parts);
      } catch (error) {
        console.error("Error fetching parts:", error);
      }
    };

    fetchData();
  }, []);


  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:4000/api/parts/${id}`);
      setData((prevData) => prevData.filter((part) => part._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };


  const Table = useCallback(
    TableHOC<DataType>(
      columns,
      data,
      "dashboard-part-box",
      "Parts",
      true
    ),
    [data]
  );

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table()}</main>
      <Link to="/admin/parts/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default AutoParts;
