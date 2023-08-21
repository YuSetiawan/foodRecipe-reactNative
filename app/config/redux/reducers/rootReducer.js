import {combineReducers} from 'redux';
import recipeReducer from './recipeReducer';
import likeReducer from './likeReducer';
import saveReducer from './saveReducer';
import commentReducer from './commentReducer';

const rootReducer = combineReducers({
  recipe: recipeReducer,
  like: likeReducer,
  save: saveReducer,
  comment: commentReducer,
});

export default rootReducer;
