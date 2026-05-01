import { X } from 'lucide-react';
import { useState } from 'react';

const SkillsForm = ({ data = [], onChange }) => {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = (e) => {
    if (e.key === 'Enter' && newSkill.trim()) {
      e.preventDefault();
      if (!data.includes(newSkill.trim())) {
        onChange([...data, newSkill.trim()]);
      }
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    onChange(data.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Skills</h3>
      <div>
        <input
          type="text"
          placeholder="Type a skill and press Enter"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={addSkill}
          className="w-full border border-gray-300 rounded p-2"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {data.map((skill, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
          >
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              className="ml-2 hover:text-blue-600"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillsForm;
