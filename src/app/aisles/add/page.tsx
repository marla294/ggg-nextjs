"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useForm from "../../lib/useForm";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import addAisle from "./addAisle";

const FormStyles = styled.form`
  box-shadow: var(--bs);
  padding: 2rem;
  font-size: 1.2rem;
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
    font-size: 1.2rem;
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

const LoadingContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 500px;
  align-items: center;
  margin-top: 1rem;
  grid-gap: 2rem;
`;

export default function AddAisle() {
  const router = useRouter();
  const { handleChange, inputs } = useForm({
    name: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addAisle({
        ...inputs,
      });
      setLoading(false);
      router.push("/aisles");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <FormStyles onSubmit={handleSubmit}>
        <h2>Add Aisle</h2>
        <label>
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
        <LoadingContainer>
          <button type="submit" className="submit">
            {loading ? (
              <ThreeDots
                visible={true}
                height="15"
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
              <>Submit</>
            )}
          </button>
        </LoadingContainer>
      </FormStyles>
    </div>
  );
}
