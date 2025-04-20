import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function ContactViewer() {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5001/api/contacts/${id}`)
      .then(res => setContact(res.data))
      .catch(() => setError('Failed to load contact'));
  }, [id]);

  if (error) return <p className="text-red-500 text-center mt-8">{error}</p>;
  if (!contact) return <p className="text-gray-500 text-center mt-8">Loading...</p>;

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-auto mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Details</h2>
      <p><strong>Name:</strong> {contact.name}</p>
      <p><strong>Email:</strong> {contact.email}</p>
      <p><strong>Phone:</strong> {contact.phone}</p>
      <Link to={`/contact/${id}/edit`} className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
        Edit Contact
      </Link>
    </div>
  );
}