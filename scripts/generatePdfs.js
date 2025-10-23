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
  // Table styles
  table: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  tableHeader: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderBottom: '2px solid #1f4e79',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    borderBottom: '1px solid #dee2e6',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 8,
    paddingRight: 8,
  },
  tableRowEven: {
    backgroundColor: '#f8f9fa',
  },
  tableCol1: { 
    width: '35%',
    fontSize: 8,
    fontWeight: 'bold',
    paddingRight: 8,
  },
  tableCol2: { 
    width: '35%',
    fontSize: 8,
    fontStyle: 'italic',
    paddingRight: 8,
    color: '#666666',
  },
  tableCol3: { 
    width: '30%',
    fontSize: 8,
    color: '#1f4e79',
    fontWeight: 'bold',
  },
  tableHeaderCol1: { 
    width: '35%',
    fontSize: 9,
    fontWeight: 'bold',
    paddingRight: 8,
    color: '#1f4e79',
  },
  tableHeaderCol2: { 
    width: '35%',
    fontSize: 9,
    fontWeight: 'bold',
    paddingRight: 8,
    color: '#1f4e79',
  },
  tableHeaderCol3: { 
    width: '30%',
    fontSize: 9,
    fontWeight: 'bold',
    color: '#1f4e79',
  },
  // Leak stamp styles
  leakStamp: {
    position: 'absolute',
    bottom: 40,
    right: 50,
    backgroundColor: 'rgba(220, 53, 69, 0.1)',
    border: '3px solid #dc3545',
    borderRadius: 8,
    padding: 8,
    transform: 'rotate(-15deg)',
    width: 150,
    height: 60,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
  },
  stampText1: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#dc3545',
    textAlign: 'center',
    marginBottom: 2,
  },
  stampText2: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#dc3545',
    textAlign: 'center',
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
          
          // Bullet points (legacy)
          section.bulletPoints && !section.jargonTable && section.bulletPoints.map((point, pointIndex) =>
            React.createElement(Text, { key: pointIndex, style: { fontSize: 9, marginBottom: 3, marginLeft: 15 } }, `- ${point}`)
          ),
          
          // Jargon table
          section.jargonTable && React.createElement(View, { style: styles.table },
            // Table header
            React.createElement(View, { style: styles.tableHeader },
              React.createElement(Text, { style: styles.tableHeaderCol1 }, 'Corporate Jargon'),
              React.createElement(Text, { style: styles.tableHeaderCol2 }, 'Translation'),
              React.createElement(Text, { style: styles.tableHeaderCol3 }, 'Plain English')
            ),
            // Table rows
            ...section.jargonTable.map((row, rowIndex) =>
              React.createElement(View, { 
                key: rowIndex, 
                style: [styles.tableRow, rowIndex % 2 === 1 ? styles.tableRowEven : {}],
                wrap: false
              },
                React.createElement(Text, { style: styles.tableCol1 }, row.jargon || ''),
                React.createElement(Text, { style: styles.tableCol2 }, row.translation || ''),
                React.createElement(Text, { style: styles.tableCol3 }, row.plainEnglish || '')
              )
            )
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

      // Leak stamp (like it was stamped on the document)
      React.createElement(View, {
        style: styles.leakStamp,
        fixed: true
      },
        React.createElement(Text, { style: styles.stampText1 }, 'LEAKED TO'),
        React.createElement(Text, { style: styles.stampText2 }, 'theSludge.report')
      )
    )
  );
}

