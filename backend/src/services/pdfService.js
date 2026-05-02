const PDFDocument = require('pdfkit');

const generatePDF = (cvData, res) => {
  const doc = new PDFDocument({ margin: 40 });
  doc.pipe(res);

  const { personal_info, experience, education, skills, projects, template } = cvData;

  // Color Schemes
  const colors = {
    modern: { primary: '#2563eb', secondary: '#4b5563', text: '#111827', light: '#6b7280' },
    classic: { primary: '#000000', secondary: '#000000', text: '#000000', light: '#333333' },
    minimal: { primary: '#18181b', secondary: '#71717a', text: '#27272a', light: '#a1a1aa' },
    creative: { primary: '#38bdf8', secondary: '#1e293b', text: '#ffffff', light: '#94a3b8' }
  };

  const theme = colors[template] || colors.modern;

  if (template === 'modern') {
    doc.fillColor(theme.primary).fontSize(28).text(personal_info.fullName || 'YOUR NAME', { align: 'left' });
    doc.fillColor(theme.secondary).fontSize(14).text((personal_info.profession || '').toUpperCase());
    doc.moveDown(0.5);

    doc.fontSize(9).fillColor(theme.light);
    const contact = [personal_info.email, personal_info.phone, personal_info.linkedin, personal_info.github].filter(Boolean).join('  |  ');
    doc.text(contact);
    doc.moveDown(1);
    doc.strokeColor(theme.primary).lineWidth(2).moveTo(40, doc.y).lineTo(570, doc.y).stroke();
    doc.moveDown(1.5);

    const leftColX = 40;
    const rightColX = 380;
    const currentY = doc.y;

    doc.x = leftColX;
    doc.y = currentY;
    if (experience.length > 0) {
      doc.fillColor(theme.primary).fontSize(12).text('EXPERIENCE');
      doc.moveDown(0.5);
      experience.forEach(exp => {
        doc.fillColor(theme.text).fontSize(10).text(exp.role, { continued: true }).fillColor(theme.light).text(`  at ${exp.company}`);
        doc.fillColor(theme.light).fontSize(8).text(exp.duration);
        doc.fillColor(theme.secondary).fontSize(9).text(exp.description);
        doc.moveDown(0.8);
      });
    }

    doc.x = rightColX;
    doc.y = currentY;
    if (skills.length > 0) {
      doc.fillColor(theme.primary).fontSize(11).text('SKILLS');
      doc.moveDown(0.3);
      doc.fillColor(theme.text).fontSize(9).text(skills.join('\n'), { lineGap: 2 });
      doc.moveDown(1);
    }
    if (education.length > 0) {
      doc.fillColor(theme.primary).fontSize(11).text('EDUCATION');
      education.forEach(edu => {
        doc.fillColor(theme.text).fontSize(9).text(edu.degree);
        doc.fillColor(theme.light).fontSize(8).text(edu.school);
        doc.moveDown(0.4);
      });
    }
  } else if (template === 'creative') {
    const sidebarWidth = 180;
    doc.rect(0, 0, sidebarWidth, doc.page.height).fill(theme.secondary);

    doc.fillColor('#ffffff').fontSize(22).text(personal_info.fullName || 'NAME', 30, 40, { width: sidebarWidth - 40 });
    doc.fillColor(theme.primary).fontSize(10).text((personal_info.profession || '').toUpperCase(), { width: sidebarWidth - 40 });

    doc.moveDown(2);
    doc.fillColor(theme.light).fontSize(8).text('CONTACT', { characterSpacing: 1 });
    doc.fillColor('#ffffff').fontSize(8).text(`${personal_info.email || ''}\n${personal_info.phone || ''}\n${personal_info.linkedin || ''}\n${personal_info.github || ''}`, { lineGap: 3 });

    if (skills.length > 0) {
      doc.moveDown(2);
      doc.fillColor(theme.light).fontSize(8).text('SKILLS', { characterSpacing: 1 });
      doc.fillColor('#ffffff').fontSize(8).text(skills.join('\n'), { lineGap: 3 });
    }

    doc.x = sidebarWidth + 30;
    doc.y = 40;
    doc.fillColor('#0f172a').fontSize(14).text('PROFESSIONAL EXPERIENCE');
    doc.strokeColor('#e2e8f0').lineWidth(1).moveTo(doc.x, doc.y).lineTo(570, doc.y).stroke();
    doc.moveDown(1);
    experience.forEach(exp => {
      doc.fillColor('#0f172a').fontSize(11).text(exp.role, { continued: true }).fillColor(theme.primary).text(` | ${exp.company}`);
      doc.fillColor('#94a3b8').fontSize(9).text(exp.duration);
      doc.fillColor('#4b5563').fontSize(9).text(exp.description);
      doc.moveDown(1);
    });

    if (education.length > 0) {
      doc.moveDown(1);
      doc.fillColor('#0f172a').fontSize(14).text('EDUCATION');
      doc.strokeColor('#e2e8f0').lineWidth(1).moveTo(doc.x, doc.y).lineTo(570, doc.y).stroke();
      doc.moveDown(0.8);
      education.forEach(edu => {
        doc.fillColor('#0f172a').fontSize(10).text(edu.degree);
        doc.fillColor('#64748b').fontSize(9).text(`${edu.school} (${edu.year})`);
        doc.moveDown(0.5);
      });
    }
  } else if (template === 'minimal') {
    doc.fillColor(theme.primary).fontSize(32).text(personal_info.fullName || 'YOUR NAME');
    doc.fillColor(theme.secondary).fontSize(10).text((personal_info.profession || '').toUpperCase(), { characterSpacing: 1 });
    doc.moveDown(2);

    const addMinimalSection = (label, contentFn) => {
      const startY = doc.y;
      doc.fillColor(theme.light).fontSize(8).text(label.toUpperCase(), 40, startY, { width: 80 });
      doc.x = 130;
      doc.y = startY;
      contentFn();
      doc.moveDown(2);
      doc.x = 40;
    };

    addMinimalSection('Contact', () => {
      doc.fillColor(theme.text).fontSize(9).text(`${personal_info.email}\n${personal_info.phone}`);
    });

    if (experience.length > 0) {
      addMinimalSection('Experience', () => {
        experience.forEach(exp => {
          doc.fillColor(theme.primary).fontSize(10).text(exp.company, { continued: true }).fillColor(theme.secondary).text(`  ${exp.duration}`);
          doc.fillColor(theme.text).fontSize(9).text(exp.role);
          doc.fillColor(theme.secondary).fontSize(9).text(exp.description);
          doc.moveDown(0.5);
        });
      });
    }

    if (skills.length > 0) {
      addMinimalSection('Skills', () => {
        doc.fillColor(theme.text).fontSize(9).text(skills.join('   •   '));
      });
    }
  } else {
    // Classic
    doc.fillColor('#000000').fontSize(22).text(personal_info.fullName || 'YOUR NAME', { align: 'center' });
    doc.fontSize(12).italic().text(personal_info.profession || '', { align: 'center' });
    doc.moveDown(0.5);
    const contact = [personal_info.email, personal_info.phone].filter(Boolean).join('  *  ');
    doc.fontSize(9).notitalic().text(contact, { align: 'center' });
    doc.moveDown(1);
    doc.strokeColor('#000000').lineWidth(0.5).moveTo(40, doc.y).lineTo(570, doc.y).stroke();
    doc.moveDown(1);

    experience.forEach(exp => {
      doc.fontSize(10).bold().text(exp.company);
      doc.fontSize(10).italic().text(exp.role);
      doc.fontSize(9).notitalic().text(exp.description);
      doc.moveDown(0.5);
    });
  }

  doc.end();
};

module.exports = { generatePDF };
