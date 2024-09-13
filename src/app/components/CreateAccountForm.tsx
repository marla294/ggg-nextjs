"use client";
import { useState } from "react";
import styled from "styled-components";
import useForm from "../lib/useForm";
import createAccount from "../profile/createAccount";
import { ThreeDots } from "react-loader-spinner";
import Recaptcha from "../components/Recaptcha";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const FormStyles = styled.form`
  padding: 2rem;
  font-size: 1rem;
  label {
    display: block;
    font-weight: 450;
    margin-bottom: 0.25rem;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 0.25rem;
    font-size: 1rem;
    border: 1px solid black;
    &:focus {
      outline: 0;
      border-color: var(--orange);
    }
  }
  h2 {
    font-weight: 350;
  }
  button {
    width: auto;
    padding: 0.7rem 1rem;
    margin: 1rem 1rem 0.5rem 0;
    transition: 0.2s;
  }

  .submit {
    background: var(--lime);
    color: var(--darkGreen);
    border: 1px solid var(--darkGreen);
    height: 40px;
    &:hover {
      background: var(--darkGreen);
      color: white;
    }
  }

  .clear {
    background: var(--yellow);
    color: var(--darkYellow);
    border: 1px solid var(--darkYellow);
    &:hover {
      background: var(--darkYellow);
      color: white;
    }
  }

  .cancel {
    background: var(--orange);
    color: var(--darkOrange);
    border: 1px solid var(--darkOrange);
    &:hover {
      background: var(--darkOrange);
      color: white;
    }
  }
`;

const Error = styled.div`
  color: red;
  border: 1px solid red;
  padding: 10px;
  margin-bottom: 10px;
`;

const LoadingContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 500px;
  align-items: center;
  margin-top: 1rem;
  grid-gap: 2rem;
`;

const CreateAccountForm = ({ title }: { title: string }) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const { handleChange, inputs } = useForm({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await createAccount({ ...inputs, token });
      setLoading(false);
    } catch (e) {
      console.error(e);
      setError(e as string);
    }
  };

  const handleRecaptchaVerify = (t: string | null) => {
    if (t && !token) {
      setToken(t);
    }
  };

  return (
    <GoogleReCaptchaProvider
      // reCaptchaKey={process.env.PUBLIC_RECAPTCHA_SITE_KEY || ""}
      reCaptchaKey="6LdFsDIqAAAAAFWDiiY2B-1e-xYdVXrNGb7jUqIb"
      scriptProps={{
        async: false,
        defer: true,
        appendTo: "body",
      }}>
      <FormStyles
        method="POST"
        onSubmit={async (e: any) => {
          e.preventDefault();
          await handleSubmit();
        }}>
        <fieldset>
          <h2>{title}</h2>
          {error && <Error>{error}</Error>}
          <label htmlFor="name">
            Name<span className="required">&nbsp;*</span>
            <input
              required
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={inputs.name}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="email">
            Email<span className="required">&nbsp;*</span>
            <input
              required
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={inputs.email}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="password">
            Password<span className="required">&nbsp;*</span>
            <input
              required
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={inputs.password}
              onChange={handleChange}
            />
          </label>
          <Recaptcha onVerify={handleRecaptchaVerify} />
          <LoadingContainer>
            <button type="submit" className="submit">
              {loading ? (
                <ThreeDots
                  visible={true}
                  height="16"
                  width="40"
                  color="#4fa94d"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{
                    display: "grid",
                    justifyItems: "center",
                  }}
                  wrapperClass=""
                />
              ) : (
                <>Create Account</>
              )}
            </button>
          </LoadingContainer>
        </fieldset>
      </FormStyles>
    </GoogleReCaptchaProvider>
  );
};

export default CreateAccountForm;
