import { ReactElement, useCallback, useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import TableHOC from "../components/TableHOC";
import { Column } from "react-table";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from 'axios';

interface DataType {
  _id: string;
  thumbnail: ReactElement;
  name: string;
  url: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Thumbnail",
    accessor: "thumbnail",
  },
  {
    Header: "Video Title",
    accessor: "name",
  },
  {
    Header: "URL",
    accessor: "url",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Videos = () => {
  const [data, setData] = useState<DataType[]>([]);
const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/videos');
        const videos = response.data.map((video: any) => ({
          _id: video._id,
          thumbnail: <img src={video.videoUrl} alt={video.title} />,
          name: video.title,
          url: video.videoUrl,
          action: (
            <>
            <button onClick={() => navigate(`/admin/videos/${video._id}`)}>
              <FaEdit />
            </button>
            <button onClick={() => handleDelete(video._id)}>
              <FaTrash />
            </button>
          </>
          ),
        }));
        setData(videos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:4000/api/videos/${id}`);
      setData((prevData) => prevData.filter((video) => video._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  const Table = useCallback(
    TableHOC<DataType>(
      columns,
      data,
      "dashboard-video-box",
      "Videos",
      true
    ),
    [data]
  );

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table()}</main>
      <Link to="/admin/videos/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Videos;
