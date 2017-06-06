import * as dirTree from 'directory-tree';

export class FileService {

  list(dir: string, callback: (result: string[]) => void) {
    callback(dirTree(dir));
  }

  listimages(dir: string, callback: (result: string[]) => void) {
    callback(dirTree(dir, ['.jpg', '.jpeg', '.png'])); // TODO: more extensions?
  }
}
