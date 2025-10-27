import type { FC, ReactNode } from "react";
import CardHeader from "./CardHeader";
import LoadingSpinner from "./LoadingSpinner";

interface IProps {
  currentStep: number;
  stepLabels: string[];
  isLoading: boolean;
  children: ReactNode;
}

const Card: FC<IProps> = ({
  currentStep,
  stepLabels,
  isLoading,
  children,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <CardHeader currentStep={currentStep} stepLabels={stepLabels} />

      <div className="p-6 sm:p-8">
        {isLoading ? <LoadingSpinner /> : children}
      </div>
    </div>
  );
};

export default Card;
