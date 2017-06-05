import { Component, OnInit } from '@angular/core';
import { FileSystemService } from '../files-system-service';
import { SelectionService } from '../selection-service';
import { ImageFile } from '../selection-service';

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
        if(!file.children) {
          this.images.push(new ImageFile(file.name, file.path, file.extension, false, file.size));
        }
      });
    });

    this.selectionService.getDirectory().subscribe(selectedDirectory => {
      console.log("getdir sub: ", selectedDirectory);
      this.images = [];
      this.selectionService.setImages(this.images);
      this.fileService.getImageFileList(selectedDirectory.path).subscribe(response => {
        console.log('selection update');
        response.children.forEach(file => {
          if(!file.children) {
            this.images.push(new ImageFile(file.name, file.path, file.extension, false, file.size));
          }
        });
      });
    });

    // Subscription PoC
    this.selectionService.getImages().subscribe(selectedImages => {
      console.log(selectedImages);
    })
  }

  onSelect() {
    this.selectionService.setImages(this.images.filter(image => image.selected == true));
  }
}

