import IngredientListItem from "./IngredientListItem";

const IngredientsList = ({ ingredients }: { ingredients: any }) => {
  console.log({ ingredients });
  return (
    <div>
      {ingredients?.map((ingredient: any) => (
        <IngredientListItem ingredient={ingredient} />
        // <div key={ingredient?._id}>
        //   {ingredient?.photo?.image?._meta?.url ? (
        //     <img
        //       src={ingredient?.photo?.image?._meta?.url}
        //       alt={ingredient?.photo?.altText || ingredient?.name}
        //     />
        //   ) : (
        //     <div className="noPhoto">No Photo</div>
        //   )}

        //   <div className="details">{ingredient?.name}</div>
        // </div>
      ))}
    </div>
  );
};

export default IngredientsList;
