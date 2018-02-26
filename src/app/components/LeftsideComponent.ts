import { Component, Inject, OnInit } from '@angular/core';
//import { GoogleChartComponent } from './GoogleChartComponent';
//import { EvolutionComponent } from './EvolutionComponent';
//import { GlDirective } from '../directives/GlDirective';
//import { ScreenComponent } from './screen.component';

//import APP_CONFIG from '../app.config';
//import { Node, Link } from '../d3';
/* <evolution></evolution> */

//import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GoldenLayoutComponentState, GlOnResize, GlOnHide, GlOnShow, GoldenLayoutContainer } from '@goldsam/ng-golden-layout';
import * as GoldenLayout from 'golden-layout';
//import * as GoldenLayout from 'golden-layout';
import { LayoutService } from '../goldenlayout/layoutservice';
import { TestPanelComponent } from './test-panel.component';
// Import for GoogleChart
import { GoogleChartComponent } from './GoogleChartComponent';
import { EvolutionComponent } from './EvolutionComponent';
import { GoogleChartLineComponent } from './GoogleChartLineComponent';
import { GraphComponent } from '../visuals/graph/graph.component';
import { BarChartD3Component } from './D3Components/BarChartD3Component';

import { GateOneTerminalComponent } from './GateOneComponents/GateOneTerminal';

import { Node, Link } from '../d3';


@Component({
  selector: 'LeftSidePanel',

  template: `
  // Kendo UI font icon
  <button kendoButton [icon]="'refresh'" (click)="onButton_Bar_Click()" >Button</button>
  // Image icon
  <button kendoButton [imageUrl]="'http://demos.telerik.com/kendo-ui/content/shared/icons/sports/snowboarding.png'" (click)="onButton_Line_Click()">Snowboarding</button>
  // FontAwsome icon
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
  <button kendoButton [iconClass]="'fa fa-key fa-fw'" (click)="onButton_D3_Click()">Button</button>
  <button kendoButton [iconClass]="'fa fa-key fa-fw'" (click)="onButton_D3_BarChart_Click()">Button_D3_Barchart</button>
  <button kendoButton [iconClass]="'fa fa-key fa-fw'" (click)="onButton_GateOne_Click()">Button3_GateOne</button>
`,
  styles  : [ `
    
  ` ],
  providers: [LayoutService]
})
export class LeftsideComponent implements OnInit {
  
  //private layoutService:any;
  constructor(@Inject(LayoutService)private layoutService: LayoutService) {
    console.log('this.layoutService: ',this.layoutService)
    if (this.layoutService.getLayout() == undefined) {
      this.layoutService.setLayout(GoldenLayout);
    }
  }

  public newItemConfig_Bar = {
    title: 'test',
    type: 'component',
    componentName: 'EvolutionComponent',
    componentState: { text: 'test' }
  };
  public newItemConfig_Line = {
    title: 'Google Chart Line Chart',
    type: 'component',
    componentName: 'GoogleChartLineComponent',
    componentState: { text: 'Line' }
  };
  public newItemConfig_Graph = {
    title: 'D3 Force Graph',
    type: 'component',
    componentName: 'GraphComponent',
    componentState: { 
      nodes : {},
      links : {} 
    }
  };
  public newItemConfig_GraphBar = {
    title: 'Google Chart Bar Chart',
    type: 'component',
    componentName: 'BarChartD3Component',
    componentState: { id: 0 }
  };
  public newItemConfig_GateOne = {
    title: 'GateOne Terminal',
    type: 'component',
    componentName: 'GateOneTerminalComponent',
    componentState: { id: 0 }
  };
  private add(newItemConfig: any){
    console.log(GoldenLayout);
    //this.gl.root.contentItems[ 0 ].addChild( this.newItemConfig );
  }

  onButton_Bar_Click() {
      //alert('Button clicked!');
      //console.log('this.layoutService: ',this.layoutService)
      this.layoutService.setNewItem(this.newItemConfig_Bar);
      this.layoutService.add();
  }
  
  onButton_Line_Click() {
    //alert('Button clicked!');
    //console.log('this.layoutService: ',this.layoutService)
    this.layoutService.setNewItem(this.newItemConfig_Line);
    this.layoutService.add();
  }
  
  nodes: Node[] = [];
  links: Link[] = [];
  onButton_D3_Click() {
    //alert('Button clicked!');
    //console.log('this.layoutService: ',this.layoutService)
    this.newItemConfig_Graph.componentState.nodes = this.nodes;
    this.newItemConfig_Graph.componentState.links = this.links;
    this.layoutService.setNewItem(this.newItemConfig_Graph);
    this.layoutService.add();
  }
  onButton_D3_BarChart_Click() {
    this.newItemConfig_GraphBar.componentState.id ++;
    this.layoutService.setNewItem(this.newItemConfig_GraphBar);
    this.layoutService.add();
  }
  onButton_GateOne_Click(){
    this.newItemConfig_GateOne.componentState.id ++;
    this.layoutService.setNewItem(this.newItemConfig_GateOne);
    this.layoutService.add();
  }
  ngOnInit() {
  }
}