# Formzilla

## How to

You should implement you own form based on the FormHandler:

> BaseForm.tsx
```ts
import type { FormField } from "formzilla";
import { FormHandler } from "formzilla";
import { TextInput, PasswordInput } from "~/components/Inputs";

export class BaseForm<T> extends FormHandler<T> {
  constructor(fields: FormField[]) {
    super(fields);

    this.registerComponent("text", TextInput);
    this.registerComponent("password", PasswordInput);
  }
}

export default BaseForm;
```

This done, you can create some inherited form basically:

> UserForm.ts
```ts
import BaseForm from "./BaseForm";

export const fields: FormField[] = [
  new FormField({ name: 'username', label: 'Your Username', component: 'text'}),
  new FormField({ name: 'password', label: 'Your Password', component: 'password'}),
];

export class UserForm extends BaseForm<User> {
  constructor() {
    super(fields);
  }
}
```

The usage is pretty simple:
>LoginPage.tsx
```tsx
type Props = {};

const userForm = new UserForm();

export const LoginPage: React.FC<Props> = () => {
  return (
    <div>
      <Form method="post" className="flex flex-col gap-4">
        {userForm.render()}
        <div className="flex justify-end">
          <Button>Login</Button>
        </div>
      </Form>
    </div>
  )

}
```
