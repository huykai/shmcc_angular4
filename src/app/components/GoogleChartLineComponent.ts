import { Component, Inject} from '@angular/core';
import { GoogleChartComponent} from './GoogleChartComponent';
import { GoldenLayoutComponentState, GlOnResize, GlOnHide, GlOnShow, GoldenLayoutContainer } from '@goldsam/ng-golden-layout';
import * as GoldenLayout from 'golden-layout';
import { LayoutService } from '../goldenlayout/layoutservice';

declare var google:any;

@Component({
  selector: 'googlechartline',
  template: `
    <div class="four wide column center aligned">
        <h1>Google Chart  - Bar Chart</h1>
        <div id="chart_GoogleChartLineParent_{{id}}">
          <div id="chart_divGoogleChartLine_{{id}}"  style="width: 900px; height: 500px;"></div>
        </div>
    </div>
  `,
  styles  : [ `
  .lm_content{
    overflow: scroll;
  }
` ],
  providers: [LayoutService]
})
export class GoogleChartLineComponent extends GoogleChartComponent {
  private chart;
  private id;
  private data;
  static componentnum = 0;

  

  constructor(@Inject(GoldenLayoutComponentState) private state: any,
  @Inject(GoldenLayoutContainer) private container: GoldenLayout.Container,
  @Inject(GoldenLayout) private gl: GoldenLayout,
  @Inject(LayoutService) private layoutService: LayoutService) {
    super();
    GoogleChartLineComponent.componentnum++;
    this.id = GoogleChartLineComponent.componentnum;
    this.layoutService.setLayout(this.gl);
    console.log("Here is EvolutionComponent");
    //this.randomData();
    //setInterval(this.randomData,10000);
    //setTimeout(this.d_rawGraph.bind(this),30000);
    //setTimeout(this.d_rawGraph(this.id),5000);
  }

  //ngAfterViewChecked() {
  //  setInterval(this.drawGraph_1(this.id),5000);
  //}
  private randomdat = [
    ['Year', 'Sales', 'Expenses'],
    ['2004',  1000,      400],
    ['2005',  1170,      460],
    ['2006',  660,       1120],
    ['2007',  1030,      540]
  ];
  
  private options = {
    title: 'Company Performance',
    curveType: 'function',
    legend: { position: 'bottom' }
  };
  
  drawGraph(){
    console.log("DrawGraph Google Line Chart...");  
    //console.log("graphData: ", typeof(this.graphData))
    this.data = google.visualization.arrayToDataTable(this.randomdat);
    this.chart = new google.visualization.LineChart(document.getElementById('chart_divGoogleChartLine_'+this.id));
    this.chart.draw(this.data, this.options);
  }
  
  
  d_rawGraph(){
    console.log("DrawGraphLine Evolution...");  
    console.log("this id: ", this.id)
    
    let randomdat = [
      ['Year', 'Sales', 'Expenses'],
      ['2004',  Math.round(Math.random()*10000),      Math.round(Math.random()*10000)],
      ['2005',  Math.round(Math.random()*10000),      Math.round(Math.random()*10000)],
      ['2006',  Math.round(Math.random()*10000),       Math.round(Math.random()*10000)],
      ['2007',  Math.round(Math.random()*10000),      Math.round(Math.random()*10000)]
    ];
    this.data = null;
    this.data = google.visualization.arrayToDataTable(randomdat);
    this.chart = null;
    //randomdat = null;
    document.getElementById('chart_divGoogleChartLine_'+this.id).remove();
    var node1 = document.createElement("div");
    node1.setAttribute("id","chart_divGoogleChartLine_"+this.id);
    document.getElementById('chart_GoogleChartLineParent_'+this.id).appendChild(node1);
    this.chart = new google.visualization.LineChart(document.getElementById('chart_divGoogleChartLine_'+this.id));
    this.chart.draw(this.data, this.options);
    this.chart = null;
    //setTimeout(this.d_rawGraph(1),15000);
    setTimeout(this.d_rawGraph.bind(this),30000);
  }

  public glOnResize(): void {
    console.log('Google Line Chart Resizing!');
    if (!(google.visualization === undefined)) {
      setTimeout(this.d_rawGraph.bind(this),0);
    }
    
    //this.gl.root.contentItems[ 0 ].addChild( this.newItemConfig );
  }

} 