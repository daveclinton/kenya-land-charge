import React from "react";

const ReviewStep = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Review your application</h3>
      <p className="mb-4">
        Please review all the information you've provided before submitting your
        application.
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Ensure all personal information is correct</li>
        <li>Verify the property details</li>
        <li>Double-check the loan amount and terms</li>
        <li>Confirm all required documents have been uploaded</li>
      </ul>
      <p className="mt-4">
        If you need to make any changes, please use the "Back" button to
        navigate to the relevant section.
      </p>
    </div>
  );
};

export default ReviewStep;
