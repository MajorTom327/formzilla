export type FormFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  requiredMessage?: string;
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

  public requiredMessage: string = 'This field is required';

  public component: string;

  public transformer: (value: any) => any;

  constructor({
    name,
    label,
    placeholder,
    required,
    requiredMessage,
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

    this.component = component;
    this.transformer = transformer || ((v: any) => v);
  }
}
