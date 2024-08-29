import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";
import EditUserWrapper from "./pages/edituserwrap";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Cars = lazy(() => import("./pages/Cars"));
const Parts = lazy(() => import("./pages/Autoparts"));
const Videos = lazy(() => import("./pages/Videos"));
const Booking = lazy(() => import("./pages/Booking"));
const Users = lazy(() => import("./pages/Users"));
const NewCar = lazy(() => import("./pages/management/NewCar"));
const CarManagement = lazy(() => import("./pages/management/CarManagement"));
const NewPart = lazy(() => import("./pages/management/NewPart"));
const PartManagement = lazy(() => import("./pages/management/PartManagement"));
const NewVideo = lazy(() => import("./pages/management/NewVideo"));
const VideoManagement = lazy(() => import("./pages/management/VideoManagement"));

const BarCharts = lazy(() => import("./pages/charts/BarCharts"));
const LineCharts = lazy(() => import("./pages/charts/LineCharts"));
const PieCharts = lazy(() => import("./pages/charts/PieCharts"));


const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/cars" element={<Cars />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/parts" element={<Parts />} />
          <Route path="/admin/videos" element={<Videos />} />
          <Route path="/admin/users/:id" element={<EditUserWrapper />} />
          <Route path="/admin/bookings" element={<Booking />} />

          {/* Charts */}

          <Route path="/admin/chart/bar" element={<BarCharts />} />
          <Route path="/admin/chart/pie" element={<PieCharts />} />
          <Route path="/admin/chart/line" element={<LineCharts />} />

          {/* Management */}
          <Route path="/admin/cars/new" element={<NewCar />} />
          <Route path="/admin/cars/:id" element={<CarManagement />} />
          <Route path="/admin/parts/new" element={<NewPart />} />
          <Route path="/admin/parts/:id" element={<PartManagement />} />
          <Route path="/admin/videos/new" element={<NewVideo />} />
          <Route path="/admin/videos/:id" element={<VideoManagement />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
