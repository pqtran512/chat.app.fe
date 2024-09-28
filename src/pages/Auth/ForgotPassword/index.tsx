import { useEffect, useState, FC } from "react";
import ConfirmPhone from "./ConfirmPhone";
import ResetPassword from "./ResetPassword";

interface ForgotPasswordProps {}

const ForgotPassword: FC<ForgotPasswordProps> = ({}) => {
  const [isResetPasswordStep, setIsResetPasswordStep] = useState(false);

  const handleConfirmPhone = (isPhoneValid: boolean) => {
    if (isPhoneValid) {
      setIsResetPasswordStep(true);
    }
  };

  return (
    <>
      {isResetPasswordStep ? (
        <ResetPassword></ResetPassword>
      ) : (
        <ConfirmPhone onClick={handleConfirmPhone}></ConfirmPhone>
      )}
    </>
  );
};

export default ForgotPassword;
