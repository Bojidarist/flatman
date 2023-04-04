import { Versions, Flatpak } from "../bridge";

declare global {
  interface Window {
    versions: typeof Versions;
    flatpak: typeof Flatpak;
  }
}
