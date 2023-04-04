import { Versions } from "./bridge";
import { contextBridge } from "electron";

contextBridge.exposeInMainWorld("versions", Versions);
