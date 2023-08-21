import axios from 'axios';

export const deleteLikeActions = (likeds_id) => async (dispatch) => {
  try {
    const value = await axios.delete(`http://192.168.1.9:4000/likeds/${likeds_id}`);
    alert('Delete Like Success');
    const result = value.data.data;
    dispatch({type: 'DELETE_LIKE', payload: result});
  } catch (err) {
    console.error(err.message);
  }
};
