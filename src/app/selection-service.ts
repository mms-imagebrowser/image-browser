import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SelectionService {
    private directory = new Subject<any>();
    private images = new Subject<any>();

    public setDirectory(path: string) {
        this.directory.next({ path: path });
    }

    public getDirectory(): Observable<any> {
        return this.directory.asObservable();
    }

    public setImages(images: ImageFile[]) {
        this.images.next({images: images});
    }

    public getImages(): Observable<any> {
        return this.images.asObservable();
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
