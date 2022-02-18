import { GistFile } from "./GistFile";

export interface Gist {
  title: string;
  showFileNames: boolean;
  result: boolean;
  files: GistFile[];
}