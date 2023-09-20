import axios from 'axios';

export const createCommentActions = (id, idUser, comment) => async (dispatch) => {
  try {
    const data = {
      recipes_id: id,
      comment_text: comment,
      users_id: idUser,
    };
    const comments = await axios.post('https://food-recipe-server-six.vercel.app/comments/', data);
    if (comments.data.statusCode === 201) {
      alert('Comment created');
    }
    const result = comments.data.data;

    dispatch({type: 'CREATE_COMMENT', payload: result});
  } catch (err) {
    console.error(err.message);
  }
};

export const getUserCommentActions = (recipes_id) => async (dispatch) => {
  try {
    const comments = await axios.get(`https://food-recipe-server-six.vercel.app/comments/${recipes_id}`);
    const result = comments.data.data;
    dispatch({type: 'GET_ALL_COMMENT', payload: result});
  } catch (err) {
    console.log(err.message);
  }
};
