import React, {useCallback} from 'react';
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";

export const SeeMoreButton = () => {
  const navigate = useNavigate();
  const onClick = useCallback(() => navigate('/history'), [navigate]);
  return (
    <div className="justify-content-center flex">
      <Button className="p-button-text" label="See More" onClick={onClick} />
    </div>
  );
};
