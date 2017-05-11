import {Component, OnInit} from '@angular/core';
import {FileSystemService} from '../files-system-service';
import {TreeModel, TreeNode} from 'angular-tree-component';

@Component({
  selector: 'app-file-browser',
  templateUrl: './file-browser.component.html',
  styleUrls: ['./file-browser.component.css']
})
export class FileBrowserComponent implements OnInit {

  private fileTree: TreeNode;
  private index: number = 1;

  onEvent(event: any) {
    console.log(event);
  }

  constructor(private fileService: FileSystemService) {
  }

  ngOnInit() {
    let treeModel = new TreeModel();
    treeModel.roots = [];
    this.fileTree = new TreeNode({name: 'src', path: './src'}, null, treeModel, this.index);
    this.fileTree.children = [];
    this.fileService.getFileList('./src').subscribe(response => {
      console.log(response);
      response.children.forEach(value => {
        console.log('starting conversion ' + value);
        if (value.path != './src') {
          this.index++;
          this.addTreeNode(treeModel, this.fileTree, value);

        }
      });
      treeModel.roots.push(this.fileTree.data);
      treeModel.update();
      this.fileTree.setActiveAndVisible(false);
      console.log(treeModel);
      console.log();
    });
  }

  addTreeNode(treemodel: TreeModel, parent: TreeNode, element: any): TreeNode {
    let treeNode = new TreeNode({name: element.name, path: element.path}, parent, treemodel, this.index);
    this.fileTree.children.push(treeNode);
    // parent.children.push(treeNode);
    if (!!element.children) {
      element.children.forEach(child => {
        this.index++;
        this.addTreeNode(treemodel, treeNode, child);
      });
    }
    return treeNode;
  }

}
