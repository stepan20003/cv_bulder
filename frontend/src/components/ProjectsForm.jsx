import { Plus, Trash2 } from 'lucide-react';

const ProjectsForm = ({ data = [], onChange }) => {
  const addProject = () => {
    onChange([...data, { name: '', description: '', link: '' }]);
  };

  const removeProject = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    onChange(newData);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Projects</h3>
        <button
          onClick={addProject}
          type="button"
          className="flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          <Plus size={16} className="mr-1" /> Add Project
        </button>
      </div>

      {data.map((proj, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-lg relative space-y-3">
          <button
            onClick={() => removeProject(index)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <Trash2 size={16} />
          </button>
          <input
            placeholder="Project Name"
            value={proj.name}
            onChange={(e) => handleChange(index, 'name', e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
          <input
            placeholder="Project Link (Optional)"
            value={proj.link}
            onChange={(e) => handleChange(index, 'link', e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
          <textarea
            placeholder="Description"
            value={proj.description}
            onChange={(e) => handleChange(index, 'description', e.target.value)}
            className="w-full border border-gray-300 rounded p-2 h-20"
          />
        </div>
      ))}
    </div>
  );
};

export default ProjectsForm;
