import { useState, FC } from "react";
import ConfirmPhone from "./ConfirmPhone";
import ResetPassword from "./ResetPassword";

interface ForgotPasswordProps {}

const ForgotPassword: FC<ForgotPasswordProps> = ({}) => {
  const [isResetPasswordStep, setIsResetPasswordStep] = useState(false);
  const [phone, setPhone] = useState("");

  const handleConfirmPhone = (isPhoneValid: boolean, phone: string) => {
    if (isPhoneValid) {
      setIsResetPasswordStep(true);
      setPhone(phone);
    }
  };

  return (
    <>
      {isResetPasswordStep ? (
        <ResetPassword phoneNumber={phone}/>
      ) : (
        <ConfirmPhone onClick={handleConfirmPhone}></ConfirmPhone>
      )}
    </>
  );
};

export default ForgotPassword;
