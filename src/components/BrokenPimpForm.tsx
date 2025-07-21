import React, { useState, useEffect } from 'react';

const BrokenPimpForm: React.FC = () => {
  const [titleValue, setTitleValue] = useState('');
  const [titleDisabled, setTitleDisabled] = useState(false);
  const [description, setDescription] = useState('');
  const [roiValue, setRoiValue] = useState('');
  const [timeline, setTimeline] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);
  const [charCount, setCharCount] = useState(0);

  // Break the title field after 3 seconds of typing
  useEffect(() => {
    if (titleValue.length > 0 && !titleDisabled) {
      const timer = setTimeout(() => {
        setTitleDisabled(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [titleValue, titleDisabled]);

  // Character counter goes negative
  useEffect(() => {
    setCharCount(-description.length);
  }, [description]);

  // ROI field only accepts negative numbers
  const handleRoiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value && !value.startsWith('-')) {
      value = '-' + value.replace('-', '');
    }
    setRoiValue(value);
  };

  // Timeline randomly resets to heat death
  const handleTimelineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeline(e.target.value);
    
    // 30% chance it resets to heat death
    if (Math.random() < 0.3) {
      setTimeout(() => {
        setTimeline('heat-death');
      }, 1000);
    }
  };

  // Broken submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowError(true);
    }, 3000);
  };

  // Handle error message click for "training"
  const handleTrainingClick = () => {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg my-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">
          Submit Your Innovation Idea
        </h3>
        <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">
          PIMP Idea Submission Portal v2.1
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Idea Title - Gets disabled */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Idea Title:
          </label>
          <input
            type="text"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            disabled={titleDisabled}
            placeholder={titleDisabled ? "Field disabled - under maintenance since 2019" : "Enter your brilliant idea..."}
            className={`w-full px-3 py-2 text-sm border rounded-md transition-colors ${
              titleDisabled 
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 border-gray-300 dark:border-gray-600 cursor-not-allowed' 
                : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            }`}
          />
          {titleDisabled && (
            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
              🚫 Field automatically disabled for your protection
            </p>
          )}
        </div>

        {/* Description - Negative character count */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description:
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your idea in detail..."
            rows={3}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className={`text-xs mt-1 ${charCount < -50 ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}>
            Character limit: {charCount} {charCount < -100 && '(SYSTEM OVERLOAD)'}
          </p>
        </div>

        {/* ROI - Only negative numbers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Expected ROI:
            </label>
            <input
              type="text"
              value={roiValue}
              onChange={handleRoiChange}
              placeholder="-$$$"
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              (Only accepts negative numbers)
            </p>
          </div>

          {/* Timeline - Randomly resets */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Implementation Timeline:
            </label>
            <select
              value={timeline}
              onChange={handleTimelineChange}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select timeline...</option>
              <option value="never">Never</option>
              <option value="hell-freezes">When Hell Freezes</option>
              <option value="next-decade">Next Decade Maybe</option>
              <option value="heat-death">Upon heat death of universe</option>
            </select>
          </div>
        </div>

        {/* Auto-filled broken fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Priority Level:
            </label>
            <input
              type="text"
              value="Lowest Possible"
              disabled
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 cursor-not-allowed"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Assigned To:
            </label>
            <input
              type="text"
              value="Department of Circular References"
              disabled
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-md font-medium text-sm transition-all duration-200 ${
              isSubmitting
                ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing Innovation...
              </span>
            ) : (
              'SUBMIT'
            )}
          </button>
          
          {!isSubmitting && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              ← Button redirects to mandatory corporate training: "Managing Expectations in the Digital Age"
            </p>
          )}
        </div>

        {/* Error Message */}
        {showError && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-red-400">❌</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                  Error 404: Innovation Not Found
                </h3>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1 mb-3">
                  Your idea has been successfully not submitted to the appropriate committee for non-consideration. 
                  The system has determined your innovation poses a threat to existing inefficiencies.
                </p>
                <button
                  onClick={handleTrainingClick}
                  className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md transition-colors cursor-pointer"
                >
                  🎓 Begin Mandatory Training: "Managing Expectations in the Digital Age"
                </button>
                <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                  Please allow 6-8 business centuries for your idea to be properly ignored.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Status */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            <strong>Status:</strong> Working as intended™
          </p>
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-1">
            Please allow 6-8 business centuries for a response.
          </p>
        </div>
      </form>
    </div>
  );
};

export default BrokenPimpForm;