import {Injectable} from '@angular/core';
import {GlDirective} from '../directives/GlDirective';

@Injectable()
export class ScreenService {
  public testValue: number = 0;
  public myLayout:any;
  public newItemConfig = {
        title: 'test',
        type: 'component',
        componentName: 'testComponent',
        componentState: { text: 'test' }
    };
  
  add(){
    this.testValue++;
    this.myLayout.root.contentItems[ 0 ].addChild( this.newItemConfig );
  }
}