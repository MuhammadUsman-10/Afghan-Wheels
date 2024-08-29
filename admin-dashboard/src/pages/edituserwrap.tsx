import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import EditUserModal from "./edituser";

const EditUserWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [id]);

  const handleUpdate = (updatedUser: any) => {
    setUser(updatedUser);
  };

  const handleClose = () => {
    navigate("/admin/users");
  };

  if (!user) return <div>Loading...</div>;

  return (
    <EditUserModal
      user={user}
      onClose={handleClose}
      onUpdate={handleUpdate}
    />
  );
};

export default EditUserWrapper;
