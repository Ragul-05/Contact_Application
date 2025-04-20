import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">Contact Manager</Link>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-200">Home</Link>
        </div>
      </div>
    </nav>
  );
}