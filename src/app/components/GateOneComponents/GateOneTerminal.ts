import { Component, Inject, Input, ChangeDetectorRef, HostListener, ChangeDetectionStrategy } from '@angular/core';
//import { GateOne } from '../../js/GateOne/gateone.js';
//import * as d3 from 'd3';
import { GoldenLayoutComponentState, GlOnResize, GlOnHide, GlOnShow, GoldenLayoutContainer } from '@goldsam/ng-golden-layout';
import * as GoldenLayout from 'golden-layout';
import { LayoutService } from '../../goldenlayout/layoutservice';

declare var GateOne:any;

@Component({
  selector: 'gateone',
  template: `
  <div id="gateone_container_{{id}}" style="position: relative; width: 60em; height: 30em;">
    <div class="gateone" id="gateone_{{id}}"></div>
  </div>
  `,
  styles  : [ `
    .gateone {
        text-align: left;
    }
    `
  ],
})
export class GateOneTerminalComponent {  

    constructor(@Inject(GoldenLayoutComponentState) private state: any,
    @Inject(GoldenLayoutContainer) private container: GoldenLayout.Container,
    @Inject(GoldenLayout) private gl: GoldenLayout,
    @Inject(LayoutService) private layoutService: LayoutService) {
      console.log('test-panel: gl: ', this.gl);
      this.layoutService.setLayout(this.gl);
      GateOneTerminalComponent.componentnum += 1;
      this.id = GateOneTerminalComponent.componentnum;
      console.log('test-panel: myLayout', this.layoutService.getLayout());
    }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    //this.graph.initSimulation(this.options);
  }
  
  //graph: ForceDirectedGraph;
  private id;
  static componentnum = 0;

  ngOnInit() {
    /** Receiving an initialized simulated graph from our custom d3 service */
    //this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this.options);
    //this.graph.ticker.subscribe((d) => {
    //  this.ref.markForCheck();
    //});
    
  }

  ngAfterViewInit() {
    //console.log('GateOne Terminal ngAfterViewInit');
    //var auth = {
    //  'api_key': 'ZjRkN2RhNGQ1MmExNDA1NmIxZjA0Nzc0ZTdmZTcxOGU1N',
    //  'secret': 'OTQ1YWY3NmNhOTlkNDAzMTkzM2E3NmY4NGI0Njk5MmJhM',
    //  'upn': 'ANONYMOUS',
    //  'timestamp': '',
    //  'signature': '',
    //  'signature_method': 'HMAC-SHA1',
    //  'api_version': '1.0'    
    //};
    //auth.timestamp = Date.now() + "";
    //let body = auth.api_key + auth.upn + auth.timestamp
    //auth.signature = b64_hmac_sha1(auth.secret,body);
    GateOne.init({
        //auth: auth, 
        theme: 'white',
        goDiv: '#gateone_'+this.id,
        autoConnectURL:'ssh://NOKIA1@172.20.14.129:22',
        showToolbar: true,
        url: 'https://127.0.0.1:52721/'
    });
  }

  
  private _options: { width, height } = { width: 1024, height: 800 };
  
  get options() {
    return this._options = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  
}