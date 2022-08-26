import { useEffect } from 'react';
import { Reducer, ActionCreator, AnyAction, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { MeRequestAction, MeRequestErrorAction, MeRequestSuccessAction, ME_REQUEST, ME_REQUEST_ERROR, ME_REQUEST_SUCCESS } from './me/actions';
import { meReducer, MeState } from './me/reducer';

export type RootState = {
  commentText: string;
  userToken: string;
  me: MeState
}

const UPDATE_COMMENT = 'UPDATE_COMMENT';
type UpdateCommentAction = {
  type: typeof UPDATE_COMMENT;
  text: string;
}
export const updateComment: ActionCreator<UpdateCommentAction> = (text) => ({
  type: UPDATE_COMMENT, 
  text,
});

const SET_TOKEN = 'SET_TOKEN';
type SetTokenAction = {
  type: typeof SET_TOKEN;
  token: string;
}
export const setToken: ActionCreator<SetTokenAction> = (token) => ({
  type: SET_TOKEN, 
  token,
});

export const saveToken = (): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch, getState) => {
  useEffect(() => {
    if (window.__token__ && window.__token__ !== 'undefined') {
      dispatch(setToken(window.__token__))
    }
  }, []);
}

const initialState: RootState = {
  commentText: 'Привет, Skillbox!',
  userToken: '',
  me: {
    loading: false,
    error: '',
    data: {},
  },
}

type MyAction = UpdateCommentAction 
  | SetTokenAction
  | MeRequestAction
  | MeRequestSuccessAction
  | MeRequestErrorAction;
export const rootReducer: Reducer<RootState, MyAction> = (state = initialState, action) => {
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
    case ME_REQUEST:
    case ME_REQUEST_SUCCESS:
    case ME_REQUEST_ERROR:
      return {
        ...state,
        me: meReducer(state.me, action),
      }
    default:
      return state;
  }
}