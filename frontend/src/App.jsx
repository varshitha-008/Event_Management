import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateEvent from './pages/CreateEvent';
import EventList from './pages/EventList';
import AdminDashboard from './pages/AdminDashboard';
import EventDetails from './pages/EventDetails';
import EventAnalytics from './pages/EventAnalytics';
import UpdateEvent from './pages/UpdateEvent';
import EventSearch from './pages/EventSearch';
// import SearchResults from './pages/SearchResults';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='admin-dashboard' element={<AdminDashboard/>}/>
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/my-events" element={<EventList />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/analytics" element={<EventAnalytics />} />
        <Route path="/update-event/:id" element={<UpdateEvent />} />
        {/* <Route path="/search-results" element={<SearchResults/>} /> */}
        <Route path='search' element={<EventSearch/>} ></Route>

      </Routes>
    </Router>
  );
};

export default App;
