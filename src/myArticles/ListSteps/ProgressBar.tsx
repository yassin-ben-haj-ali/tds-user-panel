import type React from "react";

type ProgressBarProps = {
  pourcentage: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ pourcentage }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-[80%] bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-primary h-2.5 rounded-full"
          style={{
            width: `${pourcentage}%`,
          }}
        ></div>
      </div>
      <div className="flex  items-center justify-between">
        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[#545454] whitespace-nowrap">
          {pourcentage}%
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
