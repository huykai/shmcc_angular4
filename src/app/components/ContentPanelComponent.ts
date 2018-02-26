import { Component, OnInit } from '@angular/core';
import { TabPanelComponent } from './TabPanelComponent';

@Component({
    selector: 'ContentPanel',
    template: `
  <nz-content height="600" style="margin:0 16px;padding:24px; background: #fff; min-height:600px">
    <tabs-card></tabs-card>
  </nz-content>    
  `,
    styles  : [
    ]
  })
  export class ContentPanelComponent implements OnInit {
    isCollapsed = false;
    
  
    constructor() {
    }
  
    ngOnInit() {
    }
  }