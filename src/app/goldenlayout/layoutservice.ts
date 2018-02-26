import {Injectable} from '@angular/core';
//import { GoldenLayoutComponentState, GlOnResize, GlOnHide, GlOnShow, GoldenLayoutContainer } from '@goldsam/ng-golden-layout';
//import * as GoldenLayout from 'golden-layout';

@Injectable()
export class LayoutService {
  static myLayout:any;
  static newItemConfig:any;

  setLayout(GoldenLayout){
    LayoutService.myLayout = GoldenLayout;
  }

  getLayout(){
    return LayoutService.myLayout;
  }

  setNewItem(newItemConfig){
    LayoutService.newItemConfig = newItemConfig;
  }

  getNewItem(){
    return LayoutService.newItemConfig;
  }

  add(){
      //alert('LayoutService add() begin');
      console.log('LayoutService newItemConfig: ', LayoutService.newItemConfig);
      console.log('LayoutService myLayout: ', LayoutService.myLayout);
      if (LayoutService.newItemConfig != null && LayoutService.myLayout != null) {
        //alert('LayoutService add() add');
        LayoutService.myLayout.root.contentItems[ 0 ].addChild( LayoutService.newItemConfig );
      }
      //alert('LayoutService add() end');
  }
}