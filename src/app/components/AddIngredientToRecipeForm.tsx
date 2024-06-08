import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import useForm from "../lib/useForm";
import getIngredients from "../ingredients/getIngredients";
import useDebounce from "../hooks/useDebounce";
import addRecipeItem from "../recipe/[id]/addRecipeItem";

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

const AddIngredientFormStyles = styled.div`
  display: grid;
  grid-template-columns: minmax(40px, 4fr) minmax(30px, 1fr) minmax(300px, 16fr);
  grid-gap: 0.5rem;
  align-items: center;
  margin-bottom: 1rem;

  input,
  select {
    padding: 1rem;
    border: 1px solid black;
    font-size: 1.4rem;
    height: 4rem;
  }
`;

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

const AddIngredientToRecipeForm = ({ recipeId }: { recipeId: any }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownIngredients, setDropdownIngredients] = useState<any[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [ingredient, setIngredient] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const { handleChange, inputs, setInputs } = useForm({
    quantity: "",
  });

  const handleSearchChange = (e: any) => {
    const val = e.target.value;
    setSearchTerm(val);
    setDropdownOpen(true);
  };

  const fetchIngredients = async () => {
    const res = await getIngredients({ name: searchTerm });
    const tempIngredients = JSON.parse(res as string);
    setDropdownIngredients(tempIngredients);
  };

  const debouncedFetchIngredients = useDebounce(fetchIngredients, 200);

  useEffect(() => {
    debouncedFetchIngredients();
  }, [searchTerm]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addRecipeItem({
        quantity: inputs?.quantity,
        ingredientId: ingredient?._id,
        recipeId,
      });
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <FormStyles onSubmit={handleSubmit}>
      <h3>Add Ingredient To Recipe</h3>
      <AddIngredientFormStyles>
        <input
          required
          type="text"
          id="quantity"
          name="quantity"
          placeholder="Quantity"
          value={inputs.quantity}
          onChange={handleChange}
        />
        <div>{ingredient?.units || ""}</div>
        <div>
          <input
            name="searchTerm"
            id="searchTerm"
            placeholder="Search for ingredient..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <DropDown
            className={
              dropdownIngredients?.length && dropdownOpen ? "open" : ""
            }>
            {dropdownIngredients?.length &&
              dropdownIngredients.map((ing: any) => (
                <DropDownItemCover
                  key={ing._id}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setIngredient(ing);
                      setSearchTerm(ing.name);
                      setDropdownOpen(false);
                    }
                  }}>
                  <DropDownItem
                    key={ing.id}
                    onClick={() => {
                      setIngredient(ing);
                      setSearchTerm(ing.name);
                      setDropdownOpen(false);
                    }}>
                    {ing?.photo?.image?._meta?.url ? (
                      <img
                        key={ing.id}
                        src={ing?.photo?.image?._meta?.url}
                        alt={ing?.photo?.altText || ing?.name}
                      />
                    ) : ing?.photo?.imageUrl ? (
                      <img
                        key={ing.id}
                        src={ing?.photo?.imageUrl}
                        alt={ing?.photo?.altText || ing?.name}
                      />
                    ) : (
                      <div className="noPhoto" />
                    )}
                    <div>{ing.name}</div>
                  </DropDownItem>
                </DropDownItemCover>
              ))}
          </DropDown>
        </div>
      </AddIngredientFormStyles>
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
