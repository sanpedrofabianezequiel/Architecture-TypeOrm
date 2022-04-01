import React, {ReactNode} from "react";

export interface LeftRightProps {
  left: ReactNode;
  right: ReactNode;
}

export const LeftRight = ({left, right}: LeftRightProps) => (
  <div className="flex justify-content-between">
    <div className="font-bold">
      {left}
    </div>
    <div className="font-medium">
      {right}
    </div>
  </div>
);
