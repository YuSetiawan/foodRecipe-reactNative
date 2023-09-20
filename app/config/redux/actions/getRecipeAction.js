import axios from 'axios';
const getRecipeAction = () => async (dispatch) => {
  try {
    const recipe = await axios.get(`https://food-recipe-server-six.vercel.app/recipes`);
    const result = recipe.data.data;
    dispatch({type: 'GET_ALL_RECIPE', payload: result});
  } catch (err) {
    console.error(err.message);
  }
};

export default getRecipeAction;
