import { Button } from "@mui/material";
import { useEffect, useState, FC } from "react";

interface ResetPasswordProps {
  onClick?: (isValid: boolean) => void;
}

const ResetPassword: FC<ResetPasswordProps> = ({ onClick }) => {
  const resetPassword = () => {
    // call api reset password
    if (onclick) {
      onClick(true);
    } //tạm thời trả về true để code
  }
  
  return (
    <>
      <p>Reset password component</p>
      <Button onClick={resetPassword}>Reset</Button>
    </>
  );
};

export default ResetPassword;
