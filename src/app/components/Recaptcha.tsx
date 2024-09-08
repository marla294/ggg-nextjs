import { useEffect } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

interface RecaptchaProps {
  onVerify: (token: string) => void;
}

const Recaptcha = ({ onVerify }: RecaptchaProps) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    const verifyCallback = async () => {
      if (executeRecaptcha) {
        const token = await executeRecaptcha();
        onVerify(token);
      }
    };

    verifyCallback();
  }, [executeRecaptcha, onVerify]);

  return null;
};

export default Recaptcha;
