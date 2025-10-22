import React, { useState, useEffect } from 'react';

interface FormData {
  title: string;
  summary: string;
  alignment: string;
  roi: number;
  stakeholders: string;
  checkboxes: {
    policy: boolean;
    addendum: boolean;
    clarification: boolean;
    ownership: boolean;
    recognition: boolean;
    liability: boolean;
  };
}

interface BrightIdeasFormProps {
  onSubmit: () => void;
}

export default function BrightIdeasForm({ onSubmit }: BrightIdeasFormProps) {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    summary: '',
    alignment: '',
    roi: 300,
    stakeholders: '',
    checkboxes: {
      policy: false,
      addendum: false,
      clarification: false,
      ownership: false,
      recognition: false,
      liability: false,
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitAttempts, setSubmitAttempts] = useState(0);

  const validateTitle = (title: string): string => {
    if (title.length === 0) return 'Title is required';
    if (title.length > 15) return `Title too long (${title.length}/15 characters)`;
    if (!/^[a-zA-Z0-9\s]+$/.test(title)) return 'No special characters allowed';
    if (title.toLowerCase().includes('improve')) return 'The word "improve" is not allowed per Policy 12C';
    if (title.toLowerCase().includes('better')) return 'The word "better" implies current inadequacy';
    return '';
  };

  const validateSummary = (summary: string): string => {
    if (summary.length === 0) return 'Executive summary is required';
    if (summary.length !== 247) return `Must be exactly 247 characters (currently ${summary.length})`;
    if (!summary.includes('synergy')) return 'Must mention "synergy" at least once';
    if (!summary.includes('ROI')) return 'Must include "ROI" in summary';
    return '';
  };

  const validateStakeholders = (stakeholders: string): string => {
    if (stakeholders.length === 0) return 'Stakeholder list is required';
    const count = stakeholders.split(',').filter(s => s.trim()).length;
    if (count < 15) return `Only ${count} stakeholders listed. Minimum 15 required.`;
    return '';
  };

  const validateCheckboxes = (checkboxes: typeof formData.checkboxes): string => {
    const unchecked = Object.entries(checkboxes).filter(([_, checked]) => !checked);
    if (unchecked.length > 0) return 'All checkboxes must be checked to proceed';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {
      title: validateTitle(formData.title),
      summary: validateSummary(formData.summary),
      alignment: !formData.alignment ? 'Strategic alignment selection required' : '',
      stakeholders: validateStakeholders(formData.stakeholders),
      checkboxes: validateCheckboxes(formData.checkboxes),
    };

    // Add ridiculous additional validations based on attempt count
    if (submitAttempts >= 1) {
      newErrors.roi = formData.roi < 500 ? 'ROI expectations have been updated. Minimum is now 500%' : '';
    }
    if (submitAttempts >= 2) {
      newErrors.title = formData.title.length > 12 ? 'Title length reduced to 12 characters due to system constraints' : validateTitle(formData.title);
    }

    setErrors(newErrors);
    setSubmitAttempts(prev => prev + 1);

    if (Object.values(newErrors).every(error => error === '')) {
      setIsSubmitting(true);

      // Fake processing delay
      setTimeout(() => {
        setIsSubmitting(false);
        onSubmit();
      }, 3000);
    }
  };

  const allCheckboxesChecked = Object.values(formData.checkboxes).every(checked => checked);
  const formValid = Object.values(errors).every(error => error === '');

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-700">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Bright Ideas Submission Portal™
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          "Your Innovation Matters!"® | Version 14.3.7b | Last Updated: Yesterday
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Idea Title <span className="text-red-500">*</span>
            <span className="text-xs text-gray-500"> (Max 15 characters, no special characters)</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="Revolutionary Concept"
            maxLength={submitAttempts >= 2 ? 12 : 15}
          />
          <div className="text-xs text-gray-500 mt-1">{formData.title.length}/{submitAttempts >= 2 ? 12 : 15} characters</div>
          {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
        </div>

        {/* Executive Summary */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Executive Summary <span className="text-red-500">*</span>
            <span className="text-xs text-gray-500"> (Exactly 247 characters required)</span>
          </label>
          <textarea
            value={formData.summary}
            onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            rows={4}
            placeholder="This innovative synergy-driven solution will maximize ROI through strategic alignment..."
          />
          <div className={`text-xs mt-1 ${formData.summary.length === 247 ? 'text-green-500' : 'text-gray-500'}`}>
            {formData.summary.length}/247 characters {formData.summary.length === 247 ? '✓' : ''}
          </div>
          {errors.summary && <div className="text-red-500 text-sm mt-1">{errors.summary}</div>}
        </div>

        {/* Strategic Alignment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Strategic Alignment Category <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.alignment}
            onChange={(e) => setFormData(prev => ({ ...prev, alignment: e.target.value }))}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="">Select alignment category...</option>
            <option value="shareholder">Increases Shareholder Value</option>
            <option value="operational">Reduces Operational Excellence</option>
            <option value="synergistic">Enhances Synergistic Opportunities</option>
            <option value="other">Other (automatic rejection)</option>
          </select>
          {errors.alignment && <div className="text-red-500 text-sm mt-1">{errors.alignment}</div>}
        </div>

        {/* ROI Slider */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Expected ROI <span className="text-red-500">*</span>
            <span className="text-xs text-gray-500"> (Minimum {submitAttempts >= 1 ? '500%' : '300%'})</span>
          </label>
          <input
            type="range"
            min={submitAttempts >= 1 ? 500 : 300}
            max="5000"
            value={formData.roi}
            onChange={(e) => setFormData(prev => ({ ...prev, roi: parseInt(e.target.value) }))}
            className="w-full"
          />
          <div className="text-center text-lg font-bold text-gray-900 dark:text-white">{formData.roi}%</div>
          {errors.roi && <div className="text-red-500 text-sm mt-1">{errors.roi}</div>}
        </div>

        {/* Stakeholders */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Stakeholder Sign-offs Required <span className="text-red-500">*</span>
            <span className="text-xs text-gray-500"> (List all 15+ required approvals, comma-separated)</span>
          </label>
          <textarea
            value={formData.stakeholders}
            onChange={(e) => setFormData(prev => ({ ...prev, stakeholders: e.target.value }))}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            rows={3}
            placeholder="CEO, CFO, CTO, Department Head A, Department Head B, Legal, HR, IT Security..."
          />
          {errors.stakeholders && <div className="text-red-500 text-sm mt-1">{errors.stakeholders}</div>}
        </div>

        {/* Checkbox Maze */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Required Acknowledgments <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3 bg-gray-100 dark:bg-gray-800 p-4 rounded">
            {[
              { key: 'policy', text: "I've read Policy 47B-2", link: "/pdf/policy-47b-2.pdf" },
              { key: 'addendum', text: "I've read the Policy 47B-2 addendum" },
              { key: 'clarification', text: "I've read the clarification to the addendum" },
              { key: 'ownership', text: "I understand my idea becomes property of [COMPANY]" },
              { key: 'recognition', text: "I waive all rights to recognition or credit" },
              { key: 'liability', text: "I accept full liability for any negative outcomes" },
            ].map((item) => (
              <label key={item.key} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.checkboxes[item.key as keyof typeof formData.checkboxes]}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    checkboxes: { ...prev.checkboxes, [item.key]: e.target.checked }
                  }))}
                  className="mt-1"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {item.text}
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400"
                    >
                      (download)
                    </a>
                  )}
                </span>
              </label>
            ))}
          </div>
          {errors.checkboxes && <div className="text-red-500 text-sm mt-1">{errors.checkboxes}</div>}
        </div>

        {/* Risk Assessment (Auto-filled) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Risk Assessment Score (Auto-calculated)
          </label>
          <input
            type="text"
            value="UNACCEPTABLE"
            readOnly
            className="w-full p-3 border border-red-300 rounded bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 cursor-not-allowed"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-3 rounded font-medium transition-all ${
              isSubmitting
                ? 'bg-yellow-500 text-white cursor-not-allowed'
                : allCheckboxesChecked
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <>
                <span className="inline-block animate-spin mr-2">⏳</span>
                Processing Your Innovation...
              </>
            ) : (
              'Submit Bright Idea'
            )}
          </button>

          {submitAttempts > 0 && !isSubmitting && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Submission attempts: {submitAttempts} | Requirements may have changed
            </p>
          )}
        </div>
      </form>
    </div>
  );
}