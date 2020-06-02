import { Component, OnInit } from '@angular/core';
export type EditorType = 'userrigitration' | 'userrole';

@Component({
  selector: 'app-header-footer',
  templateUrl: './header-footer.component.html',
  styleUrls: ['./header-footer.component.scss']
})
export class HeaderFooterComponent implements OnInit {

  private showMap = false;

 public constructor() {

   }

 public ngOnInit() {
  }

}
