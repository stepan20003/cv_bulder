import React from 'react';

const ClassicTemplate = ({ data }) => {
  const { personal_info = {}, experience = [], education = [], skills = [], projects = [] } = data;

  return (
    <div className="bg-white shadow-lg w-[210mm] min-h-[297mm] p-16 mx-auto text-black font-serif">
      <header className="text-center mb-10 border-b border-black pb-6">
        <h1 className="text-3xl font-bold uppercase tracking-widest mb-2">{personal_info.fullName || 'Your Name'}</h1>
        <p className="italic text-lg mb-4">{personal_info.profession}</p>
        <div className="text-sm space-x-3">
          <span>{personal_info.email}</span>
          <span>•</span>
          <span>{personal_info.phone}</span>
          <span>•</span>
          <span>{personal_info.linkedin}</span>
        </div>
      </header>

      <section className="mb-8">
        <h2 className="text-sm font-bold uppercase border-b border-black mb-4 tracking-tighter">Experience</h2>
        <div className="space-y-6">
          {experience.map((exp, i) => (
            <div key={i}>
              <div className="flex justify-between font-bold italic">
                <span>{exp.company}</span>
                <span>{exp.duration}</span>
              </div>
              <div className="italic mb-2">{exp.role}</div>
              <p className="text-sm leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-sm font-bold uppercase border-b border-black mb-4 tracking-tighter">Education</h2>
        <div className="space-y-4">
          {education.map((edu, i) => (
            <div key={i}>
              <div className="flex justify-between font-bold">
                <span>{edu.school}</span>
                <span>{edu.year}</span>
              </div>
              <p className="italic text-sm">{edu.degree}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-bold uppercase border-b border-black mb-4 tracking-tighter">Skills</h2>
        <p className="text-sm">{skills.join(', ')}</p>
      </section>
    </div>
  );
};

export default ClassicTemplate;
