import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Download, ArrowLeft, Layout } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';
import PersonalInfoForm from '../components/PersonalInfoForm';
import ExperienceForm from '../components/ExperienceForm';
import EducationForm from '../components/EducationForm';
import SkillsForm from '../components/SkillsForm';
import ProjectsForm from '../components/ProjectsForm';
import LivePreview from '../components/LivePreview';

const CVEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(id ? true : false);
  const [saving, setSaving] = useState(false);
  const [cvData, setCvData] = useState({
    title: 'My Resume',
    template: 'modern',
    personal_info: {},
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
      const res = await api.get(`/cv/${id}`);
      setCvData(res.data);
    } catch (err) {
      console.error('Error fetching CV:', err);
      alert('Failed to load CV');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (id) {
        await api.put(`/cv/${id}`, cvData);
      } else {
        const res = await api.post('/cv', cvData);
        navigate(`/edit/${res.data.id}`);
      }
      alert('CV saved successfully!');
    } catch (err) {
      console.error('Error saving CV:', err);
      alert('Failed to save CV');
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = async () => {
    if (!id) {
      alert('Please save the CV first before downloading');
      return;
    }
    try {
      const res = await api.get(`/cv/${id}/download`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${cvData.title.replace(/\s+/g, '_')}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Error downloading CV:', err);
      alert('Failed to download CV');
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={20} />
          </button>
          <input
            value={cvData.title}
            onChange={(e) => setCvData({ ...cvData, title: e.target.value })}
            className="text-lg font-semibold border-none focus:ring-0 bg-transparent"
          />
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={cvData.template}
            onChange={(e) => setCvData({ ...cvData, template: e.target.value })}
            className="border-gray-300 rounded-md text-sm p-2 mr-4"
          >
            <option value="modern">Modern Template</option>
            <option value="classic">Classic Template</option>
            <option value="minimal">Minimal Template</option>
          </select>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            <Save size={18} />
            <span>{saving ? 'Saving...' : 'Save'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50"
          >
            <Download size={18} />
            <span>Download</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8 bg-white p-6 rounded-xl shadow-sm overflow-auto max-h-[calc(100vh-8rem)]"
        >
          <PersonalInfoForm
            data={cvData.personal_info}
            onChange={(val) => setCvData({ ...cvData, personal_info: val })}
          />
          <hr />
          <ExperienceForm
            data={cvData.experience}
            onChange={(val) => setCvData({ ...cvData, experience: val })}
          />
          <hr />
          <EducationForm
            data={cvData.education}
            onChange={(val) => setCvData({ ...cvData, education: val })}
          />
          <hr />
          <ProjectsForm
            data={cvData.projects}
            onChange={(val) => setCvData({ ...cvData, projects: val })}
          />
          <hr />
          <SkillsForm
            data={cvData.skills}
            onChange={(val) => setCvData({ ...cvData, skills: val })}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:block"
        >
          <LivePreview data={cvData} template={cvData.template} />
        </motion.div>
      </main>
    </div>
  );
};

export default CVEditor;
