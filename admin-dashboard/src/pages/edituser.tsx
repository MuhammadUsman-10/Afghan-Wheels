import { useState, FormEvent } from "react";
import AdminSidebar from "../components/AdminSidebar";
import axios from "axios";

interface EditUserModalProps {
  user: {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    mobile: number;
    role: string;
  };
  onClose: () => void;
  onUpdate: (updatedUser: {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    mobile: number;
    role: string;
  }) => void;
}

const EditUserModal = ({ user, onClose, onUpdate }: EditUserModalProps) => {
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [email, setEmail] = useState(user.email);
  const [mobile, setMobile] = useState(user.mobile);
  const [role, setRole] = useState(user.role);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:4000/api/users/${user._id}`, {
        firstname,
        lastname,
        email,
        mobile,
        role,
      });
      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="product-management">
        <article>
        <form onSubmit={handleSubmit}>
        <h2>Edit User</h2>
          <div>
            <label>FirstName</label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div>
            <label>LastName</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Mobile</label>
            <input
              type="number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <div>
            <label>Role</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <button type="submit">Save</button>
          <button onClick={onClose}>Close</button>
        </form>
        </article>
      </div>
    </div>
  );
};

export default EditUserModal;
