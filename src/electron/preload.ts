import { PrismaClient } from "../generated/client";
import { IElectronAPI } from "../api";
import { ipcRenderer } from "electron";

const dbUrl = process?.env?.dbUrl;
const qePath = process?.env?.qePath;

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: dbUrl,
    },
  },
  // see https://github.com/prisma/prisma/discussions/5200
  // @ts-ignore
  __internal: {
    engine: {
      binaryPath: qePath,
    },
  },
});

const electronAPI: IElectronAPI = {
  prisma,
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke("ping"),
};

window.electronAPI = electronAPI;
