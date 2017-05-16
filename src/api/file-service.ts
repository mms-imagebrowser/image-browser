import * as dirTree from 'directory-tree';

export class FileService {

  list(dir: string, callback: (result: string[]) => void) {
    callback(dirTree(dir));
  }
}
