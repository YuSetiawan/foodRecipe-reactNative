import axios from 'axios';

export const deleteSaveActions = (bookmarks_id) => async (dispatch) => {
  try {
    const value = await axios.delete(`http://192.168.1.9:4000/bookmarks/${bookmarks_id}`);
    alert('Delete Save Success');
    const result = value.data.data;
    dispatch({type: 'DELETE_SAVE', payload: result});
  } catch (err) {
    console.error(err.message);
  }
};
