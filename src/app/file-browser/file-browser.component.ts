import {Component, OnInit, ViewChild} from '@angular/core';
import {FileSystemService} from '../files-system-service';
import {SelectionService} from '../selection-service';
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

  // TODO: from config
  private fileTree: FileTreeNode[] = [new FileTreeNode(1, 'pictures', './pictures', true)]; // root is assumed to be directory
  private index = 1;

  onEvent(event: any) {
    console.log(event);
  }

  onActivate(event: any) {
    console.log("filetree activate", event.node.data.path, event.node.data.isDirectory());
    if(event.node.data.isDirectory()) {
      this.selectionService.setDirectory(event.node.data.path);
    }
  }

  constructor(private fileService: FileSystemService, private selectionService: SelectionService) {
  }

  ngOnInit() {
    // TODO: external config
    this.fileService.getFileList('./pictures').subscribe(response => {
      // console.log(response);
      response.children.forEach(value => {
        // console.log('starting conversion ' + value);
        if (value.path !== './pictures') {
          this.index++;
          this.addTreeNode(this.fileTree[0], value);
        }
      });
      // console.log(JSON.stringify(this.fileTree));
      this.tree.treeModel.update();
      this.selectionService.setDirectory('pictures'); // TODO: from config
    });
  }

  getFileTree() {
    return this.fileTree;
  }

  addTreeNode(parent: FileTreeNode, element: any): FileTreeNode {
    console.log(element);
    const treeNode = new FileTreeNode(this.index, element.name, element.path, false);
    parent.addChildren(treeNode);
    // parent.children.push(treeNode);
    if (!!element.children) {
      treeNode.setIsDirectory(true);
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
  private directory: boolean;

  constructor(id: number, name: string, path: string, isDirectory: boolean) {
    this.id = id;
    this.name = name;
    this.path = path;
    this.directory = isDirectory;
  }

  public addChildren(children: FileTreeNode) {
    this.children.push(children);
  }

  public setIsDirectory(flag: boolean) {
    this.directory = flag;
  }

  public isDirectory() {
    return this.directory;
  }
}
