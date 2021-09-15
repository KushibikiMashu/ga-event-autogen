type ConvertStart = {
    action: "convert_start";
    category: "convert";
};

type ConvertEnd = {
    action: "convert_end";
    category: "convert";
};

type ConvertError = {
    action: "convert_error";
    category: "convert";
};

type NewEvent = {
    action: string;
    category: number;
    hasLabel: boolean;
};

export type Event = (ConvertStart | ConvertEnd | ConvertError | NewEvent) & {
  label?: Record<string, string | number | boolean>;
  value?: string;
};