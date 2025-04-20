import { Routes, Route } from 'react-router-dom';
import ContactViewer from '../components/ContactViewer';
import UpdateContact from '../components/UpdateContact';

export default function ContactPage() {
  return (
    <Routes>
      <Route path="/" element={<ContactViewer />} />
      <Route path="/edit" element={<UpdateContact />} />
    </Routes>
  );
}