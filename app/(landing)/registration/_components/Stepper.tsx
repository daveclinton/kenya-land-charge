import React from "react";

type StepperProps = {
  currentStep: number;
};

const Stepper: React.FC<StepperProps> = ({ currentStep }) => (
  <div className="mb-8 flex justify-center">
    <div className="flex items-center">
      {[1, 2, 3].map((step) => (
        <React.Fragment key={step}>
          <div
            className={`w-8 h-8 rounded-full ${
              currentStep >= step ? "bg-sky-500 text-white" : "bg-gray-300"
            } flex items-center justify-center`}
          >
            {step}
          </div>
          {step < 3 && <div className="w-16 h-1 bg-gray-300"></div>}
        </React.Fragment>
      ))}
    </div>
  </div>
);

export default Stepper;
