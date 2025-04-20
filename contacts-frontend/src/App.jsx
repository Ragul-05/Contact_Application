import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact/:id/*" element={<ContactPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}