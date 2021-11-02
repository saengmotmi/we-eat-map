import { atom } from "recoil";

export const storeDetailState = atom<google.maps.places.PlaceResult>({
  key: "storeDetailState",
  default: {},
});
