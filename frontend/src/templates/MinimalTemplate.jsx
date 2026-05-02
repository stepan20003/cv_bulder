import React from 'react';

const MinimalTemplate = ({ data }) => {
  const { personal_info = {}, experience = [], education = [], skills = [], projects = [] } = data;

  return (
    <div className="bg-white shadow-lg w-[210mm] min-h-[297mm] p-16 mx-auto text-zinc-900 font-sans tracking-tight">
      <header className="mb-20">
        <h1 className="text-5xl font-light mb-2">{personal_info.fullName || 'Name'}</h1>
        <p className="text-zinc-500 uppercase text-xs tracking-[0.2em]">{personal_info.profession}</p>
      </header>

      <div className="space-y-16">
        <section className="grid grid-cols-4 gap-8">
          <div className="text-zinc-400 text-xs uppercase tracking-widest pt-1">Contact</div>
          <div className="col-span-3 space-y-1 text-sm">
            <p>{personal_info.email}</p>
            <p>{personal_info.phone}</p>
            <p>{personal_info.linkedin}</p>
          </div>
        </section>

        <section className="grid grid-cols-4 gap-8">
          <div className="text-zinc-400 text-xs uppercase tracking-widest pt-1">Experience</div>
          <div className="col-span-3 space-y-10">
            {experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-bold text-base">{exp.company}</h3>
                  <span className="text-zinc-400 text-xs">{exp.duration}</span>
                </div>
                <p className="text-zinc-600 mb-2">{exp.role}</p>
                <p className="text-sm text-zinc-500 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-4 gap-8">
          <div className="text-zinc-400 text-xs uppercase tracking-widest pt-1">Skills</div>
          <div className="col-span-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {skills.map((skill, i) => (
              <span key={i}>{skill}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MinimalTemplate;
