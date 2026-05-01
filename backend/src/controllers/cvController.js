const { getDb } = require('../config/database');
const { generatePDF } = require('../services/pdfService');

const downloadCV = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const db = await getDb();
    const cv = await db.get('SELECT * FROM cvs WHERE id = ? AND user_id = ?', [id, userId]);

    if (!cv) {
      return res.status(404).json({ error: 'CV not found' });
    }

    // Parse JSON fields
    cv.personal_info = JSON.parse(cv.personal_info || '{}');
    cv.experience = JSON.parse(cv.experience || '[]');
    cv.education = JSON.parse(cv.education || '[]');
    cv.skills = JSON.parse(cv.skills || '[]');
    cv.projects = JSON.parse(cv.projects || '[]');

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${cv.title.replace(/\s+/g, '_')}.pdf"`);

    generatePDF(cv, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const createCV = async (req, res) => {
  const { title, template, personal_info, experience, education, skills, projects } = req.body;
  const userId = req.user.id;

  try {
    const db = await getDb();
    const result = await db.run(
      `INSERT INTO cvs (user_id, title, template, personal_info, experience, education, skills, projects)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        title,
        template || 'modern',
        JSON.stringify(personal_info),
        JSON.stringify(experience),
        JSON.stringify(education),
        JSON.stringify(skills),
        JSON.stringify(projects)
      ]
    );

    res.status(201).json({ id: result.lastID, title });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const getCVs = async (req, res) => {
  const userId = req.user.id;
  try {
    const db = await getDb();
    const cvs = await db.all('SELECT id, title, template, updated_at FROM cvs WHERE user_id = ? ORDER BY updated_at DESC', [userId]);
    res.json(cvs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getCVById = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const db = await getDb();
    const cv = await db.get('SELECT * FROM cvs WHERE id = ? AND user_id = ?', [id, userId]);

    if (!cv) {
      return res.status(404).json({ error: 'CV not found' });
    }

    // Parse JSON fields
    cv.personal_info = JSON.parse(cv.personal_info || '{}');
    cv.experience = JSON.parse(cv.experience || '[]');
    cv.education = JSON.parse(cv.education || '[]');
    cv.skills = JSON.parse(cv.skills || '[]');
    cv.projects = JSON.parse(cv.projects || '[]');

    res.json(cv);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const updateCV = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { title, template, personal_info, experience, education, skills, projects } = req.body;

  try {
    const db = await getDb();
    const cv = await db.get('SELECT * FROM cvs WHERE id = ? AND user_id = ?', [id, userId]);

    if (!cv) {
      return res.status(404).json({ error: 'CV not found' });
    }

    await db.run(
      `UPDATE cvs SET
        title = ?,
        template = ?,
        personal_info = ?,
        experience = ?,
        education = ?,
        skills = ?,
        projects = ?,
        updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [
        title,
        template,
        JSON.stringify(personal_info),
        JSON.stringify(experience),
        JSON.stringify(education),
        JSON.stringify(skills),
        JSON.stringify(projects),
        id
      ]
    );

    res.json({ message: 'CV updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteCV = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const db = await getDb();
    const result = await db.run('DELETE FROM cvs WHERE id = ? AND user_id = ?', [id, userId]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'CV not found' });
    }

    res.json({ message: 'CV deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createCV, getCVs, getCVById, updateCV, deleteCV, downloadCV };
