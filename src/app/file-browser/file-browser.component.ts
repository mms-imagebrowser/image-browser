import {Component, OnInit, ViewChild} from '@angular/core';
import {FileSystemService} from '../files-system-service';
import {TreeComponent} from 'angular-tree-component';
import 'rxjs/Rx';

@Component({
  selector: 'app-file-browser',
  templateUrl: './file-browser.component.html',
  styleUrls: ['./file-browser.component.css']
})
export class FileBrowserComponent implements OnInit {

  @ViewChild(TreeComponent)
  private tree: TreeComponent;

  private fileTree: FileTreeNode[] = [new FileTreeNode(1, 'src', './src')];
  private index = 1;

  onEvent(event: any) {
    console.log(event);
  }

  constructor(private fileService: FileSystemService) {
  }

  ngOnInit() {
    this.fileService.getFileList('./src').subscribe(response => {
      console.log(response);
      response.children.forEach(value => {
        console.log('starting conversion ' + value);
        if (value.path !== './src') {
          this.index++;
          this.addTreeNode(this.fileTree[0], value);

        }
      });
      console.log(JSON.stringify(this.fileTree));
      this.tree.treeModel.update();
    });
  }

  getFileTree() {
    return this.fileTree;
  }

  addTreeNode(parent: FileTreeNode, element: any): FileTreeNode {
    const treeNode = new FileTreeNode(this.index, element.name, element.path);
    parent.addChildren(treeNode);
    // parent.children.push(treeNode);
    if (!!element.children) {
      element.children.forEach(child => {
        this.index++;
        this.addTreeNode(treeNode, child);
      });
    }
    return treeNode;
  }

}

class FileTreeNode {
  private id: number;
  private name: string;
  private path: string;
  private children: FileTreeNode[] = [];

  constructor(id: number, name: string, path: string) {
    this.id = id;
    this.name = name;
    this.path = path;
  }

  public addChildren(children: FileTreeNode) {
    this.children.push(children);
  }
}
