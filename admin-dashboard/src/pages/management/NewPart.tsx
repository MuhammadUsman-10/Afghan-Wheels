import { useState, FormEvent } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const navigate = useNavigate();
  const [partName, setPartName] = useState<string>("");
  const [price, setPrice] = useState<number | string>("");
  const [imageUrl, setImageUrl] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        setImageUrl(e.target.files[0]);
    }
};
    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("partName", partName);
      formData.append("price", String(price));
      formData.append("description", description);
      if (imageUrl) formData.append("image", imageUrl);

      try {
          const response = await axios.post("http://localhost:4000/addpart", formData, {
              headers: {
                  "Content-Type": "multipart/form-data",
              },
          });
          setSuccessMessage("Part added successfully!");
          setErrorMessage("");
          // Clear the form fields
          setPartName("");
          setImageUrl(null);
          setPrice("");
          setDescription("");
          setTimeout(() => {
            navigate('/admin/parts'); // Redirect after a short delay
          }, 1000); // Delay in milliseconds
      } catch (error) {
          console.error("Error adding part:", error);
          setErrorMessage("Failed to add part. Please try again.");
          setSuccessMessage("");
      }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <form onSubmit={submitHandler}>
            <h2>New Part</h2>
            <div>
              <label>Part Name</label>
              <input
                required
                type="text"
                placeholder="Part Name"
                value={partName}
                onChange={(e) => setPartName(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                required
                type="digits"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Description</label>
              <input
                required
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label>Photo</label>
              <input required type="file"  accept="image/*" onChange={handleImageChange}/>
              {/* {photo && <img src={photo} alt="New Image" />} */}
            </div>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <button type="submit">Create</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
