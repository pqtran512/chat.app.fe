import { Button } from "@mui/material";
import { useEffect, useState, FC } from "react";

interface ConfirmPhoneProps {
  onClick?: (isValid: boolean) => void;
}

const ConfirmPhone: FC<ConfirmPhoneProps> = ({ onClick }) => {
  const checkPhoneIsValid = () => {
    // call api check phone
    if (onclick) {
      onClick(true);
    } //tạm thời trả về true để code
  }

  return (
    <>
      <p>Confirm phone component</p>
      <Button onClick={checkPhoneIsValid}>Confirm</Button>
    </>
  );
};

export default ConfirmPhone;
