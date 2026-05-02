const db = require('../models/db');
const { generatePDF } = require('../services/pdfService');

exports.getAllCVs = (req, res) => {
  db.all('SELECT * FROM cvs WHERE user_id = ? ORDER BY updated_at DESC', [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const formatted = rows.map(row => ({
      ...row,
      personal_info: JSON.parse(row.personal_info || '{}'),
      experience: JSON.parse(row.experience || '[]'),
      education: JSON.parse(row.education || '[]'),
      skills: JSON.parse(row.skills || '[]'),
      projects: JSON.parse(row.projects || '[]')
    }));
    res.json(formatted);
  });
};

exports.getCVById = (req, res) => {
  db.get('SELECT * FROM cvs WHERE id = ? AND user_id = ?', [req.params.id, req.user.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'CV not found' });

    res.json({
      ...row,
      personal_info: JSON.parse(row.personal_info || '{}'),
      experience: JSON.parse(row.experience || '[]'),
      education: JSON.parse(row.education || '[]'),
      skills: JSON.parse(row.skills || '[]'),
      projects: JSON.parse(row.projects || '[]')
    });
  });
};

exports.createCV = (req, res) => {
  const { title, template, personal_info, experience, education, skills, projects } = req.body;

  db.run(
    `INSERT INTO cvs (user_id, title, template, personal_info, experience, education, skills, projects)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      req.user.id,
      title || 'My Resume',
      template || 'modern',
      JSON.stringify(personal_info || {}),
      JSON.stringify(experience || []),
      JSON.stringify(education || []),
      JSON.stringify(skills || []),
      JSON.stringify(projects || [])
    ],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
};

exports.updateCV = (req, res) => {
  const { title, template, personal_info, experience, education, skills, projects } = req.body;

  db.run(
    `UPDATE cvs SET title = ?, template = ?, personal_info = ?, experience = ?,
     education = ?, skills = ?, projects = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ? AND user_id = ?`,
    [
      title,
      template,
      JSON.stringify(personal_info),
      JSON.stringify(experience),
      JSON.stringify(education),
      JSON.stringify(skills),
      JSON.stringify(projects),
      req.params.id,
      req.user.id
    ],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'CV not found' });
      res.json({ success: true });
    }
  );
};

exports.deleteCV = (req, res) => {
  db.run('DELETE FROM cvs WHERE id = ? AND user_id = ?', [req.params.id, req.user.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'CV not found' });
    res.json({ success: true });
  });
};

exports.downloadCV = (req, res) => {
  db.get('SELECT * FROM cvs WHERE id = ? AND user_id = ?', [req.params.id, req.user.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'CV not found' });

    const cvData = {
      ...row,
      personal_info: JSON.parse(row.personal_info || '{}'),
      experience: JSON.parse(row.experience || '[]'),
      education: JSON.parse(row.education || '[]'),
      skills: JSON.parse(row.skills || '[]'),
      projects: JSON.parse(row.projects || '[]')
    };

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${cvData.title}.pdf`);

    generatePDF(cvData, res);
  });
};
