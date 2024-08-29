import { ReactElement, useCallback, useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import DashboardTable from "../components/DashboardTable";
import TableHOC from "../components/TableHOC";
import { Column } from "react-table";
import { FaTrash } from "react-icons/fa";
import axios from 'axios';

interface DataType {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  mobile: number;
  fromAddress: string;
  toAddress: string;
  message: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "First Name",
    accessor: "firstname",
  },
  {
    Header: "Last name",
    accessor: "lastname",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Mobile",
    accessor: "mobile",
  },
  {
    Header: "From Address",
    accessor: "fromAddress",
  },
  {
    Header: "To Address",
    accessor: "toAddress",
  },
  {
    Header: "Message",
    accessor: "message",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Bookings = () => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/bookings');
        const products = response.data.map((product: any) => ({
          _id: product._id,
          firstname: product.firstname,
          lastname: product.lastname,
          email: product.email,
          mobile: product.mobile,
          fromAddress: product.fromAddress,
          toAddress: product.toAddress,
          message: product.message,
          action: (
            <>
            <button onClick={() => handleDelete(product._id)}>
              <FaTrash />
            </button>
          </>
          ),
        }));
        setData(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:4000/api/bookings/${id}`);
      setData((prevData) => prevData.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting  car:", error);
    }
  };

  const Table = useCallback(
    TableHOC<DataType>(
      columns,
      data,
      "dashboard-product-box",
      "Bookings",
      true
    ),
    [data]
  );

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table()}
      </main>
    </div>
  );
};

export default Bookings;
