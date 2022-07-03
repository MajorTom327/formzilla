import ValidationRule from "./ValidationRule";

export type FormFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  requiredMessage?: string;
  rules?: ValidationRule[];
  component: string;
  transformer?: (value: any) => any;
  defaultValue?: any;
  option?: string;
};

export class FormField {
  public name: string;
  public label: string;
  public placeholder?: string;
  public required: boolean = false;
  public requiredMessage: string = "This field is required";
  public rules: ValidationRule[] = [];
  public component: string;

  public transformer: (value: any) => any;

  constructor({
    name,
    label,
    placeholder,
    required,
    requiredMessage,
    rules,
    component,
    transformer,
  }: FormFieldProps) {
    this.name = name;
    this.label = label;
    this.placeholder = placeholder;
    this.required = required || false;
    if (requiredMessage) {
      this.requiredMessage = requiredMessage;
    }

    this.rules = rules || [];
    this.component = component;
    this.transformer = transformer || ((v: any) => v);
  }

  public validate(value: any): string | null {
    if (this.required && (!value || value === "")) {
      return this.requiredMessage;
    }

    let error: string | null = this.rules.reduce<string | null>((red, rule) => {
      if (red !== null) return red;
      if (rule.regex && !rule.regex.test(value)) {
        return rule.message;
      }
      if (rule.f && !rule.f(value)) {
        return rule.message;
      }
      return null;
    }, null);

    return error;
  }
}
