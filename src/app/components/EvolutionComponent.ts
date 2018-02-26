import { Component, Inject} from '@angular/core';
import { GoogleChartComponent} from './GoogleChartComponent';
import { GoldenLayoutComponentState, GlOnResize, GlOnHide, GlOnShow, GoldenLayoutContainer } from '@goldsam/ng-golden-layout';
import * as GoldenLayout from 'golden-layout';
import { LayoutService } from '../goldenlayout/layoutservice';

import { SocketIOService } from '../DynamicService/SocketIOService';

declare var google:any;

@Component({
  selector: 'evolution',
  template: `
    <div class="four wide column center aligned">
        <h1>Google Chart  - Bar Chart</h1>
        <div id="chart_parent_{{id}}">
          <div id="chart_divEvolution_{{id}}"  style="width: 900px; height: 500px;"></div>
        </div>
    </div>
  `,
  styles  : [ `
  .lm_content{
    overflow: scroll;
  }
` ],
  providers: [LayoutService, SocketIOService]
})
export class EvolutionComponent extends GoogleChartComponent {
  private options;
  private data;
  private chart;
  private id;
  static componentnum = 0;

  messages = [];
  connection;
  message = "message_" + this.id;

  constructor(@Inject(GoldenLayoutComponentState) private state: any,
  @Inject(GoldenLayoutContainer) private container: GoldenLayout.Container,
  @Inject(GoldenLayout) private gl: GoldenLayout,
  @Inject(LayoutService) private layoutService: LayoutService,
  @Inject(SocketIOService) private socketIOService: SocketIOService) {
    super();
    EvolutionComponent.componentnum++;
    this.id = EvolutionComponent.componentnum;
    this.layoutService.setLayout(this.gl);
    console.log("Here is EvolutionComponent");
    //this.d_rawGraph.bind(this);
    //this.randomData();
    //setInterval(this.sendMessage.bind(this)("message_"+this.id),10000);
    //setTimeout(this.d_rawGraph.bind(this),3000);
    //setTimeout(this.d_rawGraph(this.id),5000);
    
  } 

  sendMessage(){
    this.socketIOService.sendMessage(this.message);
    this.message = '';
  }
  
  ngOnDestroy() {
    //this.connection.unsubscribe();
  }

  ngAfterViewInit() {
    //this.drawGraph();
    //this.connection = this.socketIOService.getMessages("message_"+this.id).subscribe(message => {
    //  this.messages.push(message);
    //  console.log('recieve message: ', message);

    //  setTimeout(this.d_rawGraph.bind(this)(message['text']),10000);
    //  this.socketIOService.sendMessage("message_"+this.id);
    //})
    //this.socketIOService.sendMessage("message_"+this.id);
    //this.socketIOService.sendMessage("hello");
  }

  public glOnResize(): void {
    console.log('Google Bar Chart Resizing!');
    if (!(google.visualization === undefined)) {
      setTimeout(this.d_rawGraph.bind(this),0);
    }
    
    //this.gl.root.contentItems[ 0 ].addChild( this.newItemConfig );
  }

  randomData(){
    console.log('randomData running');
    let randomdat = [
      ['Evolution', 'Imports', 'Exports'],
      ['A', Math.round(Math.random()*10000), Math.round(Math.random()*10000)],
      ['B', Math.round(Math.random()*10000), Math.round(Math.random()*10000)],
      ['C', Math.round(Math.random()*10000), Math.round(Math.random()*10000)]
    ];
    this.graphData = randomdat;
    //this.chart = this.createBarChart(document.getElementById('chart_divEvolution_'+this.id));
    //this.chart.draw(this.data, this.options);
    //this.drawGraph();
  }

  //ngAfterViewChecked() {
  //  setInterval(this.drawGraph_1(this.id),5000);
  //}
  private graphData = [
    ['Evolution', 'Imports', 'Exports'],
    ['A', 8695000, 6422800],
    ['B', 3792000, 3694000],
    ['C', 8175000, 800800]
  ]
  private randomdat = [
    ['Evolution', 'Imports', 'Exports'],
    ['A', Math.round(Math.random()*10000), Math.round(Math.random()*10000)],
    ['B', Math.round(Math.random()*10000), Math.round(Math.random()*10000)],
    ['C', Math.round(Math.random()*10000), Math.round(Math.random()*10000)]
  ];
  private option = {
    title: 'Evolution, 2014',
    chartArea: {width: '50%'},
    hAxis: {
      title: 'Value in USD',
      minValue: 0
    },
    vAxis: {
      title: 'Members'
    }
  }
  
  drawGraph(){
    console.log("DrawGraph Evolution...");  
    console.log("graphData: ", typeof(this.graphData))
    this.data = google.visualization.arrayToDataTable([
      ['Evolution', 'Imports', 'Exports'],
      ['A', 8695000, 6422800],
      ['B', 3792000, 3694000],
      ['C', 8175000, 800800]
    ]);


    this.chart = this.createBarChart(document.getElementById('chart_divEvolution_'+this.id));
    this.chart.draw(this.data, this.option);
  }
  
  
  d_rawGraph(randomdat){
    console.log("DrawGraph1 Evolution...");  
    console.log("this id: ", this.id)
    
    if (randomdat == undefined) {
        randomdat = [
          ['Evolution', 'Imports', 'Exports'],
          ['A', Math.round(Math.random()*10000), Math.round(Math.random()*10000)],
          ['B', Math.round(Math.random()*10000), Math.round(Math.random()*10000)],
          ['C', Math.round(Math.random()*10000), Math.round(Math.random()*10000)]
        ];
    }
    //let randomdat = [
    //  ['Evolution', 'Imports', 'Exports'],
    //  ['A', Math.round(Math.random()*10000), Math.round(Math.random()*10000)],
    //  ['B', Math.round(Math.random()*10000), Math.round(Math.random()*10000)],
    //  ['C', Math.round(Math.random()*10000), Math.round(Math.random()*10000)]
    //];
    this.data = null;
    this.data = google.visualization.arrayToDataTable(randomdat);
    this.chart = null;
    //randomdat = null;
    document.getElementById('chart_divEvolution_'+this.id).remove();
    var node1 = document.createElement("div");
    node1.setAttribute("id","chart_divEvolution_"+this.id);
    document.getElementById('chart_parent_'+this.id).appendChild(node1);
    this.chart = new google.visualization.BarChart(document.getElementById('chart_divEvolution_'+this.id));
    this.chart.draw(this.data, this.option);
    this.chart = null;
    //setTimeout(this.d_rawGraph(1),15000);
    //setTimeout(this.d_rawGraph.bind(this),30000);
  }
} 