// Invoice-specific PDF document creator
function createInvoicePdfDocument(data) {
  return React.createElement(Document, null,
    React.createElement(Page, { size: 'A4', style: styles.page },
      // Invoice header
      React.createElement(View, { style: { marginBottom: 20 } },
        React.createElement(Text, { style: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 5 } }, data.title),
        React.createElement(Text, { style: { fontSize: 10, textAlign: 'center', color: '#666' } }, `Invoice #: ${data.invoiceNumber}`),
        React.createElement(Text, { style: { fontSize: 10, textAlign: 'center', color: '#666' } }, `Date: ${data.date}`)
      ),

      // Bill From / Bill To
      React.createElement(View, { style: { display: 'flex', flexDirection: 'row', marginBottom: 20, gap: 20 } },
        // Bill From
        React.createElement(View, { style: { width: '48%', padding: 10, backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' } },
          React.createElement(Text, { style: { fontSize: 10, fontWeight: 'bold', marginBottom: 5 } }, 'FROM:'),
          React.createElement(Text, { style: { fontSize: 9 } }, data.billFrom.name),
          React.createElement(Text, { style: { fontSize: 9 } }, data.billFrom.proprietor),
          data.billFrom.email && React.createElement(Text, { style: { fontSize: 9, color: '#666' } }, data.billFrom.email)
        ),
        // Bill To
        React.createElement(View, { style: { width: '48%', padding: 10, backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' } },
          React.createElement(Text, { style: { fontSize: 10, fontWeight: 'bold', marginBottom: 5 } }, 'BILL TO:'),
          React.createElement(Text, { style: { fontSize: 9 } }, data.billTo.name),
          data.billTo.attention && React.createElement(Text, { style: { fontSize: 9 } }, `Attn: ${data.billTo.attention}`),
          React.createElement(Text, { style: { fontSize: 9 } }, data.billTo.address),
          data.billTo.city && React.createElement(Text, { style: { fontSize: 9 } }, data.billTo.city)
        )
      ),

      // Line Items
      React.createElement(View, { style: { marginBottom: 20 } },
        // Header row
        React.createElement(View, { style: { display: 'flex', flexDirection: 'row', backgroundColor: '#1f4e79', color: '#fff', padding: 8, fontWeight: 'bold' } },
          React.createElement(Text, { style: { width: '75%', fontSize: 9 } }, 'Description'),
          React.createElement(Text, { style: { width: '25%', fontSize: 9, textAlign: 'right' } }, 'Amount')
        ),

        // Line items
        ...data.lineItems.map((item, index) => {
          // Category headers
          if (item.isHeader) {
            return React.createElement(View, {
              key: index,
              style: { backgroundColor: '#e9ecef', padding: 6, marginTop: index > 0 ? 8 : 0 }
            },
              React.createElement(Text, { style: { fontSize: 9, fontWeight: 'bold', color: '#1f4e79' } }, item.category)
            );
          }

          // Regular line items
          const itemStyle = {
            display: 'flex',
            flexDirection: 'row',
            padding: '4 8',
            borderBottom: '1px solid #dee2e6',
            backgroundColor: item.highlight ? '#fff3cd' : (item.isCredit ? '#d4edda' : '#fff')
          };

          return React.createElement(View, { key: index, style: itemStyle },
            React.createElement(View, { style: { width: '75%' } },
              React.createElement(Text, { style: { fontSize: 9 } }, item.item),
              item.note && React.createElement(Text, { style: { fontSize: 7, color: '#666', fontStyle: 'italic', marginTop: 2 } }, item.note)
            ),
            React.createElement(Text, {
              style: { width: '25%', fontSize: 9, textAlign: 'right', fontWeight: item.highlight ? 'bold' : 'normal' }
            }, `$${item.amount.toFixed(2)}`)
          );
        })
      ),

      // Totals
      React.createElement(View, { style: { marginLeft: '60%', marginBottom: 20 } },
        React.createElement(View, { style: { display: 'flex', flexDirection: 'row', padding: '4 8', borderBottom: '1px solid #dee2e6' } },
          React.createElement(Text, { style: { width: '50%', fontSize: 10 } }, 'SUBTOTAL:'),
          React.createElement(Text, { style: { width: '50%', fontSize: 10, textAlign: 'right' } }, `$${data.subtotal.toFixed(2)}`)
        ),
        React.createElement(View, { style: { display: 'flex', flexDirection: 'row', padding: '4 8', borderBottom: '1px solid #dee2e6' } },
          React.createElement(Text, { style: { width: '50%', fontSize: 9 } }, `Tax (${data.taxNote}):`,),
          React.createElement(Text, { style: { width: '50%', fontSize: 9, textAlign: 'right' } }, `$${data.tax.toFixed(2)}`)
        ),
        React.createElement(View, { style: { display: 'flex', flexDirection: 'row', padding: '6 8', backgroundColor: '#1f4e79', color: '#fff' } },
          React.createElement(Text, { style: { width: '50%', fontSize: 11, fontWeight: 'bold' } }, 'TOTAL DUE:'),
          React.createElement(Text, { style: { width: '50%', fontSize: 11, fontWeight: 'bold', textAlign: 'right' } }, `$${data.total.toFixed(2)}`)
        )
      ),

      // Payment terms
      React.createElement(View, { style: { padding: 10, backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', marginBottom: 15 } },
        React.createElement(Text, { style: { fontSize: 9, fontWeight: 'bold', marginBottom: 3 } }, 'Payment Terms:'),
        React.createElement(Text, { style: { fontSize: 9 } }, data.paymentTerms),
        data.latePaymentFee && React.createElement(Text, { style: { fontSize: 8, color: '#dc3545', marginTop: 3 } }, `Late Fee: ${data.latePaymentFee}`)
      ),

      // Notes
      data.notes && data.notes.length > 0 && React.createElement(View, { style: { marginBottom: 15 } },
        React.createElement(Text, { style: { fontSize: 9, fontWeight: 'bold', marginBottom: 5 } }, 'Notes:'),
        ...data.notes.map((note, index) =>
          React.createElement(Text, { key: index, style: { fontSize: 8, marginBottom: 2, marginLeft: 10 } }, `• ${note}`)
        )
      ),

      // Footer
      data.footer && React.createElement(View, { style: { marginTop: 20, paddingTop: 10, borderTop: '1px solid #dee2e6' } },
        React.createElement(Text, { style: { fontSize: 8, textAlign: 'center', fontStyle: 'italic', color: '#666' } }, data.footer)
      ),

      // Site footer
      React.createElement(Text, {
        style: { position: 'absolute', fontSize: 8, bottom: 20, left: 40, right: 40, textAlign: 'center', color: '#888888' },
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

      // Detect document type and use appropriate renderer
      const isInvoice = config.data.documentType === 'INVOICE' || config.data.lineItems;
      const pdfDocument = isInvoice
        ? createInvoicePdfDocument(config.data)
        : createPdfDocument(config.data);

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