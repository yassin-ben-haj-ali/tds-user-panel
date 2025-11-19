import { memo, type UIEvent } from "react";
import { Label } from "../../label";
import type { OptionsListProps } from "./types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ExtendedOptionsListProps extends OptionsListProps {
  onReachBottom?: () => void;
}

const OptionsList = memo(
  ({
    options,
    selectedValue,
    onSelect,
    onReachBottom,
  }: ExtendedOptionsListProps) => {
    const handleScroll = (event: UIEvent<HTMLDivElement>) => {
      const target = event.target as HTMLDivElement;
      if (
        target.scrollHeight - target.scrollTop === target.clientHeight &&
        onReachBottom
      ) {
        onReachBottom();
      }
    };

    return (
      <RadioGroup
        defaultValue="None"
        className="flex max-h-48 flex-col overflow-y-auto"
        value={selectedValue}
        onValueChange={onSelect}
        onScroll={handleScroll} // Attach the scroll handler
      >
        {options.map((option) => (
          <div className="flex items-center space-x-2" key={option.id}>
            <RadioGroupItem value={option.value} id={option.value} />
            <Label htmlFor={option.name}>{option.name}</Label>
          </div>
        ))}
      </RadioGroup>
    );
  }
);

OptionsList.displayName = "OptionsList";

export default OptionsList;
