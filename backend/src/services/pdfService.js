const PDFDocument = require('pdfkit');

const generatePDF = (cvData, res) => {
  const doc = new PDFDocument({ margin: 40 });
  doc.pipe(res);

  const { personal_info, experience, education, skills, projects, template } = cvData;

  // Modern Template (2 Columns or Bold Style)
  if (template === 'modern') {
    const primaryColor = '#2563eb';

    // Header
    doc.fillColor(primaryColor).fontSize(28).text(personal_info.fullName || 'YOUR NAME', { align: 'left' });
    doc.fillColor('#4b5563').fontSize(14).text(personal_info.profession || 'Profession');
    doc.moveDown(0.5);

    // Contact Info Row
    doc.fontSize(9).fillColor('#6b7280');
    const contact = [personal_info.email, personal_info.phone, personal_info.linkedin, personal_info.github].filter(Boolean).join('  |  ');
    doc.text(contact);
    doc.moveDown(1);

    // Line separator
    doc.strokeColor(primaryColor).lineWidth(2).moveTo(40, doc.y).lineTo(570, doc.y).stroke();
    doc.moveDown(1.5);

    // Two column start
    const leftColX = 40;
    const rightColX = 380;
    const currentY = doc.y;

    // LEFT COLUMN (Main Content)
    doc.x = leftColX;
    doc.y = currentY;

    const addSectionHeader = (title) => {
      doc.moveDown(1);
      doc.fillColor(primaryColor).fontSize(14).text(title.toUpperCase(), { underline: false });
      doc.strokeColor('#e5e7eb').lineWidth(1).moveTo(doc.x, doc.y).lineTo(rightColX - 20, doc.y).stroke();
      doc.moveDown(0.5);
    };

    if (experience.length > 0) {
      addSectionHeader('Experience');
      experience.forEach(exp => {
        doc.fillColor('#111827').fontSize(11).text(exp.role, { continued: true }).fillColor('#6b7280').fontSize(9).text(`  at ${exp.company}`, { align: 'left' });
        doc.fillColor('#9ca3af').fontSize(8).text(exp.duration);
        doc.fillColor('#374151').fontSize(9).text(exp.description);
        doc.moveDown(0.5);
      });
    }

    if (projects.length > 0) {
      addSectionHeader('Projects');
      projects.forEach(proj => {
        doc.fillColor('#111827').fontSize(10).text(proj.name);
        doc.fillColor('#4b5563').fontSize(9).text(proj.description);
        doc.moveDown(0.4);
      });
    }

    // RIGHT COLUMN (Sidebar)
    const sidebarTop = currentY;
    doc.x = rightColX;
    doc.y = sidebarTop;

    const addSidebarHeader = (title) => {
      doc.moveDown(1);
      doc.fillColor(primaryColor).fontSize(12).text(title.toUpperCase());
      doc.moveDown(0.3);
    };

    if (skills.length > 0) {
      addSidebarHeader('Skills');
      doc.fillColor('#374151').fontSize(9).text(skills.join('\n'), { lineGap: 3 });
    }

    if (education.length > 0) {
      addSidebarHeader('Education');
      education.forEach(edu => {
        doc.fillColor('#111827').fontSize(9).text(edu.degree);
        doc.fillColor('#4b5563').fontSize(8).text(edu.school);
        doc.fillColor('#9ca3af').fontSize(7).text(edu.year);
        doc.moveDown(0.5);
      });
    }

  } else if (template === 'minimal') {
    // Minimalist Style
    doc.fillColor('#18181b').fontSize(32).text(personal_info.fullName || 'YOUR NAME');
    doc.fillColor('#71717a').fontSize(10).text(personal_info.profession?.toUpperCase() || '', { characterSpacing: 1 });
    doc.moveDown(2);

    const addMinimalSection = (label, contentFn) => {
      const startY = doc.y;
      doc.fillColor('#a1a1aa').fontSize(8).text(label.toUpperCase(), 40, startY, { width: 80 });
      doc.x = 130;
      doc.y = startY;
      contentFn();
      doc.moveDown(2);
      doc.x = 40;
    };

    addMinimalSection('Contact', () => {
      doc.fillColor('#27272a').fontSize(9).text(`${personal_info.email}\n${personal_info.phone}\n${personal_info.linkedin}`);
    });

    if (experience.length > 0) {
      addMinimalSection('Experience', () => {
        experience.forEach(exp => {
          doc.fillColor('#18181b').fontSize(10).text(exp.company, { continued: true }).fillColor('#71717a').text(`  ${exp.duration}`);
          doc.fillColor('#3f3f46').fontSize(9).text(exp.role);
          doc.fillColor('#52525b').fontSize(9).text(exp.description);
          doc.moveDown(0.5);
        });
      });
    }

    if (skills.length > 0) {
      addMinimalSection('Skills', () => {
        doc.fillColor('#27272a').fontSize(9).text(skills.join('   •   '));
      });
    }

  } else {
    // Classic Style
    doc.fillColor('#000000').fontSize(22).text(personal_info.fullName || 'YOUR NAME', { align: 'center' });
    doc.fontSize(12).italic().text(personal_info.profession || '', { align: 'center' });
    doc.moveDown(0.5);

    const contact = [personal_info.email, personal_info.phone, personal_info.linkedin, personal_info.github].filter(Boolean).join('  *  ');
    doc.fontSize(9).notitalic().text(contact, { align: 'center' });
    doc.moveDown(1);
    doc.strokeColor('#000000').lineWidth(0.5).moveTo(40, doc.y).lineTo(570, doc.y).stroke();
    doc.moveDown(1);

    const addClassicHeader = (title) => {
      doc.fillColor('#000000').fontSize(12).text(title.toUpperCase(), { characterSpacing: 1 });
      doc.moveDown(0.2);
    };

    addClassicHeader('Experience');
    experience.forEach(exp => {
      const y = doc.y;
      doc.fontSize(10).bold().text(exp.company, 40, y);
      doc.fontSize(10).bold().text(exp.duration, 40, y, { align: 'right' });
      doc.fontSize(10).italic().text(exp.role, 40);
      doc.fontSize(9).notitalic().text(exp.description);
      doc.moveDown(0.5);
    });

    doc.moveDown(1);
    addClassicHeader('Education');
    education.forEach(edu => {
      const y = doc.y;
      doc.fontSize(10).bold().text(edu.school, 40, y);
      doc.fontSize(10).bold().text(edu.year, 40, y, { align: 'right' });
      doc.fontSize(9).notitalic().text(edu.degree);
      doc.moveDown(0.3);
    });
  }

  doc.end();
};

module.exports = { generatePDF };
