import { useEffect, useState, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import axios from "axios";
const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const ProductManagement = () => {
  const { id } = useParams<{ id: string }>(); // Get the product ID from the URL
  const navigate = useNavigate(); 
  const [title, setTitle] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [quote, setQuote] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [titleUpdate, setTitleUpdate] = useState<string>(title); 
  const [videoUrlUpdate, setVideoUrlUpdate] = useState<string>(videoUrl);
  const [authorUpdate, setAuthorUpdate] = useState<string>(author);
  const [timeUpdate, setTimeUpdate] = useState<string>(time);
  const [dateUpdate, setDateUpdate] = useState<string>(date);
  const [descriptionUpdate, setDescriptionUpdate] = useState<string>(description);
  const [quoteUpdate, setQuoteUpdate] = useState<string>(quote);

  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/videos/${id}`);
        const product = response.data;
        setTitle(product.title);
        setAuthor(product.author);
        setQuote(product.quote);
        setTime(product.time);
        setDate(product.date);
        setDescription(product.description);
        setVideoUrl(product.videoUrl);
        setTitleUpdate(product.title);
        setQuoteUpdate(product.quote);
        setAuthorUpdate(product.author);
        setTimeUpdate(product.time);
        setDateUpdate(product.date);
        setVideoUrlUpdate(product.url);
        setDescriptionUpdate(product.description);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);


   const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/videos/${id}`, {
        title: titleUpdate,
        author: authorUpdate,
        videoUrl: videoUrlUpdate,
        time: timeUpdate,
        date: dateUpdate,
        description: descriptionUpdate,
        quote: quoteUpdate,
      });
      setTitle(titleUpdate);
      setAuthor(authorUpdate);
      setVideoUrl(videoUrlUpdate);
      setDescription(descriptionUpdate);
      setQuote(quoteUpdate);

      
      setSuccessMessage("Update successful!"); // Set success message
      setTimeout(() => {
        navigate('/admin/videos'); // Redirect after a short delay
      }, 2000); // Delay in milliseconds
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
          <img src={photo} alt="Product" />
          <p>{make}</p>
          <h3>${price}</h3>
        </section>  */}

        <article>
          <form onSubmit={submitHandler}>
            <h2>Manage</h2>
            <div>
              <label>Title</label>
              <input
                required
                type="text"
                placeholder="Title"
                value={titleUpdate}
                onChange={(e) => setTitleUpdate(e.target.value)}
              />
             </div>
             <div> 
             <label>Author</label>
              <input
                required
                type="text"
                placeholder="Author"
                value={authorUpdate}
                onChange={(e) => setAuthorUpdate(e.target.value)}
              /> 
              </div>
              <div>
              <label>Quote</label>
              <input
                required
                type="text"
                placeholder="Quote"
                value={quoteUpdate}
                onChange={(e) => setQuoteUpdate((e.target.value))}
              />
              </div>
              <div>
              <label>URL</label>
              <input
                required
                type="text"
                placeholder="URL"
                value={videoUrlUpdate}
                onChange={(e) => setVideoUrlUpdate((e.target.value))}
              />
              </div>
              <div>
                <label>Date</label>
                <input
                  required
                  type="text"
                  value={dateUpdate}
                  onChange={(e) => setDateUpdate(e.target.value)}
                />
              </div>
              <div>
                <label>Time</label>
                <input
                  required
                  type="text"
                  value={timeUpdate}
                  onChange={(e) => setTimeUpdate(e.target.value)}
                />
              </div>
              <div>
              <label>Description</label>
              <input
                required
                type="text"
                placeholder="Description"
                value={descriptionUpdate}
                onChange={(e) => setDescriptionUpdate(e.target.value)}
              />
            </div>

            <button type="submit">Update</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default ProductManagement;
