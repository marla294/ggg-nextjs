import { useRef, useState } from "react";
import { FormStyles } from "./IngredientForm";
import { ThreeDots } from "react-loader-spinner";
import { IngredientsBarStyles } from "../ingredients/page";
import styled from "styled-components";
import useForm from "../lib/useForm";
import getIngredients from "../ingredients/getIngredients";

const DropDown = styled.div`
  display: none;
  position: absolute;
  z-index: 2;
  width: 75%;
  max-height: 20rem;
  overflow: auto;
  border: 1px solid var(--lightGray);
  &.open {
    display: block;
  }
`;

const DropDownItemCover = styled.div`
  background-color: white;
  transition: all 0.1s;
  :hover {
    padding-left: 0.3rem;
    background-color: yellow;
  }
  :focus {
    outline: none;
    padding-left: 0.3rem;
    background-color: yellow;
  }
`;

const DropDownItem = styled.div`
  border-bottom: 1px solid var(--lightGray);
  background: white;
  display: grid;
  grid-template-columns: 4rem auto;
  grid-gap: 1rem;
  align-items: center;
  height: 4rem;
  cursor: pointer;
  img {
    width: 4rem;
    max-height: 3.9rem;
    object-fit: cover;
    padding: 0.5rem;
  }
  .noPhoto {
    width: 4rem;
    height: 100%;
  }
  :hover {
    text-decoration: underline;
  }
`;

const AddIngredientToRecipeForm = ({ loading }: { loading: boolean }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownIngredients, setDropdownIngredients] = useState(null);
  const searchRef = useRef(null);
  const { handleChange, inputs, setInputs } = useForm({
    quantity: "",
  });

  const handleSearchChange = (e: any) => {
    const val = e.target.value;
    setSearchTerm(val);
  };

  const fetchIngredients = async () => {
    const res = await getIngredients({ name: searchTerm });
    const tempIngredients = JSON.parse(res as string);
    setDropdownIngredients(tempIngredients);
  };

  return (
    <FormStyles>
      <h3>Add Ingredient To Recipe</h3>
      <IngredientsBarStyles>
        <input
          required
          type="text"
          id="quantity"
          name="quantity"
          placeholder="Quantity"
          value={inputs.quantity}
          onChange={handleChange}
        />
        <input
          name="searchTerm"
          id="searchTerm"
          placeholder="Search for ingredient..."
          value={searchTerm}
          onChange={handleSearchChange}
          ref={searchRef}
        />
      </IngredientsBarStyles>
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
    </FormStyles>
  );
};

export default AddIngredientToRecipeForm;
