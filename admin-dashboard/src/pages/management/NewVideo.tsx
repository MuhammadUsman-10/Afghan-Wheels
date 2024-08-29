import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import axios from "axios";

const NewProduct = () => {
  const navigate = useNavigate(); 
  const [title, setTitle] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [quote, setQuote] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:4000/api/videos", {
            title,
            videoUrl,
            author,
            quote,
            time,
            date,
            description
        });
        setSuccessMessage("Video added successfully!");
        setErrorMessage("");
        // Clear the form fields
        setTitle("");
        setVideoUrl("");
        setAuthor("");
        setQuote("");
        setTime("");
        setDate("");
        setDescription("");
        setTimeout(() => {
          navigate('/admin/videos'); // Redirect after a short delay
        }, 2000); // Delay in milliseconds
    } catch (error) {
        console.error("Error adding video:", error);
        setErrorMessage("Failed to add video. Please try again.");
        setSuccessMessage("");
    }
};

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <form onSubmit={submitHandler}>
            <h2>New Video</h2>
            <div>
              <label>Title</label>
              <input
                required
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
             </div>
             <div> 
             <label>Author</label>
              <input
                required
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              /> 
              </div>
              <div>
              <label>Quote</label>
              <input
                required
                type="text"
                placeholder="Quote"
                value={quote}
                onChange={(e) => setQuote((e.target.value))}
              />
              </div>
              <div>
              <label>URL</label>
              <input
                required
                type="text"
                placeholder="URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl((e.target.value))}
              />
              </div>
              <div>
                <label>Date</label>
                <input
                  required
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div>
                <label>Time</label>
                <input
                  required
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
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
