import { Reducer, ActionCreator, AnyAction } from 'redux';

export type RootState = {
  commentText: string;
  userToken: string;
}

const initialState: RootState = {
  commentText: 'Привет, Skillbox!',
  userToken: '',
}

const UPDATE_COMMENT = 'UPDATE_COMMENT';
const SET_TOKEN = 'SET_TOKEN';

export const updateComment: ActionCreator<AnyAction> = (text) => ({
  type: UPDATE_COMMENT, 
  text,
});

export const setToken: ActionCreator<AnyAction> = (token) => ({
  type: SET_TOKEN, 
  token,
});

export const rootReducer: Reducer<RootState> = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COMMENT:
      return {
        ...state,
        commentText: action.text
      }
    case SET_TOKEN:
      return {
        ...state,
        userToken: action.token
      }
    default:
      return state;
  }
}