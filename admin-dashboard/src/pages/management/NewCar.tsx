import { useState, FormEvent } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewProduct = () => {
  const navigate = useNavigate();
  const [make, setMake] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [variant, setVariant] = useState<string>("");
  const [price, setPrice] = useState<number | string>();
  const [city, setCity] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        setImage(e.target.files[0]);
    }
};
const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("make", make);
  formData.append("model", model);
  formData.append("city", city);
  formData.append("variant", variant);
  formData.append("category", category);
  formData.append("price", String(price));
  formData.append("description", description);
  if (image) formData.append("image", image);

  try {
      const response = await axios.post("http://localhost:4000/addcar", formData, {
          headers: {
              "Content-Type": "multipart/form-data",
          },
      });
      setSuccessMessage("Car added successfully!");
      setErrorMessage("");
      // Clear the form fields
      setMake("");
      setModel("");
      setCity("");
      setVariant("");
      setCategory("");
      setImage(null);
      setPrice("");
      setDescription("");
      setTimeout(() => {
        navigate('/admin/cars'); // Redirect after a short delay
      }, 1000); // Delay in milliseconds
  } catch (error) {
      console.error("Error adding car:", error);
      setErrorMessage("Failed to add car. Please try again.");
      setSuccessMessage("");
  }
};
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <form onSubmit={submitHandler}>
            <h2>New Car</h2>
            <div>
              <label>Make</label>
              <input
                required
                type="text"
                placeholder="Make"
                value={make}
                onChange={(e) => setMake(e.target.value)}
              />
            </div>
            <div>
              <label>Model</label>
              <input
                required
                type="text"
                placeholder="Model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </div>
            <div>
              <label>Variant</label>
              <input
                required
                type="text"
                placeholder="Variant"
                value={variant}
                onChange={(e) => setVariant(e.target.value)}
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
              <label>City</label>
              <input
                required
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <label>Category</label>
              <input
                required
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
              <input required type="file" accept="image/*" onChange={handleImageChange} />
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
