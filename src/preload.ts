import { Flatpak, Versions } from "./bridge";
import { contextBridge } from "electron";

contextBridge.exposeInMainWorld("versions", Versions);
contextBridge.exposeInMainWorld("flatpak", Flatpak);
