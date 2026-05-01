import { Plus, Trash2 } from 'lucide-react';

const ExperienceForm = ({ data = [], onChange }) => {
  const addExperience = () => {
    onChange([...data, { company: '', role: '', duration: '', description: '' }]);
  };

  const removeExperience = (index) => {
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
        <h3 className="text-lg font-medium">Work Experience</h3>
        <button
          onClick={addExperience}
          type="button"
          className="flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          <Plus size={16} className="mr-1" /> Add Experience
        </button>
      </div>

      {data.map((exp, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-lg relative space-y-3">
          <button
            onClick={() => removeExperience(index)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <Trash2 size={16} />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Company"
              value={exp.company}
              onChange={(e) => handleChange(index, 'company', e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
            <input
              placeholder="Role"
              value={exp.role}
              onChange={(e) => handleChange(index, 'role', e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
          </div>
          <input
            placeholder="Duration (e.g. Jan 2020 - Present)"
            value={exp.duration}
            onChange={(e) => handleChange(index, 'duration', e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
          <textarea
            placeholder="Description"
            value={exp.description}
            onChange={(e) => handleChange(index, 'description', e.target.value)}
            className="w-full border border-gray-300 rounded p-2 h-20"
          />
        </div>
      ))}
    </div>
  );
};

export default ExperienceForm;
