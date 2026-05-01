const ClassicTemplate = ({ data }) => {
  const { personal_info = {}, experience = [], education = [], skills = [], projects = [] } = data;

  return (
    <div className="bg-white shadow-lg p-10 max-w-2xl mx-auto min-h-[842px] text-black font-serif">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold border-b-2 border-black pb-2 inline-block mb-2">{personal_info.fullName || 'YOUR NAME'}</h1>
        <p className="text-lg italic text-gray-700">{personal_info.profession || 'Profession'}</p>
        <div className="text-sm mt-2">
          {[personal_info.email, personal_info.phone, personal_info.linkedin, personal_info.github]
            .filter(Boolean)
            .join(' • ')}
        </div>
      </header>

      <section className="mb-6">
        <h2 className="text-lg font-bold border-b border-black mb-3 uppercase tracking-widest">Experience</h2>
        {experience.map((exp, idx) => (
          <div key={idx} className="mb-4">
            <div className="flex justify-between font-bold">
              <span>{exp.company}</span>
              <span>{exp.duration}</span>
            </div>
            <div className="italic mb-1">{exp.role}</div>
            <p className="text-sm leading-relaxed">{exp.description}</p>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-bold border-b border-black mb-3 uppercase tracking-widest">Education</h2>
        {education.map((edu, idx) => (
          <div key={idx} className="mb-3">
            <div className="flex justify-between font-bold">
              <span>{edu.school}</span>
              <span>{edu.year}</span>
            </div>
            <div className="italic text-sm">{edu.degree}</div>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-bold border-b border-black mb-3 uppercase tracking-widest">Skills</h2>
        <p className="text-sm italic">{skills.join(', ')}</p>
      </section>

      {projects.length > 0 && (
        <section>
          <h2 className="text-lg font-bold border-b border-black mb-3 uppercase tracking-widest">Projects</h2>
          {projects.map((proj, idx) => (
            <div key={idx} className="mb-3">
              <span className="font-bold">{proj.name}</span>: <span className="text-sm">{proj.description}</span>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;
