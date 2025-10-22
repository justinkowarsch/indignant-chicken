import React, { useState } from 'react';
import BrightIdeasForm from './BrightIdeasForm';
import RejectionEmail, { predefinedEmails } from './RejectionEmail';
import WorkflowChart from './WorkflowChart';

export default function BrightIdeasDemo() {
  const [currentStep, setCurrentStep] = useState<'form' | 'email' | 'workflow'>('form');
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0);

  const handleFormSubmit = () => {
    setCurrentStep('email');
    setCurrentEmailIndex(0);
  };

  const handleEmailAcknowledge = () => {
    if (currentEmailIndex < predefinedEmails.length - 1) {
      setCurrentEmailIndex(prev => prev + 1);
    } else {
      setCurrentStep('workflow');
    }
  };

  if (currentStep === 'form') {
    return <BrightIdeasForm onSubmit={handleFormSubmit} />;
  }

  if (currentStep === 'email') {
    return (
      <RejectionEmail
        key={predefinedEmails[currentEmailIndex].id}
        emailData={predefinedEmails[currentEmailIndex]}
        onAcknowledge={handleEmailAcknowledge}
        delay={1000}
      />
    );
  }

  if (currentStep === 'workflow') {
    return (
      <div className="space-y-6">
        <div className="text-center p-6 bg-red-100 dark:bg-red-900/20 rounded-lg border border-red-300 dark:border-red-600">
          <h3 className="text-xl font-bold text-red-800 dark:text-red-400 mb-2">
            🎉 Congratulations! You've Experienced the Full Process!
          </h3>
          <p className="text-red-700 dark:text-red-300">
            Your idea is now trapped in the workflow below. See if you can find where it's stuck!
          </p>
        </div>
        <WorkflowChart highlightUserPath={true} />
      </div>
    );
  }

  return null;
}