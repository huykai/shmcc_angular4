import {  AfterViewInit, ViewChild, Component, OnInit } from '@angular/core';
//import { GoogleChartComponent } from './GoogleChartComponent';
//import { EvolutionComponent } from './EvolutionComponent';
//import { GlDirective } from '../directives/GlDirective';
//import { ScreenComponent } from './screen.component';

//import { LeftsideComponent} from './LeftsideComponent';
import { SideBarComponent } from './SideBarComponent';
import { ContentPanelComponent } from './ContentPanelComponent';
import { FormPanelComponent } from './FormPanelComponent';

import APP_CONFIG from '../app.config';
import { Node, Link } from '../d3';

import { lib, hterm } from '../hyktty/hterm_all.js';
import { hyktty } from '../hyktty/hyktty.js';
import * as io from 'socket.io-client';
/* <evolution></evolution> */

declare var document:any;
declare var window:any;

@Component({
  selector: 'nz-demo-layout-basic',
/* template original 
  template: `
    <nz-layout>
      <nz-header>Header</nz-header>
      <nz-layout>
        <nz-sider>Sider</nz-sider>
        <nz-content>
          Content
          <graph [nodes]="nodes" [links]="links"></graph>
          <evolution></evolution>
        </nz-content>
      </nz-layout>
      <nz-footer>Footer</nz-footer>
    </nz-layout>
  `,
  
  template: `
  <nz-layout>
    <nz-header>Header</nz-header> 
    <nz-layout>
      <nz-sider>Sider</nz-sider>
      <nz-content>
        <div class="layout" GLScreen></div>
        
      </nz-content>
    </nz-layout>
    <nz-footer>Footer</nz-footer>
  </nz-layout>
`,
 <LeftSidePanel></LeftSidePanel>  
 <evolution></evolution>
 <golden-layout-root></golden-layout-root>

  template: `
  
  <nz-layout>
    <nz-header>Header</nz-header> 
    <nz-layout>
      <nz-sider>
      <LeftSidePanel></LeftSidePanel>
      </nz-sider>
      <nz-content>
        <golden-layout-root></golden-layout-root>
        
        
      </nz-content>
    </nz-layout>
    <nz-footer>Footer</nz-footer>
  </nz-layout>
`,
  styles  : [ `
    :host ::ng-deep .ant-layout-content {
      background: rgba(255, 255, 255, 1);
      color: #12ffff;
      height: 800px;
      line-height: 20px;
    }

    :host ::ng-deep .ant-layout-header, :host ::ng-deep .ant-layout-footer {
      background: #7dbcea;
      color: #fff;
    }

    :host ::ng-deep .ant-layout-footer {
      line-height: 1.5;
    }

    :host > .ant-layout {
      text-align: center;
      margin-bottom: 48px;
    }

    :host ::ng-deep .ant-layout-sider {
      background: #3ba0e9;
      color: #fff;
      line-height: 120px;
    }
  ` ]
  */
  template: `
  <nz-layout>
    <nz-sider nzCollapsible [(nzCollapsed)]="isCollapsed">
      <SideBarPanel></SideBarPanel>
    </nz-sider>
    <nz-layout>
      <div nz-row>
        <div nz-col [nzSpan]="24">
          <nz-content style="margin:0 16px;">
            <nz-breadcrumb style="margin:12px 0;">
              <nz-breadcrumb-item>
                <button nz-button [nzType]="'primary'" (click)="setManualCommand()">
                  <span>Manual Command</span>
                </button>
              </nz-breadcrumb-item>
              <nz-breadcrumb-item>
                <button nz-button [nzType]="'primary'" (click)="setBatchCommand()">
                <span>Batch Command</span>
                </button>
              </nz-breadcrumb-item>
            </nz-breadcrumb>
          </nz-content>
        </div>
      </div>
      <div nz-row>
        <div nz-col [nzSpan]="terminal_span">
          <nz-content style="margin:0 2px;">
            <div>
              <ContentPanel></ContentPanel>
            </div>
          </nz-content>
        </div>
        
        <div nz-col [nzSpan]="batchform_span" [hidden]="batchform_hidden">
          <nz-content style="margin:0 2px;">
            <div>
              <FormPanel></FormPanel>
            </div>
          </nz-content>
        </div>
        
      </div>
      <div nz-row>
        <div nz-col [nzSpan]="24">
          <nz-footer style="text-align: center;">Ant Design ©2017 Implement By Angular</nz-footer>    
        </div>
      </div>  
    </nz-layout>
    
  </nz-layout>
`,
styles  : [
    `:host ::ng-deep .logo {
    height: 32px;
    background: #333;
    border-radius: 6px;
    margin: 16px;
  }

  :host ::ng-deep .ant-layout-sider-collapsed .nav-text {
    display: none;
  }

  :host ::ng-deep .ant-layout-sider-collapsed .ant-menu-submenu-title:after {
    display: none;
  }

  :host ::ng-deep .ant-layout-sider-collapsed .anticon {
    font-size: 16px;
    margin-left: 8px;
  }
  `
]
})
export class NzLayoutBasicComponent implements OnInit {
  socket;
  terminal_span:number = 24;
  batchform_span:number = 0;
  batchform_hidden:boolean = true;
  //@ViewChild()
  
