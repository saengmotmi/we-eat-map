import { atom } from "recoil";

export const mapState = atom<google.maps.Map | null>({
  key: "mapState",
  default: null,
});

// export const mapContainerState = atom<RefObject<HTMLElement> | null>({
//   key: "mapContainerState",
//   default: null,
// });
