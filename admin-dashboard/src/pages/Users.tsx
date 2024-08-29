import { ReactElement, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import { Column } from "react-table";
import TableHOC from "../components/TableHOC";
import EditUserModal from "./edituser"
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from 'axios';

interface DataType {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  mobile: number;
  role: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "FirstName",
    accessor: "firstname",
  },
  {
    Header: "LirstName",
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
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Users = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [selecteduser, setSelecteduser] = useState<any>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/users');
        const users = response.data.map((user: any) => ({
          _id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          mobile: user.mobile,
          role: user.role,
          action: (
            <>
            <button onClick={() => navigate(`/admin/users/${user._id}`)}>
              <FaEdit />
            </button>
            <button onClick={() => handleDelete(user._id)}>
              <FaTrash />
            </button>
          </>
          ),
        }));
        setData(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user: DataType) => {
    setSelecteduser(user);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:4000/api/users/${id}`);
      setData((prevData) => prevData.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdate = (updatedCustomer: DataType) => {
    setData((prevData) =>
      prevData.map((customer) =>
        customer._id === updatedCustomer._id ? updatedCustomer : customer
      )
    );
  };
  const Table = useCallback(
    TableHOC<DataType>(
      columns,
      data,
      "dashboard-product-box",
      "Users",
      true
    ),
    [data]
  );

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table()}</main>
      {selecteduser && (
        <EditUserModal
          user={selecteduser}
          onUpdate={handleUpdate}
          onClose={() => setSelecteduser(null)}
        />
      )}
    </div>
  );
};

export default Users;
