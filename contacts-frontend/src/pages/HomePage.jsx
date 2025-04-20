import { useState, useEffect } from 'react';
import axios from 'axios';
import CreateContact from '../components/CreateContact';
import ContactItem from '../components/ContactItem';

export default function HomePage() {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  const fetchContacts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/contacts');
      setContacts(res.data);
    } catch (err) {
      setError('Failed to load contacts');
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/contacts/${id}`);
      setContacts(contacts.filter(contact => contact._id !== id));
    } catch (err) {
      setError('Failed to delete contact');
    }
  };

  const handleContactAdded = (newContact) => {
    setContacts([...contacts, newContact]);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Contact Manager</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md mx-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <CreateContact onContactAdded={handleContactAdded} />
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      <div className="grid gap-4 mt-8">
        {filteredContacts.map(contact => (
          <ContactItem key={contact._id} contact={contact} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}