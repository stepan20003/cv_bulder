const ModernTemplate = ({ data }) => {
  const { personal_info = {}, experience = [], education = [], skills = [], projects = [] } = data;

  return (
    <div className="bg-white shadow-lg p-8 max-w-2xl mx-auto min-h-[842px] text-gray-800">
      <header className="border-b-4 border-blue-600 pb-4 mb-6">
        <h1 className="text-4xl font-bold text-blue-600 uppercase tracking-wide">{personal_info.fullName || 'YOUR NAME'}</h1>
        <p className="text-xl text-gray-600 font-medium mt-1">{personal_info.profession || 'Profession'}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-gray-500">
          {personal_info.email && <span>{personal_info.email}</span>}
          {personal_info.phone && <span>{personal_info.phone}</span>}
          {personal_info.linkedin && <span>{personal_info.linkedin}</span>}
          {personal_info.github && <span>{personal_info.github}</span>}
        </div>
      </header>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-6">
          <section>
            <h2 className="text-lg font-bold text-blue-600 border-b border-gray-200 mb-3 uppercase">Experience</h2>
            {experience.map((exp, idx) => (
              <div key={idx} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-900">{exp.role}</h3>
                  <span className="text-xs font-semibold text-gray-500 uppercase">{exp.duration}</span>
                </div>
                <p className="text-sm font-medium text-blue-600">{exp.company}</p>
                <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-lg font-bold text-blue-600 border-b border-gray-200 mb-3 uppercase">Projects</h2>
            {projects.map((proj, idx) => (
              <div key={idx} className="mb-3">
                <h3 className="font-bold text-gray-900 text-sm">{proj.name}</h3>
                <p className="text-xs text-gray-600">{proj.description}</p>
              </div>
            ))}
          </section>
        </div>

        <div className="col-span-1 space-y-6">
          <section>
            <h2 className="text-lg font-bold text-blue-600 border-b border-gray-200 mb-3 uppercase">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-blue-600 border-b border-gray-200 mb-3 uppercase">Education</h2>
            {education.map((edu, idx) => (
              <div key={idx} className="mb-3">
                <h3 className="font-bold text-gray-900 text-xs">{edu.degree}</h3>
                <p className="text-xs text-gray-600">{edu.school}</p>
                <p className="text-xs text-gray-400">{edu.year}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
