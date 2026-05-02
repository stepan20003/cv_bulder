import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const EducationForm = ({ data, onChange }) => {
  const addEducation = () => {
    onChange([...data, { school: '', degree: '', year: '' }]);
  };

  const removeEducation = (index) => {
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
      {data.map((edu, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-4 relative bg-gray-50">
          <button
            onClick={() => removeEducation(index)}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-600"
          >
            <Trash2 className="h-5 w-5" />
          </button>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">School / University</label>
              <input
                type="text"
                value={edu.school}
                onChange={(e) => handleChange(index, 'school', e.target.value)}
                placeholder="MIT"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Degree</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleChange(index, 'degree', e.target.value)}
                placeholder="B.S. Computer Science"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Year</label>
            <input
              type="text"
              value={edu.year}
              onChange={(e) => handleChange(index, 'year', e.target.value)}
              placeholder="2016 - 2020"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>
      ))}

      <button
        onClick={addEducation}
        className="w-full flex items-center justify-center space-x-2 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition"
      >
        <Plus className="h-5 w-5" />
        <span>Add Education</span>
      </button>
    </div>
  );
};

export default EducationForm;
