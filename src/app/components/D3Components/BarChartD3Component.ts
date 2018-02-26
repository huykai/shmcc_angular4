import { Component, Inject, Input, ChangeDetectorRef, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { D3Service, ForceDirectedGraph, Node, Link } from '../../d3';
import { GoldenLayoutComponentState, GlOnResize, GlOnHide, GlOnShow, GoldenLayoutContainer } from '@goldsam/ng-golden-layout';
import * as d3 from 'd3';

@Component({
  selector: 'd3bar',
  template: `
  <svg id={{id}} #svg [attr.width]="_options.width" [attr.height]="_options.height">
  </svg>
  `,
  /*
  template: `
    <svg #svg [attr.width]="_options.width" [attr.height]="_options.height">
      <rect class="MyRect" *ngFor="let rect of rects"
        x="rect.x" y="rect.y" width="rect.width" height="rect.height">
      </rect>
      <text class="MyText" *ngFor="let rect of rects"
        x="rect.x" y="rect.y" dx="rect.dx" dy="rect.dy">
      </text>
      <g class="axis" *ngFor="let axis of axises">
        <g class="tick" *ngFor="let tick of ticks">
          <line y2="tick.y2" x2="tick.x2"></line>
          <text dy="tick.dy" y="tick.y" x="tick.x">
            {{tick.text}}
          </text>
        </g>
      </g>
    </svg>
  
  `,
  */
  styleUrls: ['./graph.component.css']
})
export class BarChartD3Component {
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    //this.graph.initSimulation(this.options);
  }
  
  //graph: ForceDirectedGraph;
  private id;
  constructor(@Inject(GoldenLayoutComponentState) private state: any, private d3Service: D3Service, private ref: ChangeDetectorRef) { 
    this.id = "svg" + state.id; 
  }

  ngOnInit() {
    /** Receiving an initialized simulated graph from our custom d3 service */
    //this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this.options);
    //this.graph.ticker.subscribe((d) => {
    //  this.ref.markForCheck();
    //});
  }

  ngAfterViewInit() {
    //this.graph.initSimulation(this.options);
    const N = 8,
    getIndex = number => number - 1;

    var padding = {left:30, right:30, top:20, bottom:20};
    var dataset = [10, 20, 30, 40, 33, 24, 12, 5];

    var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length).map( d => d.toString()))
    .rangeRound([0, this._options.width - padding.left - padding.right])
    .padding(0.1); 
    
    var yScale = d3.scaleLinear()
    .domain([0,d3.max(dataset)])
    .rangeRound([this._options.height - padding.top - padding.bottom, 0]);
    
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    var rectPadding = 4;

    var eleid="#"+this.id;
    console.log('id:',eleid);
    var svg = d3.select(eleid);
    console.log('svg',svg);
    svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class","MyRect")
    .attr("transform","translate(" + padding.left + "," + padding.top + ")")
    .attr("x", function(d,i){
      return xScale.bandwidth() * i +  rectPadding;
    })
    .attr("y",function(d){
      return yScale(d);
    })
    .attr("width", xScale.bandwidth() - rectPadding )
    .attr("height", function(d){
      return 600 - padding.top - padding.bottom - yScale(d);
    })
    .attr("fill","red");

    console.log('xScale.bandwidth : ',xScale.bandwidth());
    var texts = svg.selectAll("MyText")
    .data(dataset)
    .enter()
    .append("text")
    .attr("class","MyText")
    .attr("transform","translate(" + padding.left + "," + padding.top + ")")
    .attr("x", function(d,i){
      console.log('x:',xScale.bandwidth() * i + rectPadding/2);
        return xScale.bandwidth() * i + rectPadding/2;
    } )
    .attr("y",function(d){ 
        return yScale(d);
    })
    .attr("dx",function(){
        return (xScale.bandwidth() - rectPadding)/2;
    })
    .attr("dy",function(d){
        return 20;
    })
    .text(function(d){
        return d;
    })
    .attr("fill", "white");

    svg.append("g")
    .attr("class","axis")
    .attr("transform","translate(" + padding.left + "," + (this._options.height - padding.bottom) + ")")
    .call(xAxis)
    .attr("fill", "steelblue"); 
  
    svg.append("g")
      .attr("class","axis")
      //.attr("fill", "steelblue")
      .attr("transform","translate(" + padding.left + "," + padding.top + ")")
      .call(yAxis)
      .attr("fill", "steelblue");
  }

  private _options: { width, height } = { width: 800, height: 600 };
  
  get options() {
    return this._options = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  
}