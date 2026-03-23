export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm extends LoginForm {
  displayName: string;
  confirmPassword: string;
}

export type ValidationErrors<T extends string> = Partial<Record<T, string>>;

export function validateLoginForm(form: LoginForm): ValidationErrors<'email' | 'password'> {
  const errors: ValidationErrors<'email' | 'password'> = {};

  if (!form.email.trim() || !/.+@.+\..+/.test(form.email)) {
    errors.email = '请输入有效的邮箱地址';
  }

  if (!form.password.trim()) {
    errors.password = '请输入密码';
  }

  return errors;
}

export function validateRegisterForm(
  form: RegisterForm,
): ValidationErrors<'displayName' | 'email' | 'password' | 'confirmPassword'> {
  const errors: ValidationErrors<'displayName' | 'email' | 'password' | 'confirmPassword'> = {};

  if (!form.displayName.trim()) {
    errors.displayName = '请输入昵称';
  }

  if (!form.email.trim() || !/.+@.+\..+/.test(form.email)) {
    errors.email = '请输入有效的邮箱地址';
  }

  if (form.password.trim().length < 8) {
    errors.password = '密码至少需要 8 位';
  }

  if (form.confirmPassword !== form.password) {
    errors.confirmPassword = '两次输入的密码不一致';
  }

  return errors;
}
