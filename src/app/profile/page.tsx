"use client";
import { useEffect, useState } from "react";
import getUser from "./getUser";
import styled from "styled-components";
import changePassword from "./changePassword";
import { useRouter } from "next/navigation";
import signOut from "../lib/signout";
import Link from "next/link";
import CreateAccountForm from "../components/CreateAccountForm";

const Line = styled.div`
  display: grid;
  width: 400px;
  grid-template-columns: 1fr 5fr;
`;

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

const Links = styled.div`
  a {
    display: block;
  }
`;

export default function Page() {
  const [user, setUser] = useState<any>();
  const [inputs, setInputs] = useState({ password: "" });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchUser = async () => {
    const res = await getUser();
    const tempUser = JSON.parse(res || "");
    setUser(tempUser);
  };

  const handleChange = (e: any) => {
    const { value, name } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleChangePassword = async () => {
    setError(null);

    const res = await changePassword({
      email: user?.email,
      password: inputs?.password,
    });

    if (res?.success) {
      await signOut();
      router.push("/login");
    } else {
      setError(
        res?.error || "An error has occurred while resetting your password"
      );
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <h2>Your Profile</h2>
      <Line>
        <h4>Name: </h4>
        <span>{user?.name}</span>
      </Line>
      <Line>
        <h4>Email: </h4>
        <span>{user?.email}</span>
      </Line>
      <h2>Manage</h2>
      <div>
        <Link href="/aisles" legacyBehavior>
          <a>Aisles</a>
        </Link>
      </div>
      <div>
        <Link href="/homeAreas" legacyBehavior>
          <a>Home Areas</a>
        </Link>
      </div>
      <div>
        <Link href="/recipeTypes" legacyBehavior>
          <a>Recipe Types</a>
        </Link>
      </div>
      <div>
        <Link href="/stores" legacyBehavior>
          <a>Stores</a>
        </Link>
      </div>
      <FormStyles
        method="POST"
        onSubmit={async (e: any) => {
          e.preventDefault();
          await handleChangePassword();
        }}>
        <fieldset>
          <h2>Change your password</h2>
          {error && <Error>{error}</Error>}
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
          <button type="submit" className="submit">
            Change Password
          </button>
        </fieldset>
      </FormStyles>
      <CreateAccountForm />
    </div>
  );
}
