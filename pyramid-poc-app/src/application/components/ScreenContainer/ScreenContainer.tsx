import React, {ReactNode} from 'react';

export interface ScreenContainerProps {
  children: ReactNode | ReactNode[];
}

export const ScreenContainer = ({children}: ScreenContainerProps) => (
  <div className="p-3">
    {children}
  </div>
);
