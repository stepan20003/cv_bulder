import React from 'react';
import { Mail, Phone } from 'lucide-react';

const CreativeTemplate = ({ data }) => {
  const { personal_info = {}, experience = [], education = [], skills = [], projects = [] } = data;

  return (
    <div className="bg-white shadow-xl w-[210mm] min-h-[297mm] mx-auto flex overflow-hidden font-sans">
      {/* Sidebar */}
      <div className="w-1/3 bg-slate-900 text-white p-10 flex flex-col">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-2">{personal_info.fullName || 'YOUR NAME'}</h1>
          <p className="text-sky-400 font-medium uppercase text-xs tracking-widest">{personal_info.profession}</p>
        </div>

        <div className="space-y-10">
          <section>
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2">Contact</h2>
            <div className="space-y-3 text-sm text-slate-300">
              <p className="flex items-center gap-2 overflow-hidden">{personal_info.email}</p>
              <p>{personal_info.phone}</p>
              <p className="text-xs break-all">{personal_info.linkedin}</p>
            </div>
          </section>

          <section>
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2">Skills</h2>
            <div className="space-y-2">
              {skills.map((skill, i) => (
                <div key={i} className="text-sm bg-slate-800 px-3 py-1.5 rounded text-slate-200 inline-block mr-2 mb-2">
                  {skill}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-12 bg-white text-slate-800">
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            Professional Experience
          </h2>
          <div className="space-y-8">
            {experience.map((exp, i) => (
              <div key={i} className="relative pl-6 border-l-2 border-slate-100">
                <div className="absolute w-3 h-3 bg-sky-500 rounded-full -left-[7px] top-1.5 shadow-[0_0_0_4px_rgba(14,165,233,0.1)]"></div>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-slate-900">{exp.role}</h3>
                  <span className="text-xs font-bold text-slate-400">{exp.duration}</span>
                </div>
                <p className="text-sky-600 text-sm font-semibold mb-3">{exp.company}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Notable Projects</h2>
          <div className="grid grid-cols-1 gap-6">
            {projects.map((proj, i) => (
              <div key={i} className="bg-slate-50 p-4 rounded-lg">
                <h3 className="font-bold text-slate-900 text-sm mb-1">{proj.name}</h3>
                <p className="text-xs text-slate-500">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-6">Education</h2>
          <div className="space-y-4">
            {education.map((edu, i) => (
              <div key={i}>
                <h3 className="font-bold text-slate-900 text-sm">{edu.degree}</h3>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>{edu.school}</span>
                  <span>{edu.year}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CreativeTemplate;
