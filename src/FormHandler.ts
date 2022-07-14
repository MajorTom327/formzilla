import React from 'react';
import { Schema } from 'joi';
import FormField from './FormField';
import { InputProps } from './types/InputProps';

export class FormHandler<T> {
  protected fields: FormField[];

  protected schema?: Schema;

  protected components: Record<string, React.FC<InputProps>> = {};

  constructor(_fields: FormField[], _schema?: Schema<T>) {
    this.fields = _fields;
    this.schema = _schema;
  }

  protected registerComponent(name: string, component: React.FC<InputProps>) {
    this.components[name] = component;
  }

  public validate(item: T): Record<string, string> {
    if (this.schema) {
      const result = this.schema?.validate(item, { abortEarly: false });

      if (result.error) {
        return result.error.details.reduce((red: Record<string, string>, detail) => {
          const key = detail.context!.key! as string;
          return {
            ...red,
            [key]: detail.message,
          };
        }, {});
      }
    }
    return {};
  }

  public validateAsync(item: T): Promise<T> {
    return new Promise((resolve, reject) => {
      const result = this.validate(item);
      if (Object.keys(result).length > 0) {
        reject(result);
      }
      resolve(item);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  private getValue(path: string, item?: T): any {
    if (!item) return null;

    const parts = path.split('.');

    return parts.reduce(
      (red: any, part) => (red && red[part] ? red[part] : null),
      item,
    );
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

  public parse(item: FormData): T {
    return this.fields.reduce((acc, { name, transformer }) => {
      const value = item.get(name);
      if (value) {
        const cleanValue: any = transformer ? transformer(value) : value;
        return {
          ...acc,
          [name]: cleanValue,
        };
      }
      return acc;
    }, {}) as T;
  }
}

export default FormHandler;
