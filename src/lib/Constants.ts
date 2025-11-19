import type { OptionConfig } from "@/components/ui/ColumnFilter/ColumnOptions/types";

export const FILTER_OPTIONS: OptionConfig = {
  users: {
    role: [
      { id: 0, name: "Technicien", value: "Technicien" },
      { id: 1, name: "Gestionnaire", value: "Gestionnaire" },
    ],
  },
};
