import { RegisterUI } from '@features/auth/ui/pages';

export const Register = () => {
  const title = 'Шаг 1 из 3';
  const step = 1;
  const stepTotal = 3;
  return <RegisterUI title={title} step={step} stepTotal={stepTotal} />;
};
