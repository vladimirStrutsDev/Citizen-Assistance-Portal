import type { FC } from "react";

interface IProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
  className?: string;
}

const ProgressIndicator: FC<IProps> = ({
  currentStep,
  totalSteps,
  stepLabels,
  className = "",
}) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          {stepLabels.map((label, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;

            return (
              <div
                key={stepNumber}
                className="flex flex-col items-center space-y-2"
              >
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    transition-all duration-200
                    ${
                      isCompleted
                        ? "bg-indigo-600 text-white"
                        : isCurrent
                        ? "bg-indigo-100 text-indigo-600 border-2 border-indigo-600"
                        : "bg-gray-200 text-gray-500"
                    }
                  `}
                >
                  {isCompleted ? (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                </div>

                <span
                  className={`
                    text-xs font-medium text-center max-w-20
                    ${
                      isCompleted || isCurrent
                        ? "text-indigo-600"
                        : "text-gray-500"
                    }
                  `}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-200 -z-10">
          <div
            className="h-full bg-indigo-600 transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="text-center">
        <span className="text-sm text-gray-600">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
    </div>
  );
};

export default ProgressIndicator;
