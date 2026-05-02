import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Save, Download, ArrowLeft, Layout, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';

import PersonalInfoForm from '../components/PersonalInfoForm';
import ExperienceForm from '../components/ExperienceForm';
import EducationForm from '../components/EducationForm';
import SkillsForm from '../components/SkillsForm';
import ProjectsForm from '../components/ProjectsForm';
import LivePreview from '../components/LivePreview';
import TemplateGallery from '../components/TemplateGallery';

const CVEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [cvData, setCvData] = useState({
    title: 'My Resume',
    template: 'modern',
    personal_info: { fullName: '', email: '', phone: '', linkedin: '', github: '', profession: '' },
    experience: [],
    education: [],
    skills: [],
    projects: []
  });

  useEffect(() => {
    if (id) {
      fetchCV();
    }
  }, [id]);

  const fetchCV = async () => {
    try {
      const response = await api.get(`/cvs/${id}`);
      // Handle the data structure from backend
      const data = response.data;
      setCvData({
        ...data,
        personal_info: data.personal_info || {},
        experience: data.experience || [],
        education: data.education || [],
        skills: data.skills || [],
        projects: data.projects || []
      });
    } catch (err) {
      console.error('Error fetching CV', err);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (section, data) => {
    if (section === 'title' || section === 'template') {
      setCvData({ ...cvData, [section]: data });
    } else {
      setCvData({ ...cvData, [section]: data });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (id) {
        await api.put(`/cvs/${id}`, cvData);
      } else {
        const response = await api.post('/cvs', cvData);
        navigate(`/editor/${response.data.id}`, { replace: true });
      }
    } catch (err) {
      alert('Failed to save CV');
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = async () => {
    if (!id) {
      alert('Please save your CV first before downloading');
      return;
    }
    try {
      const response = await api.get(`/cvs/${id}/download`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${cvData.title}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Failed to generate PDF');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  const tabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'template', label: 'Templates' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 pb-12">
      {/* Editor Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-full transition">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Link>
            <input
              type="text"
              value={cvData.title}
              onChange={(e) => handleUpdate('title', e.target.value)}
              className="text-xl font-bold text-gray-900 border-none bg-transparent focus:ring-0 w-48"
            />
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center space-x-2 bg-white border border-gray-300 px-5 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              <span>{saving ? 'Saving...' : 'Save'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition shadow-md"
            >
              <Download className="h-4 w-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-2 gap-8">
        {/* Left Side: Forms */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="flex border-b overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition ${
                    activeTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'personal' && (
                  <PersonalInfoForm
                    data={cvData.personal_info}
                    onChange={(data) => handleUpdate('personal_info', data)}
                  />
                )}
                {activeTab === 'experience' && (
                  <ExperienceForm
                    data={cvData.experience}
                    onChange={(data) => handleUpdate('experience', data)}
                  />
                )}
                {activeTab === 'education' && (
                  <EducationForm
                    data={cvData.education}
                    onChange={(data) => handleUpdate('education', data)}
                  />
                )}
                {activeTab === 'skills' && (
                  <SkillsForm
                    data={cvData.skills}
                    onChange={(data) => handleUpdate('skills', data)}
                  />
                )}
                {activeTab === 'projects' && (
                  <ProjectsForm
                    data={cvData.projects}
                    onChange={(data) => handleUpdate('projects', data)}
                  />
                )}
                {activeTab === 'template' && (
                  <TemplateGallery
                    selected={cvData.template}
                    onSelect={(t) => handleUpdate('template', t)}
                  />
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right Side: Preview */}
        <div className="hidden lg:block">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
              <Layout className="h-5 w-5 text-blue-600" />
              <span>Live Preview</span>
            </h2>
            <span className="text-sm text-gray-500">Auto-updates as you type</span>
          </div>
          <LivePreview data={cvData} template={cvData.template} />
        </div>
      </main>
    </div>
  );
};

export default CVEditor;
