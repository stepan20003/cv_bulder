import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const ProjectsForm = ({ data, onChange }) => {
  const addProject = () => {
    onChange([...data, { name: '', description: '', link: '' }]);
  };

  const removeProject = (index) => {
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
      {data.map((proj, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-4 relative bg-gray-50">
          <button
            onClick={() => removeProject(index)}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-600"
          >
            <Trash2 className="h-5 w-5" />
          </button>

          <div>
            <label className="block text-sm font-medium text-gray-700">Project Name</label>
            <input
              type="text"
              value={proj.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
              placeholder="Personal Portfolio"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              rows={2}
              value={proj.description}
              onChange={(e) => handleChange(index, 'description', e.target.value)}
              placeholder="Built using React and Tailwind..."
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Project Link</label>
            <input
              type="text"
              value={proj.link}
              onChange={(e) => handleChange(index, 'link', e.target.value)}
              placeholder="https://github.com/johndoe/portfolio"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>
      ))}

      <button
        onClick={addProject}
        className="w-full flex items-center justify-center space-x-2 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition"
      >
        <Plus className="h-5 w-5" />
        <span>Add Project</span>
      </button>
    </div>
  );
};

export default ProjectsForm;
