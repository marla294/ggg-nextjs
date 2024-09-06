import { useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

interface RecaptchaProps {
  onVerify: (token: string) => void;
}

const Recaptcha = ({ onVerify }: RecaptchaProps) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleChange = () => {
    console.log("used recaptcha");
  };

  useEffect(() => {
    const verifyCallback = async () => {
      if (executeRecaptcha) {
        const token = await executeRecaptcha();
        onVerify(token);
      }
    };

    verifyCallback();
  }, [executeRecaptcha, onVerify]);

  return (
    <ReCAPTCHA
      onChange={handleChange}
      sitekey="6LdFsDIqAAAAAFWDiiY2B-1e-xYdVXrNGb7jUqIb"
      size="invisible"
    />
  );
};

export default Recaptcha;
