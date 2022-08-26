import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setToken } from "../store/reducer";

export function useToken() {
  const token = useSelector<RootState, string>(state => state.userToken);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (window.__token__ && window.__token__ !== 'undefined') {
      dispatch(setToken(window.__token__))
    }
  }, []);

  return [token];
}