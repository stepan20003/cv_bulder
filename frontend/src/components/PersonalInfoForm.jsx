import React from 'react';
import { Mail, Phone, User } from 'lucide-react';

const PersonalInfoForm = ({ data, onChange }) => {
  const handleChange = (e) => {
    onChange({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={data.fullName || ''}
            onChange={handleChange}
            placeholder="John Doe"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Profession / Title</label>
          <input
            type="text"
            name="profession"
            value={data.profession || ''}
            onChange={handleChange}
            placeholder="Full Stack Developer"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={data.email || ''}
            onChange={handleChange}
            placeholder="john@example.com"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={data.phone || ''}
            onChange={handleChange}
            placeholder="+1 234 567 890"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
          <input
            type="text"
            name="linkedin"
            value={data.linkedin || ''}
            onChange={handleChange}
            placeholder="linkedin.com/in/johndoe"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">GitHub URL</label>
          <input
            type="text"
            name="github"
            value={data.github || ''}
            onChange={handleChange}
            placeholder="github.com/johndoe"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
