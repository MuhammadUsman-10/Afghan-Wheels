import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useParams } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import axios from "axios";
// const img =
//   "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const ProductManagement = () => {
  const { id } = useParams<{ id: string }>(); // Get the product ID from the URL
  const [make, setMake] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [price, setPrice] = useState<number>("");
  const [category, setCategory] = useState<string>("");
  const [variant, setVariant] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageURL, setPhoto] = useState<string>("");

  const [makeUpdate, setMakeUpdate] = useState<string>(make);
  const [modelUpdate, setModelUpdate] = useState<string>(model);
  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [variantUpdate, setVariantUpdate] = useState<string>(variant);
  const [cityUpdate, setCityUpdate] = useState<string>(city); 
  const [descriptionUpdate, setDescriptionUpdate] = useState<string>(description);
  const [photoUpdate, setPhotoUpdate] = useState<string>(imageURL);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/cars/${id}`);
        const product = response.data;
        setMake(product.make);
        setModel(product.model);
        setPrice(product.price);
        setCategory(product.category);
        setVariant(product.variant);
        setCity(product.city);
        setDescription(product.description);
        setPhoto(product.imageURL);
        setMakeUpdate(product.make);
        setModelUpdate(product.model);
        setPriceUpdate(product.price);
        setCategoryUpdate(product.category);
        setVariantUpdate(product.variant);
        setCityUpdate(product.city);
        setDescriptionUpdate(product.description);
        setPhotoUpdate(product.photo);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") setPhotoUpdate(reader.result);
      };
    }
  };

   const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/cars/${id}`, {
        make: makeUpdate,
        model: modelUpdate,
        price: priceUpdate,
        category: categoryUpdate,
        variant: variantUpdate,
        city: cityUpdate,
        description: descriptionUpdate,
        photo: photoUpdate,
      });
      setMake(makeUpdate);
      setModel(modelUpdate);
      setPrice(priceUpdate);
      setCategory(categoryUpdate);
      setVariant(variantUpdate);
      setCity(cityUpdate);
      setDescription(descriptionUpdate);
      setPhoto(photoUpdate);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        {/* <section>
          <strong>ID - {id}</strong>
          <img src={imageURL} alt="Product" />
          <p>{make}</p>
          <h3>${price}</h3>
        </section>  */}

        <article>
          <form onSubmit={submitHandler}>
            <h2>Manage</h2>
            <div>
              <label>Make</label>
              <input
                type="text"
                placeholder="Make"
                value={makeUpdate}
                onChange={(e) => setMakeUpdate(e.target.value)}
              />
              </div>
              <div>
              <label>Model</label>
              <input
                type="text"
                placeholder="Model"
                value={modelUpdate}
                onChange={(e) => setModelUpdate(e.target.value)}
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
              <label>Category</label>
              <input
                type="text"
                placeholder="Category"
                value={categoryUpdate}
                onChange={(e) => setCategoryUpdate(e.target.value)}
              />
              </div>
              <div>
              <label>Variant</label>
              <input
                type="text"
                placeholder="Variant"
                value={variantUpdate}
                onChange={(e) => setVariantUpdate(e.target.value)}
              />
              </div>
              <div>
              <label>City</label>
              <input
                type="text"
                placeholder="City"
                value={cityUpdate}
                onChange={(e) => setCityUpdate(e.target.value)}
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
              <input type="file" onChange={changeImageHandler} />
            </div>

            {photoUpdate && <img src={photoUpdate} alt="New Image" />}

            <button type="submit">Update</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default ProductManagement;
