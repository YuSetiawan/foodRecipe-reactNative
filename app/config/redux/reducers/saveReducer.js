const initialState = {
  save: [],
  saveDetail: [],
};

const saveReducer = (state = initialState, action) => {
  if (action.type === 'GET_ALL_SAVE') {
    return {
      ...state,
      save: action.payload,
    };
  } else if (action.type === 'GET_DETAIL_SAVE') {
    return {
      ...state,
      saveDetail: action.payload,
    };
  } else if (action.type === 'CREATE_SAVE') {
    return state;
  } else if (action.type === 'UPDATE_SAVE') {
    return state;
  } else if (action.type === 'DELETE_SAVE') {
    return state;
  } else {
    return state;
  }
};

export default saveReducer;
