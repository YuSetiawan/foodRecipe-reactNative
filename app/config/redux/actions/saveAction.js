import axios from 'axios';

export const deleteSaveActions = (bookmarks_id) => async (dispatch) => {
  try {
    const value = await axios.delete(`https://food-recipe-server-six.vercel.app/bookmarks/${bookmarks_id}`);
    alert('Delete Save Success');
    const result = value.data.data;
    dispatch({type: 'DELETE_SAVE', payload: result});
  } catch (err) {
    console.error(err.message);
  }
};
