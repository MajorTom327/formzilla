import React from 'react';
import FormField from './FormField';
import { InputProps } from './types/InputProps';

export class FormHandler<T> {
  protected fields: FormField[];

  protected components: Record<string, React.FC<InputProps>> = {};

  constructor(_fields: FormField[]) {
    this.fields = _fields;
  }

  protected registerComponent(name: string, component: React.FC<InputProps>) {
    this.components[name] = component;
  }

  public validate(item: T): Record<string, string> {
    const errors: Record<string, string> = {};
    this.fields.forEach((field) => {
      // @ts-ignore
      const error = field.validate(item[field.name] as any);
      if (error) {
        errors[field.name] = error;
      }
    });
    return errors;
  }

  public render(item?: T): React.ReactNode[] {
    let errors: Record<string, string> = {};

    if (item) errors = this.validate(item);

    return this.fields.map((field: FormField) => {
      const component = this.components[field.component];

      if (!component) {
        throw new Error(`Component ${field.component} not registered`);
      }

      return React.createElement(component, {
        key: field.name,
        name: field.name,
        label: field.label,
        defaultValue: this.getValue(field.name, item),
        required: field.required,
        error: errors[field.name],
      } as InputProps);
    });
    return [];
  }

  private getValue(path: string, item?: T): any {
    if (!item) return null;

    const parts = path.split('.');

    return parts.reduce(
      (red: any, part) => (red && red[part] ? red[part] : null),
      item,
    );
  }
}

export default FormHandler;
