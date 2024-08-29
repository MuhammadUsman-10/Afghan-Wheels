import { useEffect, useState, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import axios from "axios";
// const img =
//   "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const ProductManagement = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Get the product ID from the URL
  const [partName, setPartName] = useState<string>("");
  const [price, setPrice] = useState<number | string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [nameUpdate, setNameUpdate] = useState<string>(partName);
  const [priceUpdate, setPriceUpdate] = useState<number | string>(price);
  const [descriptionUpdate, setDescriptionUpdate] = useState<string>(description);
  const [photoUpdate, setPhotoUpdate] = useState<File | null>(image);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/parts/${id}`);
        const part = response.data;
        setPartName(part.partName);
        setPrice(part.price);
        setDescription(part.description);
        setImage(part.imageUrl);
        setNameUpdate(part.partName);
        setPriceUpdate(part.price);
        setDescriptionUpdate(part.description);
        setPhotoUpdate(part.imageUrl);
      } catch (error) {
        console.error("Error fetching part:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        setImage(e.target.files[0]);
    }
};

   const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/parts/${id}`, {
        partName: nameUpdate,
        price: priceUpdate,
        description: descriptionUpdate,
        imageUrl: photoUpdate,
      });
      setSuccessMessage("Part Updated successfully!");
      setErrorMessage("");
      setPartName(nameUpdate);
      setPrice(priceUpdate);
      setDescription(descriptionUpdate);
      setImage(photoUpdate);
      setTimeout(() => {
        navigate('/admin/parts'); // Redirect after a short delay
      }, 1000); // Delay in milliseconds
    } catch (error) {
      console.error("Error updating part:", error);
    }
  };
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        {/* <section>
          <strong>ID - {id}</strong>
          <img src={image} alt="Part" />
          <p>{partName}</p>
          <h3>${price}</h3>
        </section>  */}

        <article>
          <form onSubmit={submitHandler}>
            <h2>Manage</h2>
            <div>
              <label>Part Name</label>
              <input
                type="text"
                placeholder="Part Name"
                value={nameUpdate}
                onChange={(e) => setNameUpdate(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                type="digits"
                placeholder="Price"
                value={priceUpdate}
                onChange={(e) => setPriceUpdate(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Description</label>
              <input
                type="text"
                placeholder="Description"
                value={descriptionUpdate}
                onChange={(e) => setDescriptionUpdate(e.target.value)}
              />
            </div>
            <div>
              <label>Photo</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {/* {photo && <img src={photo} alt="New Image" />} */}
            </div>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <button type="submit">Update</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default ProductManagement;
