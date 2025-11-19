import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useArticlesContext } from "../context/useArticleContext";

type Props = {
  stepNumber: number;
  stepName: string;
  stepStatus?: string | undefined;
};

const Step = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { formStep, setFormStep } = useArticlesContext();

  useEffect(() => {
    const urlStatus = searchParams.get("status");
    if (!urlStatus) {
      setSearchParams({ status: "tous" });
    } else if (urlStatus === props.stepStatus) {
      setFormStep(props.stepNumber as 1 | 2 | 3 | 4);
    }
  }, [
    searchParams,
    setSearchParams,
    setFormStep,
    props.stepNumber,
    props.stepStatus,
  ]);

  const changeFormStep = () => {
    setFormStep(props.stepNumber as 1 | 2 | 3 | 4);
    if (props.stepStatus) {
      setSearchParams({ status: props.stepStatus });
    }
  };

  return (
    <button
      onClick={changeFormStep}
      className={cn(
        "relative flex min-h-[45px] min-w-[150px] items-center justify-center gap-2 rounded-lg p-3 text-nav transition-colors",
        formStep === props.stepNumber
          ? "bg-primary text-white"
          : "bg-white text-primary"
      )}
    >
      <span>{props.stepName}</span>
    </button>
  );
};

export default Step;
