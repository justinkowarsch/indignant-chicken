// src/components/EmailCard.tsx
import React, { ReactNode } from "react";
import "./EmailCard.css";

/**
 * Props for the EmailCard component.
 */
interface EmailCardProps {
  /** Sender name */
  sender?: string;
  /** Recipient name */
  recipient?: string;
  /** Email subject line */
  subject?: string;
  /** Date or timestamp string */
  date?: string;
  /** Body content (JSX or text) */
  children: ReactNode;
}

/**
 * A reusable "email" styled card for Docusaurus MDX.
 */
const EmailCard: React.FC<EmailCardProps> = ({
  sender = "Unknown Sender",
  recipient = "You",
  subject = "(no subject)",
  date = new Date().toLocaleDateString(),
  children,
}) => (
  <div className="email-card">
    <div className="email-card__header">
      <div className="email-card__avatar">{sender.charAt(0).toUpperCase()}</div>
      <div className="email-card__meta">
        <strong>{sender}</strong> → <strong>{recipient}</strong>
        <div className="email-card__subject">{subject}</div>
      </div>
      <div className="email-card__date">{date}</div>
    </div>
    <div className="email-card__body">{children}</div>
  </div>
);

export default EmailCard;
