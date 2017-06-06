import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {isNullOrUndefined} from 'util';

@Injectable()
export class SelectionService {
  private directory = new BehaviorSubject<any>('/');
  private images = new BehaviorSubject<any>(null);
  private currentPath: string;

  public setDirectory(path: string) {
    this.currentPath = path;
    this.directory.next({path: path});
  }

  public getDirectory(): Observable<any> {
    return this.directory.asObservable();
  }

  fireDirectoryUpdate() {
    this.setDirectory(this.currentPath);
  }

  public setImages(images: ImageFile[]) {
    this.images.next({images: images});
  }

  public getImages(): Observable<any> {
    return this.images.asObservable();
  }

  public getSelectedImagePathsSync(): string[] {
    const paths: string[] = [];

    if (!isNullOrUndefined(this.images.getValue()) &&
      !isNullOrUndefined(this.images.getValue().images)) {
      this.images.getValue().images.forEach(image => {
          paths.push(image.path);
        }
      );
    }
    return paths;
  }
}

export class ImageFile {
  name: string;
  path: string;
  extension: string;
  selected: boolean;
  size: number;

  constructor(name: string, path: string, extension: string, selected: boolean, size: number) {
    this.name = name;
    this.path = path;
    this.extension = extension;
    this.selected = selected;
    this.size = size;
  }
}
