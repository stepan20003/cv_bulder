import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

const SkillsForm = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    onChange(data.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="space-y-6">
      <form onSubmit={addSkill} className="flex space-x-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add a skill (e.g. React)"
          className="flex-1 border border-gray-300 rounded-md shadow-sm p-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          <Plus className="h-5 w-5" />
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        {data.map((skill, index) => (
          <span
            key={index}
            className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2"
          >
            <span>{skill}</span>
            <button
              onClick={() => removeSkill(skill)}
              className="text-blue-400 hover:text-blue-600"
            >
              <X className="h-4 w-4" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillsForm;
