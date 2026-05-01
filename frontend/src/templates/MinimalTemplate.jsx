const MinimalTemplate = ({ data }) => {
  const { personal_info = {}, experience = [], education = [], skills = [], projects = [] } = data;

  return (
    <div className="bg-white shadow-lg p-12 max-w-2xl mx-auto min-h-[842px] text-zinc-900 font-sans">
      <div className="mb-12">
        <h1 className="text-5xl font-light tracking-tighter mb-2">{personal_info.fullName || 'YOUR NAME'}</h1>
        <p className="text-zinc-500 tracking-widest uppercase text-xs font-semibold">{personal_info.profession || 'Profession'}</p>
      </div>

      <div className="space-y-10">
        <div className="grid grid-cols-4">
          <div className="col-span-1 text-xs font-bold uppercase tracking-widest text-zinc-400">Contact</div>
          <div className="col-span-3 text-sm space-y-1">
            <p>{personal_info.email}</p>
            <p>{personal_info.phone}</p>
            <p className="text-zinc-400">{personal_info.linkedin}</p>
          </div>
        </div>

        <div className="grid grid-cols-4">
          <div className="col-span-1 text-xs font-bold uppercase tracking-widest text-zinc-400">Experience</div>
          <div className="col-span-3 space-y-6">
            {experience.map((exp, idx) => (
              <div key={idx}>
                <h3 className="text-sm font-bold">{exp.company}</h3>
                <p className="text-xs text-zinc-500 mb-2">{exp.role} / {exp.duration}</p>
                <p className="text-sm text-zinc-600 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4">
          <div className="col-span-1 text-xs font-bold uppercase tracking-widest text-zinc-400">Skills</div>
          <div className="col-span-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {skills.map((skill, idx) => (
              <span key={idx}>{skill}</span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4">
          <div className="col-span-1 text-xs font-bold uppercase tracking-widest text-zinc-400">Education</div>
          <div className="col-span-3 space-y-4">
            {education.map((edu, idx) => (
              <div key={idx}>
                <h3 className="text-sm font-bold">{edu.school}</h3>
                <p className="text-xs text-zinc-500">{edu.degree} / {edu.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinimalTemplate;
