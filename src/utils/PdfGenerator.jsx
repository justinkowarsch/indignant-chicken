import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

// Corporate-style PDF styling
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 40,
    fontFamily: "Times-Roman",
    fontSize: 10,
    lineHeight: 1.4,
  },
  // Header section
  confidentialHeader: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    color: "#CC0000",
    marginBottom: 10,
    letterSpacing: 2,
  },
  companyHeader: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1f4e79",
    marginBottom: 5,
  },
  documentType: {
    fontSize: 10,
    textAlign: "center",
    color: "#666666",
    marginBottom: 20,
    fontStyle: "italic",
  },
  // Title section
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#1f4e79",
    textDecoration: "underline",
  },
  // Document metadata
  metadata: {
    fontSize: 9,
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f8f9fa",
    border: "1px solid #dee2e6",
  },
  metadataRow: {
    flexDirection: "row",
    marginBottom: 3,
  },
  metadataLabel: {
    width: 100,
    fontWeight: "bold",
  },
  metadataValue: {
    flex: 1,
  },
  // Content sections
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 8,
    color: "#1f4e79",
  },
  content: {
    fontSize: 10,
    lineHeight: 1.4,
    textAlign: "justify",
    marginBottom: 10,
  },
  step: {
    fontSize: 10,
    marginBottom: 6,
    marginLeft: 15,
    lineHeight: 1.4,
  },
  bulletPoint: {
    fontSize: 10,
    marginBottom: 4,
    marginLeft: 20,
    lineHeight: 1.4,
  },
  // Warning/Notice boxes
  warning: {
    backgroundColor: "#fff3cd",
    padding: 8,
    marginBottom: 10,
    fontSize: 9,
    border: "1px solid #ffeaa7",
    borderRadius: 3,
  },
  warningTitle: {
    fontWeight: "bold",
    color: "#856404",
    marginBottom: 3,
  },
  notice: {
    backgroundColor: "#d1ecf1",
    padding: 8,
    marginBottom: 10,
    fontSize: 9,
    border: "1px solid #bee5eb",
    borderRadius: 3,
  },
  noticeTitle: {
    fontWeight: "bold",
    color: "#0c5460",
    marginBottom: 3,
  },
  // Footer
  footer: {
    position: "absolute",
    fontSize: 8,
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    color: "#888888",
    borderTop: "1px solid #dee2e6",
    paddingTop: 10,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 8,
    bottom: 15,
    right: 40,
    color: "#888888",
  },
});

// PDF Document Component for Official Procedures
const OfficialProcedurePDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Confidential Header */}
      <View style={styles.confidentialHeader}>
        <Text>CONFIDENTIAL - INTERNAL DOCUMENT</Text>
      </View>

      {/* Company Header */}
      <View style={styles.companyHeader}>
        <Text>CORPORATE EFFICIENCY SOLUTIONS</Text>
      </View>
      
      <View style={styles.documentType}>
        <Text>Internal Process Documentation</Text>
        <Text>For Authorized Personnel Only</Text>
      </View>

      {/* Document Title */}
      <View style={styles.title}>
        <Text>{data.title}</Text>
      </View>

      {/* Document Metadata */}
      <View style={styles.metadata}>
        <View style={styles.metadataRow}>
          <Text style={styles.metadataLabel}>Document ID:</Text>
          <Text style={styles.metadataValue}>{data.documentId}</Text>
        </View>
        <View style={styles.metadataRow}>
          <Text style={styles.metadataLabel}>Revision:</Text>
          <Text style={styles.metadataValue}>{data.revision}</Text>
        </View>
        <View style={styles.metadataRow}>
          <Text style={styles.metadataLabel}>Effective Date:</Text>
          <Text style={styles.metadataValue}>{data.effectiveDate}</Text>
        </View>
        <View style={styles.metadataRow}>
          <Text style={styles.metadataLabel}>Approved By:</Text>
          <Text style={styles.metadataValue}>{data.approvedBy}</Text>
        </View>
        <View style={styles.metadataRow}>
          <Text style={styles.metadataLabel}>Review Date:</Text>
          <Text style={styles.metadataValue}>{data.reviewDate}</Text>
        </View>
      </View>

      {/* Important Notice */}
      {data.importantNotice && (
        <View style={styles.notice}>
          <Text style={styles.noticeTitle}>IMPORTANT NOTICE</Text>
          <Text>{data.importantNotice}</Text>
        </View>
      )}

      {/* Content Sections */}
      {data.sections.map((section, index) => (
        <View key={index}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          
          {section.content && (
            <Text style={styles.content}>{section.content}</Text>
          )}

          {section.steps && section.steps.map((step, stepIndex) => (
            <Text key={stepIndex} style={styles.step}>
              • {step}
            </Text>
          ))}

          {section.bulletPoints && section.bulletPoints.map((point, pointIndex) => (
            <Text key={pointIndex} style={styles.bulletPoint}>
              - {point}
            </Text>
          ))}

          {section.warning && (
            <View style={styles.warning}>
              <Text style={styles.warningTitle}>⚠️ WARNING</Text>
              <Text>{section.warning}</Text>
            </View>
          )}

          {section.proTip && (
            <View style={styles.notice}>
              <Text style={styles.noticeTitle}>💡 PRO TIP</Text>
              <Text>{section.proTip}</Text>
            </View>
          )}
        </View>
      ))}

      {/* Document Footer */}
      <Text style={styles.footer}>
        This document contains proprietary and confidential information. 
        Unauthorized distribution is prohibited. Document authenticity cannot be verified.
        {'\n'}Classification: INTERNAL USE ONLY | Distribution: RESTRICTED
      </Text>

      {/* Page Number */}
      <Text style={styles.pageNumber}>
        Page 1 of 1
      </Text>
    </Page>
  </Document>
);

export default OfficialProcedurePDF;