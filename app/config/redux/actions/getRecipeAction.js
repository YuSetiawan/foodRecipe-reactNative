import axios from 'axios';
const getRecipeAction = () => async (dispatch) => {
  try {
    const recipe = await axios.get(`http://192.168.1.9:4000/recipes`);
    const result = recipe.data.data;
    dispatch({type: 'GET_ALL_RECIPE', payload: result});
  } catch (err) {
    console.error(err.message);
  }
};

export default getRecipeAction;
