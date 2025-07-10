import { LoginUI } from '@features/auth/ui/pages/login';

export const Login = () => {
  const title = 'Вход';
  return <LoginUI title={title} step={0} />;
};
