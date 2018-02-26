import { Component, OnInit, Inject} from '@angular/core';
import { GoldenLayoutComponentState, GlOnResize, GlOnHide, GlOnShow, GoldenLayoutContainer } from '@goldsam/ng-golden-layout';
import * as GoldenLayout from 'golden-layout';
import { LayoutService } from '../goldenlayout/layoutservice';


declare var google:any;

@Component({
  selector: 'chart',
  styles  : [ `
  .lm_content{
    overflow: scroll;
  }
` ],
  template: '<ng-content></ng-content>'
})

export class GoogleChartComponent implements OnInit , GlOnResize, GlOnHide, GlOnShow {
  private static googleLoaded:any;
  private static google:any;

  constructor() {
    console.log("Here is GoogleChartComponent")
    
  }

  public glOnResize(): void {
    console.log('GoogleChartComponent Resizing!');
    
    //this.gl.root.contentItems[ 0 ].addChild( this.newItemConfig );
  }

  public glOnShow(): void {
    console.log('GoogleChartComponent Showing!');
  }

  public glOnHide(): void {
    console.log('GoogleChartComponent Hiding!');
    
  }


  getGoogle() {
      return google;
  }
  ngOnInit() {
    console.log('GoogleChartComponent ngOnInit');
    if(!GoogleChartComponent.googleLoaded) {
      GoogleChartComponent.googleLoaded = true;
      google.charts.load('current',  {packages: ['corechart', 'bar']});
    }
    google.charts.setOnLoadCallback(() => this.drawGraph());
  }

  drawGraph(){
      console.log("DrawGraph base class!!!! ");
  }

  createBarChart(element:any):any {
      return new google.visualization.BarChart(element);
  }

  createDataTable(array:any[]):any {
      return google.visualization.arrayToDataTable(array);
  }
}