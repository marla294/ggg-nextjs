import styled from "styled-components";
// import recipeTypes from "../lib/recipeTypes";
import { ThreeDots } from "react-loader-spinner";
import { useEffect, useState } from "react";
import getRecipeTypes from "../recipeTypes/getRecipeTypes";

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

const RecipeForm = ({
  handleChange,
  inputs,
  handleSubmit,
  loading,
  handleImageChange,
  formName,
}: {
  handleChange: any;
  inputs: any;
  handleSubmit: any;
  loading: boolean;
  handleImageChange: any;
  formName: string;
}) => {
  const [recipeTypes, setRecipeTypes] = useState<any>(null);

  useEffect(() => {
    const fetchRecipeTypes = async () => {
      const tempRecipeTypes = await getRecipeTypes();
      const parsedRecipeTypes = await JSON.parse(tempRecipeTypes as string);
      setRecipeTypes(parsedRecipeTypes);
    };

    fetchRecipeTypes();
  }, []);

  return (
    <FormStyles onSubmit={handleSubmit}>
      <h2>{formName ? formName : "Edit"} Recipe</h2>
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
      <label htmlFor="image">
        Image (if no update, leave blank)
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleImageChange}
        />
      </label>
      <label htmlFor="description">
        Description
        <textarea
          rows={7}
          id="description"
          name="description"
          placeholder="Description"
          value={inputs.description}
          onChange={handleChange}
        />
      </label>
      <label>
        RecipeLink
        <input
          type="text"
          id="recipeLink"
          name="recipeLink"
          placeholder="Recipe Link"
          value={inputs.recipeLink}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="type">
        Type
        <select
          name="type"
          id="type"
          onChange={handleChange}
          value={inputs.type}>
          {recipeTypes?.map((type: any) => (
            <option value={type?.name} key={type?._id}>
              {type?.name}
            </option>
          ))}
        </select>
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
  );
};

export default RecipeForm;
