const React = require('react');
const { renderToBuffer } = require('@react-pdf/renderer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Auto-discover PDF data files
function discoverPdfConfigs() {
  const dataDir = path.join(__dirname, '../src/data');
  const configs = [];
  
  if (!fs.existsSync(dataDir)) {
    console.log('📁 No data directory found');
    return configs;
  }
  
  const files = fs.readdirSync(dataDir).filter(file => 
    file.endsWith('.js') && !file.startsWith('_') // Skip files starting with _
  );
  
  for (const file of files) {
    try {
      const filePath = path.join(dataDir, file);
      const dataModule = require(filePath);
      
      // Get the first exported data object (should be named like xxxData)
      const dataExport = Object.values(dataModule).find(exp => 
        typeof exp === 'object' && exp !== null && !Array.isArray(exp)
      );
      
      if (dataExport && dataExport.title) {
        const baseName = file.replace('.js', '');
        
        // Convert camelCase to kebab-case for filename
        const kebabName = baseName
          .replace(/Data$/, '') // Remove "Data" suffix
          .replace(/([A-Z])/g, '-$1') // Add dash before capital letters
          .toLowerCase()
          .replace(/^-/, ''); // Remove leading dash
        
        const pdfFilename = `${kebabName}.pdf`;
        
        // Generate friendly description
        const description = baseName
          .replace(/Data$/, '') // Remove "Data" suffix
          .replace(/([A-Z])/g, ' $1') // Add space before capital letters
          .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
          .trim();
        
        configs.push({
          data: dataExport,
          filename: pdfFilename,
          description: description
        });
        
        console.log(`📋 Discovered: ${description} -> ${pdfFilename}`);
      }
    } catch (error) {
      console.warn(`⚠️  Skipping ${file}: ${error.message}`);
    }
  }
  
  return configs;
}

// Auto-generate PDF configurations
const pdfConfigs = discoverPdfConfigs();

// Inline PDF component (Node.js compatible)
const { Document, Page, Text, View, StyleSheet, Link } = require('@react-pdf/renderer');

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
      
      // Footer section (in document flow)
      React.createElement(View, { style: { marginTop: 30, paddingTop: 15, borderTop: '1px solid #dee2e6' } },
        React.createElement(Text, { 
          style: { fontSize: 8, textAlign: 'center', color: '#888888' }
        }, data.disclaimer || 'This document does not officially exist.')
      ),

      // Fixed footer with clickable link
      React.createElement(Link, {
        src: 'https://thesludge.report',
        style: {
          position: 'absolute',
          fontSize: 8,
          bottom: 20,
          left: 40,
          right: 40,
          textAlign: 'center',
          color: '#0066cc',
          textDecoration: 'underline'
        },
        fixed: true
      }, 'theSludge.report')
    )
  );
}

// Helper function to create content hash
function createContentHash(data) {
  return crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
}

// Load/save hash cache
function loadHashCache() {
  const hashFile = path.join(__dirname, '../.pdf-hashes.json');
  if (fs.existsSync(hashFile)) {
    return JSON.parse(fs.readFileSync(hashFile, 'utf8'));
  }
  return {};
}

function saveHashCache(hashes) {
  const hashFile = path.join(__dirname, '../.pdf-hashes.json');
  fs.writeFileSync(hashFile, JSON.stringify(hashes, null, 2));
}

async function generatePdfs() {
  console.log('🔄 Checking PDFs for changes...');
  
  try {
    // Ensure the static/pdf directory exists
    const pdfDir = path.join(__dirname, '../static/pdf');
    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir, { recursive: true });
      console.log('📁 Created pdf directory');
    }

    // Load existing hashes
    const hashCache = loadHashCache();
    const newHashes = {};
    let generatedCount = 0;
    let skippedCount = 0;

    // Check each configured PDF
    for (const config of pdfConfigs) {
      const contentHash = createContentHash(config.data);
      const pdfPath = path.join(pdfDir, config.filename);
      const cacheKey = config.filename;
      
      newHashes[cacheKey] = contentHash;
      
      // Skip if content hasn't changed and file exists
      if (hashCache[cacheKey] === contentHash && fs.existsSync(pdfPath)) {
        console.log(`⏭️  Skipping ${config.description} (no changes)`);
        skippedCount++;
        continue;
      }

      console.log(`📄 Generating ${config.description}...`);
      const pdfDocument = createPdfDocument(config.data);
      const pdfBuffer = await renderToBuffer(pdfDocument);
      
      fs.writeFileSync(pdfPath, pdfBuffer);
      
      console.log(`✅ ${config.description} generated: ${pdfPath}`);
      console.log(`📊 PDF size: ${(pdfBuffer.length / 1024).toFixed(2)} KB`);
      generatedCount++;
    }

    // Save updated hashes
    saveHashCache(newHashes);
    
    console.log(`🎉 PDF generation complete! Generated: ${generatedCount}, Skipped: ${skippedCount}`);
    
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