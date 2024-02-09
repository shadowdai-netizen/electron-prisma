import { PrismaClient } from "./generated/client";

export interface IElectronAPI {
  node: () => string;
  chrome: () => string;
  electron: () => string;
  ping: () => void;
  prisma: PrismaClient;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
