import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { drawerActions } from "redux/slice/drawer/slice";

export const useDrawer = () => {
  const dispatch = useDispatch();
  const { isDrawerOpen } = useSelector(
    (state: RootState) => state.drawerReducer
  );

  const handleDrawerOpen = (status: boolean) => {
    dispatch(drawerActions(status));
  };

  return { isDrawerOpen, handleDrawerOpen };
};
