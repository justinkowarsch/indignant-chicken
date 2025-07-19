const React = require('react');
const { renderToBuffer } = require('@react-pdf/renderer');
const fs = require('fs');
const path = require('path');

// Import PDF data from data files
const { pifProcedureData } = require('../src/data/pifProcedureData.js');

// Configuration for which PDFs to generate
const pdfConfigs = [
  {
    data: pifProcedureData,
    filename: 'official-unofficial-pif-procedure.pdf',
    description: 'Official Unofficial PIF Procedure'
  }
  // Add more PDFs here as needed:
  // {
  //   data: require('../src/data/anotherProcedure.js').anotherProcedureData,
  //   filename: 'another-leaked-document.pdf', 
  //   description: 'Another Leaked Document'
  // }
];

// Inline PDF component (Node.js compatible)
const { Document, Page, Text, View, StyleSheet } = require('@react-pdf/renderer');

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Times-Roman',
    fontSize: 10,
    lineHeight: 1.4,
  },
  confidentialHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#CC0000',
    marginBottom: 10,
    letterSpacing: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#1f4e79',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
    color: '#1f4e79',
  },
  content: {
    fontSize: 10,
    lineHeight: 1.4,
    marginBottom: 10,
  },
  footer: {
    position: 'absolute',
    fontSize: 8,
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    color: '#888888',
  },
});

function createPdfDocument(data) {
  return React.createElement(Document, null,
    React.createElement(Page, { size: 'A4', style: styles.page },
      React.createElement(View, { style: styles.confidentialHeader },
        React.createElement(Text, null, 'CONFIDENTIAL - INTERNAL DOCUMENT')
      ),
      React.createElement(View, { style: styles.title },
        React.createElement(Text, null, data.title)
      ),
      
      // Document metadata
      React.createElement(View, { style: { marginBottom: 20, padding: 10, backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' } },
        React.createElement(Text, { style: { fontSize: 9, marginBottom: 3 } }, `Document ID: ${data.documentId}`),
        React.createElement(Text, { style: { fontSize: 9, marginBottom: 3 } }, `Revision: ${data.revision}`),
        React.createElement(Text, { style: { fontSize: 9, marginBottom: 3 } }, `Effective Date: ${data.effectiveDate}`),
        React.createElement(Text, { style: { fontSize: 9, marginBottom: 3 } }, `Approved By: ${data.approvedBy}`)
      ),

      // Important notice
      data.importantNotice && React.createElement(View, { style: { backgroundColor: '#d1ecf1', padding: 8, marginBottom: 15, border: '1px solid #bee5eb' } },
        React.createElement(Text, { style: { fontSize: 9, fontWeight: 'bold', color: '#0c5460', marginBottom: 3 } }, 'IMPORTANT NOTICE'),
        React.createElement(Text, { style: { fontSize: 9 } }, data.importantNotice)
      ),
      
      // Sections
      ...data.sections.map((section, index) =>
        React.createElement(View, { key: index, style: { marginBottom: 15 } },
          React.createElement(Text, { style: styles.sectionTitle }, section.title),
          React.createElement(Text, { style: styles.content }, section.content),
          
          // Steps
          section.steps && section.steps.map((step, stepIndex) =>
            React.createElement(Text, { key: stepIndex, style: { fontSize: 9, marginBottom: 3, marginLeft: 15 } }, `• ${step}`)
          ),
          
          // Bullet points
          section.bulletPoints && section.bulletPoints.map((point, pointIndex) =>
            React.createElement(Text, { key: pointIndex, style: { fontSize: 9, marginBottom: 3, marginLeft: 15 } }, `- ${point}`)
          ),
          
          // Warning
          section.warning && React.createElement(View, { style: { backgroundColor: '#fff3cd', padding: 6, marginTop: 8, border: '1px solid #ffeaa7' } },
            React.createElement(Text, { style: { fontSize: 9, fontWeight: 'bold', color: '#856404' } }, '⚠️ WARNING'),
            React.createElement(Text, { style: { fontSize: 9, color: '#856404' } }, section.warning)
          ),
          
          // Pro tip
          section.proTip && React.createElement(View, { style: { backgroundColor: '#d1ecf1', padding: 6, marginTop: 8, border: '1px solid #bee5eb' } },
            React.createElement(Text, { style: { fontSize: 9, fontWeight: 'bold', color: '#0c5460' } }, 'PRO TIP'),
            React.createElement(Text, { style: { fontSize: 9, color: '#0c5460' } }, section.proTip)
          )
        )
      ),
      
      // Footnotes
      data.footnotes && data.footnotes.length > 0 && React.createElement(View, { style: { marginTop: 20, paddingTop: 10, borderTop: '1px solid #dee2e6' } },
        React.createElement(Text, { style: { fontSize: 8, fontWeight: 'bold', marginBottom: 5 } }, 'Footnotes:'),
        ...data.footnotes.map((footnote, index) =>
          React.createElement(Text, { key: index, style: { fontSize: 8, marginBottom: 3 } }, `${index + 1}. ${footnote}`)
        )
      ),

      // Document history
      data.documentHistory && React.createElement(View, { style: { marginTop: 15, padding: 8, backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' } },
        React.createElement(Text, { style: { fontSize: 8, fontWeight: 'bold', marginBottom: 5 } }, 'Document History:'),
        ...data.documentHistory.map((entry, index) =>
          React.createElement(Text, { key: index, style: { fontSize: 8, marginBottom: 2 } }, `• ${entry}`)
        )
      ),
      
      React.createElement(Text, { style: styles.footer },
        data.disclaimer || 'This document does not officially exist. Do not cite it in meetings. Brenda will deny it.'
      )
    )
  );
}

async function generatePdfs() {
  console.log('🔄 Generating PDFs...');
  
  try {
    // Ensure the static/pdf directory exists
    const pdfDir = path.join(__dirname, '../static/pdf');
    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir, { recursive: true });
      console.log('📁 Created pdf directory');
    }

    // Generate each configured PDF
    for (const config of pdfConfigs) {
      console.log(`📄 Generating ${config.description}...`);
      const pdfDocument = createPdfDocument(config.data);
      const pdfBuffer = await renderToBuffer(pdfDocument);
      
      const pdfPath = path.join(pdfDir, config.filename);
      fs.writeFileSync(pdfPath, pdfBuffer);
      
      console.log(`✅ ${config.description} generated: ${pdfPath}`);
      console.log(`📊 PDF size: ${(pdfBuffer.length / 1024).toFixed(2)} KB`);
    }
    
  } catch (error) {
    console.error('❌ Error generating PDFs:', error);
    process.exit(1);
  }
}

// Run the generator
generatePdfs().then(() => {
  console.log('🎉 All PDFs generated successfully!');
}).catch(error => {
  console.error('💥 PDF generation failed:', error);
  process.exit(1);
});