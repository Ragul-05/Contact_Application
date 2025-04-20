import { Link } from 'react-router-dom';

export default function ContactItem({ contact, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-md shadow-md flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{contact.name}</h3>
        <p className="text-gray-600">{contact.email}</p>
        <p className="text-gray-600">{contact.phone}</p>
      </div>
      <div className="space-x-2">
        <Link to={`/contact/${contact._id}`} className="text-blue-600 hover:underline">View</Link>
        <button
          onClick={() => onDelete(contact._id)}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}