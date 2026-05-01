import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Download, LogOut, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Dashboard = () => {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCVs();
  }, []);

  const fetchCVs = async () => {
    try {
      const res = await api.get('/cv');
      setCvs(res.data);
    } catch (err) {
      console.error('Error fetching CVs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this CV?')) {
      try {
        await api.delete(`/cv/${id}`);
        setCvs(cvs.filter(cv => cv.id !== id));
      } catch (err) {
        console.error('Error deleting CV:', err);
        alert('Failed to delete CV');
      }
    }
  };

  const handleDownload = async (id, title) => {
    try {
      const res = await api.get(`/cv/${id}/download`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${title.replace(/\s+/g, '_')}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Error downloading CV:', err);
      alert('Failed to download CV');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center">
          <FileText className="mr-2" /> CV Builder
        </h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Welcome, {user?.name}</span>
          <button
            onClick={logout}
            className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
          >
            <LogOut size={18} className="mr-1" /> Logout
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-gray-800">Your Resumes</h2>
          <Link
            to="/edit"
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} className="mr-2" /> Create New CV
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : cvs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200">
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">You haven't created any CVs yet.</p>
            <Link to="/edit" className="text-blue-600 font-medium mt-2 inline-block hover:underline">
              Create your first one now
            </Link>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {cvs.map((cv) => (
              <motion.div
                key={cv.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-1">{cv.title}</h3>
                <p className="text-sm text-gray-500 mb-4 capitalize">Template: {cv.template}</p>
                <div className="flex justify-between items-center border-t pt-4 mt-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => navigate(`/edit/${cv.id}`)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDownload(cv.id, cv.title)}
                      className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded"
                      title="Download PDF"
                    >
                      <Download size={18} />
                    </button>
                  </div>
                  <button
                    onClick={() => handleDelete(cv.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
