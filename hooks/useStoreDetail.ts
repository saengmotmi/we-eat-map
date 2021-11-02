import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { storeDetailActions } from "redux/slice/storeDetail/slice";

export const useStoreDetail = () => {
  const dispatch = useDispatch();
  const storeDetail = useSelector(
    (state: RootState) => state.storeDetailReducer
  );

  const handleStoreDetail = (payload: google.maps.places.PlaceResult) => {
    dispatch(storeDetailActions(payload));
  };

  return { storeDetail, handleStoreDetail };
};
