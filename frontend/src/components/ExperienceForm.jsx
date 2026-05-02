import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const ExperienceForm = ({ data, onChange }) => {
  const addExperience = () => {
    onChange([...data, { company: '', role: '', duration: '', description: '' }]);
  };

  const removeExperience = (index) => {
    const newData = data.filter((_, i) => i !== index);
    onChange(newData);
  };

  const handleChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    onChange(newData);
  };

  return (
    <div className="space-y-6">
      {data.map((exp, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-4 relative bg-gray-50">
          <button
            onClick={() => removeExperience(index)}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-600"
          >
            <Trash2 className="h-5 w-5" />
          </button>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleChange(index, 'company', e.target.value)}
                placeholder="Google"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <input
                type="text"
                value={exp.role}
                onChange={(e) => handleChange(index, 'role', e.target.value)}
                placeholder="Software Engineer"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Duration</label>
            <input
              type="text"
              value={exp.duration}
              onChange={(e) => handleChange(index, 'duration', e.target.value)}
              placeholder="Jan 2020 - Present"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              rows={3}
              value={exp.description}
              onChange={(e) => handleChange(index, 'description', e.target.value)}
              placeholder="Developed scalable web applications using React and Node.js..."
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>
      ))}

      <button
        onClick={addExperience}
        className="w-full flex items-center justify-center space-x-2 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition"
      >
        <Plus className="h-5 w-5" />
        <span>Add Experience</span>
      </button>
    </div>
  );
};

export default ExperienceForm;
