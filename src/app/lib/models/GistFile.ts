export interface GistFile {
  name: string;
  fileType: 'html' | 'css' | 'js' | 'ts';
  content?: string;
}