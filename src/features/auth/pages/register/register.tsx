import { RegisterUI } from '@features/auth';

export const Register = () => {
  const title = 'Шаг 1 из 3';
  const step = 1;
  return <RegisterUI title={title} step={1} />;
};
