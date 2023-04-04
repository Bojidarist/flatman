import { Versions } from "../bridge";

declare global {
  interface Window {
    versions: typeof Versions;
  }
}
