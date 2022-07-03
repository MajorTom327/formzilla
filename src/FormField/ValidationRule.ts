export type ValidationRule = {
  regex?: RegExp;
  f?: (value: any) => boolean;
  message: string;
};

export default ValidationRule;
