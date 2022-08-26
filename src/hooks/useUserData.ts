import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IUserData, meRequestAsync } from "../store/me/actions";
import { RootState } from "../store/reducer";

export function useUserData() {
  const data = useSelector<RootState, IUserData>(state => state.me.data);
  const loading = useSelector<RootState, boolean>(state => state.me.loading);

  const token = useSelector<RootState, string>(state => state.userToken);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;

    dispatch<any>(meRequestAsync());
    
  }, [token]);

  return {
    data,
    loading
  };
}