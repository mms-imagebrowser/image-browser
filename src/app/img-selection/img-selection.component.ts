import {Component, OnInit} from '@angular/core';
import {FileSystemService} from '../services/files-system-service';
import {ImageFile, SelectionService} from '../services/selection-service';

@Component({
  selector: 'app-img-selection',
  templateUrl: './img-selection.component.html',
  styleUrls: ['./img-selection.component.css']
})
export class ImgSelectionComponent implements OnInit {

  images: ImageFile[]  = [];

  constructor(private fileService: FileSystemService, private selectionService: SelectionService) {
  }

  ngOnInit() {
    this.fileService.getImageFileList('./src').subscribe(response => {
      console.log('selection init');
      console.log(response);
      response.children.forEach(file => {
        if (!file.children) {
          console.log(file.path);
          this.images.push(new ImageFile(file.name, file.path, file.extension, false, file.size));
        }
      });
    });

    this.selectionService.getDirectory().subscribe(selectedDirectory => {
      console.log('getdir sub: ', selectedDirectory);
      this.images = [];
      this.selectionService.setImages(this.images);
      this.fileService.getImageFileList(selectedDirectory.path).subscribe(response => {
        console.log('selection update');
        response.children.forEach(file => {
          if (!file.children) {
            this.images.push(new ImageFile(file.name, file.path, file.extension, false, file.size));
          }
        });
      });
    });

    // Subscription PoC
    this.selectionService.getImages().subscribe(selectedImages => {
      console.log(selectedImages);
    });
  }

  onSelect() {
    this.selectionService.setImages(this.images.filter(image => image.selected));
  }
}

