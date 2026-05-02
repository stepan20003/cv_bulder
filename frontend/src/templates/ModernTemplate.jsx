import React from 'react';
import { Mail, Phone } from 'lucide-react';

const ModernTemplate = ({ data }) => {
  const { personal_info = {}, experience = [], education = [], skills = [], projects = [] } = data;

  return (
    <div className="bg-white shadow-lg w-[210mm] min-h-[297mm] p-12 mx-auto text-gray-800 font-sans">
      <header className="border-b-4 border-blue-600 pb-6 mb-8">
        <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">{personal_info.fullName || 'Your Name'}</h1>
        <p className="text-xl text-blue-600 font-bold mt-1 uppercase tracking-widest">{personal_info.profession || 'Your Profession'}</p>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
          {personal_info.email && <div className="flex items-center gap-1"><Mail size={14} /> {personal_info.email}</div>}
          {personal_info.phone && <div className="flex items-center gap-1"><Phone size={14} /> {personal_info.phone}</div>}
          {personal_info.linkedin && <div className="flex items-center gap-1"> {personal_info.linkedin}</div>}
          {personal_info.github && <div className="flex items-center gap-1"> {personal_info.github}</div>}
        </div>
      </header>

      <div className="grid grid-cols-3 gap-12">
        <div className="col-span-2 space-y-8">
          <section>
            <h2 className="text-lg font-black text-gray-900 uppercase border-b-2 border-gray-100 mb-4 tracking-wider">Experience</h2>
            <div className="space-y-6">
              {experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900 text-lg">{exp.role}</h3>
                    <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{exp.duration}</span>
                  </div>
                  <p className="text-gray-700 font-medium italic">{exp.company}</p>
                  <p className="mt-2 text-gray-600 leading-relaxed text-sm whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 uppercase border-b-2 border-gray-100 mb-4 tracking-wider">Projects</h2>
            <div className="space-y-4">
              {projects.map((proj, i) => (
                <div key={i}>
                  <h3 className="font-bold text-gray-900">{proj.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-black text-gray-900 uppercase border-b-2 border-gray-100 mb-4 tracking-wider">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span key={i} className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-xs font-bold uppercase">{skill}</span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 uppercase border-b-2 border-gray-100 mb-4 tracking-wider">Education</h2>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <div key={i}>
                  <h3 className="font-bold text-gray-900 text-sm">{edu.degree}</h3>
                  <p className="text-xs text-gray-600">{edu.school}</p>
                  <p className="text-xs font-bold text-blue-600">{edu.year}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