  nodes: Node[] = [];
  links: Link[] = [];
  
  constructor() {
    
    const N = APP_CONFIG.N,
          getIndex = number => number - 1;

    /** constructing the nodes array */
    for (let i = 1; i <= N; i++) {
      this.nodes.push(new Node(i));
    }

    for (let i = 1; i <= N; i++) {
      for (let m = 2; i * m <= N; m++) {
        /** increasing connections toll on connecting nodes */
        this.nodes[getIndex(i)].linkCount++;
        this.nodes[getIndex(i * m)].linkCount++;

        /** connecting the nodes before starting the simulation */
        this.links.push(new Link(i, i * m));
      }
    }
    console.log('nodes count:',this.nodes.length);
    console.log('links count:',this.links.length);
  }

  setManualCommand(){
    console.log('setManualCommand');
    this.terminal_span = 24;
    this.batchform_span = 0;
    this.batchform_hidden = true;
  }

  setBatchCommand(){
    console.log('setBatchCommand');
    this.terminal_span = 14;
    this.batchform_span = 10;
    this.batchform_hidden = false;
  }

  ngOnInit() {
  }

  onSelect(mme): void {
    console.log('mme : ', mme.address) ;
    var term;
    var buf = '';
    this.socket = io(location.origin, {path: '/hyktty/socket.io'})
    //this.socket = io()
    
    this.socket.on('connect', () => {
      console.log('mme socket connect') ;
      lib.init(() => {
          hterm.defaultStorage = new lib.Storage.Local();
          term = new hterm.Terminal();
          window.term = term;
          term.decorate(document.getElementById('terminal'));
  
          term.setCursorPosition(0, 0);
          term.setCursorVisible(true);
          term.prefs_.set('ctrl-c-copy', true);
          term.prefs_.set('ctrl-v-paste', true);
          term.prefs_.set('use-default-window-copy', true);
  
          term.runCommandClass(hyktty, {
            socket: this.socket, argv: document.location.hash.substr(1)
          });
          this.socket.emit('resize', {
              col: term.screenSize.width,
              row: term.screenSize.height
          });
  
          if (buf && buf != '')
          {
              term.io.writeUTF16(buf);
              buf = '';
          }

      });
      console.log('socket emit ssh');
      this.socket.emit('ssh', {
        sshuser: 'huykai',
        sshhost: '10.20.0.231'
      });
    });
  
    this.socket.on('output', function(data) {
      console.log('mme socket output') ;
      if (!term) {
          buf += data;
          return;
      }
      term.io.writeUTF16(data);
    });
    
    this.socket.on('disconnect', function() {
      console.log("Socket.io connection closed");
    });
  }
}