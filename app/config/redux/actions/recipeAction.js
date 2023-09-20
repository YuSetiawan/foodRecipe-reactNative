import axios from 'axios';

export const createRecipeActions = (recipes_title, recipes_ingredients, recipes_video, recipes_photo, userId) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append('recipes_title', recipes_title);
    formData.append('recipes_ingredients', recipes_ingredients);
    formData.append('recipes_video', recipes_video);
    formData.append('users_id', userId);
    if (recipes_photo) {
      formData.append('recipes_photo', {
        uri: recipes_photo,
        name: 'recipes_photo.jpg',
        type: 'image/jpeg',
      });
    }
    const recipes = await axios.post('https://food-recipe-server-six.vercel.app/recipes/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (recipes.data.message === 'Create Product Success') {
      alert('Create recipe success');
    }
    const result = recipes.data.data;

    dispatch({type: 'CREATE_RECIPE', payload: result});
  } catch (err) {
    console.error(err.message);
  }
};

export const updateRecipeActions = (title, ingredients, photo, video, recipes_id, setModalVisible, getData) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append('recipes_title', title);
    formData.append('recipes_ingredients', ingredients);
    formData.append('recipes_video', video);
    if (photo) {
      formData.append('recipes_photo', {
        uri: photo,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });
    }
    const recipes = await axios.put(`https://food-recipe-server-six.vercel.app/recipes/${recipes_id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (recipes.data.statusCode === 200) {
      setModalVisible(false);
      alert('Update Recipe Success');
      getData();
    }
    const result = recipes.data.data;
    dispatch({type: 'UPDATE_RECIPE', payload: result});
  } catch (err) {
    console.error(err.message);
  }
};

export const deleteRecipeActions = (recipes_id) => async (dispatch) => {
  try {
    const recipes = await axios.delete(`https://food-recipe-server-six.vercel.app/recipes/${recipes_id}`);

    alert('Delete Recipe Success');

    const result = recipes.data.data;
    dispatch({type: 'DELETE_RECIPE', payload: result});
  } catch (err) {
    console.error(err.message);
  }
};
