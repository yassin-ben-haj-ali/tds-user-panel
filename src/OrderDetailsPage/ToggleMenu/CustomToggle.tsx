import type { JSX } from "react";

type CustomStepProps = {
  stepNumber: number;
  component: JSX.Element;
  show: boolean;
  name: string;
};
type CustomToggleProps = {
  selected: number;
  setSelected: (selected: number) => void;
  steps: CustomStepProps[];
};
const CustomToggle = ({ selected, setSelected, steps }: CustomToggleProps) => {
  return (
    <div>
      {steps.map((step) => (
        <button
          key={step.stepNumber}
          className={`text-md relative px-4 py-2 font-semibold transition md:break-all ${
            selected === step.stepNumber ? "text-primary" : "text-[#2C2C2C]"
          }`}
          onClick={() => setSelected(step.stepNumber)}
        >
          {step.name}
          <span
            className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ease-in-out ${
              selected === step.stepNumber ? "w-full bg-primary" : "w-0"
            }`}
          ></span>
        </button>
      ))}
    </div>
  );
};

export default CustomToggle;
