import { Plus, Trash2 } from 'lucide-react';

const EducationForm = ({ data = [], onChange }) => {
  const addEducation = () => {
    onChange([...data, { school: '', degree: '', year: '' }]);
  };

  const removeEducation = (index) => {
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
        <h3 className="text-lg font-medium">Education</h3>
        <button
          onClick={addEducation}
          type="button"
          className="flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          <Plus size={16} className="mr-1" /> Add Education
        </button>
      </div>

      {data.map((edu, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-lg relative space-y-3">
          <button
            onClick={() => removeEducation(index)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <Trash2 size={16} />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="School/University"
              value={edu.school}
              onChange={(e) => handleChange(index, 'school', e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
            <input
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => handleChange(index, 'degree', e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
          </div>
          <input
            placeholder="Year"
            value={edu.year}
            onChange={(e) => handleChange(index, 'year', e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
      ))}
    </div>
  );
};

export default EducationForm;
