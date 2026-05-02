import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Plus, Edit2, Trash2, Download, FileText, LogOut, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchCvs();
  }, []);

  const fetchCvs = async () => {
    try {
      const response = await api.get('/cvs');
      setCvs(response.data);
    } catch (err) {
      console.error('Error fetching CVs', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this CV?')) return;
    try {
      await api.delete(`/cvs/${id}`);
      setCvs(cvs.filter(cv => cv.id !== id));
    } catch (err) {
      alert('Failed to delete CV');
    }
  };

  const handleDownload = async (id, title) => {
    try {
      const response = await api.get(`/cvs/${id}/download`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${title || 'CV'}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Failed to download PDF');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">CVGenie</span>
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {user?.name}</span>
            <button onClick={logout} className="text-gray-500 hover:text-red-600">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">My Resumes</h1>
          <Link to="/editor" className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
            <Plus className="h-5 w-5" />
            <span>Create New CV</span>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
          </div>
        ) : cvs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cvs.map((cv) => (
              <motion.div
                key={cv.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{cv.template}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{cv.title || 'Untitled CV'}</h3>
                  <p className="text-sm text-gray-500 mb-6">Last updated: {new Date(cv.updated_at).toLocaleDateString()}</p>

                  <div className="flex border-t border-gray-50 pt-4 gap-2">
                    <Link to={`/editor/${cv.id}`} className="flex-1 flex items-center justify-center space-x-2 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition">
                      <Edit2 className="h-4 w-4" />
                      <span className="text-sm font-medium">Edit</span>
                    </Link>
                    <button onClick={() => handleDownload(cv.id, cv.title)} className="flex-1 flex items-center justify-center space-x-2 py-2 text-green-600 hover:bg-green-50 rounded-md transition">
                      <Download className="h-4 w-4" />
                      <span className="text-sm font-medium">PDF</span>
                    </button>
                    <button onClick={() => handleDelete(cv.id)} className="p-2 text-gray-400 hover:text-red-600 rounded-md transition">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <div className="bg-gray-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No resumes yet</h3>
            <p className="text-gray-500 mb-8">Start by creating your first professional CV.</p>
            <Link to="/editor" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
              Create My First CV
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
