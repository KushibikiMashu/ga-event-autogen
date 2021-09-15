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

export type Event = (ConvertStart | ConvertEnd | ConvertError) & {
  label?: Record<string, string | number | boolean>;
  value?: string;
};