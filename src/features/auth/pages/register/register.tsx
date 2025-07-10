import { RegisterUI } from '@features/auth/ui/pages';
import {
  getRegistrationMaxStep,
  getRegistrationStep,
} from '@services/selectors';
import { useSelector } from '@services/store.ts';

export const Register = () => {
  const step = useSelector(getRegistrationStep);
  const stepTotal = useSelector(getRegistrationMaxStep);
  const title = `Шаг ${step} из ${stepTotal}`;
  return <RegisterUI title={title} step={step} stepTotal={stepTotal} />;
};
