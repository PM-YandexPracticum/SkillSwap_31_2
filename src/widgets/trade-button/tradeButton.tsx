import { FC } from 'react';

import { TradeButtonUI } from '@app/shared/ui/trade-button';
import { TradeButtonProps } from '@app/shared/ui/trade-button/type';

export const TradeButton: FC<TradeButtonProps> = ({
  name,
  children,
  onClose,
}) => {
  const handleClick = () => {
    // логика роутинга...
  };

  return (
    <TradeButtonUI name={name} onClick={handleClick} onClose={onClose}>
      {children}
    </TradeButtonUI>
  );
};
