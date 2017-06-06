import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FileSystemService {
  private fileSystemUrl = 'api/filesystem';

  constructor(private http: Http) {
  }

  public getFileList(path: string): Observable<any> {
    return this.http.get(this.fileSystemUrl + '/list/?path=' + path).map((resp) => {
      console.log(resp.json());
      return resp.json();
    });
  }

  public getImageFileList(path: string): Observable<any> {
    return this.http.get(this.fileSystemUrl + '/listimages/?path=' + path).map((resp) => {
      console.log(resp.json());
      return resp.json();
    });
  }
}
