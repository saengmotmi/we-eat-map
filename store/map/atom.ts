import { MutableRefObject, RefObject } from "react";
import { atom } from "recoil";

export const mapState = atom<MutableRefObject<google.maps.Map | null> | null>({
  key: "mapState",
  default: null,
});

export const mapContainerState = atom<RefObject<HTMLElement> | null>({
  key: "mapContainerState",
  default: null,
});
