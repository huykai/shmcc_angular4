import { Component, OnInit } from '@angular/core';
import { TabContentService } from '../services/TabContentService';

@Component({
    selector: 'SideBarPanel',
    template: `
    <div class="logo">
    </div>
    <ul nz-menu [nzTheme]="'dark'" [nzMode]="isCollapsed?'vertical':'inline'">
      <li nz-submenu>
        <span title><i class="anticon anticon-user"></i><span class="nav-text">终端</span></span>
        <ul>
            <li nz-submenu>
              <span title><i class="anticon anticon-user"></i><span class="nav-text">MME</span></span>
              <ul>
                <li nz-menu-item *ngFor="let mme of mmes" (click)="onSelect(mme)">{{mme.name}}</li>
              </ul>
            </li>
            <li nz-submenu>
              <span title><i class="anticon anticon-user"></i><span class="nav-text">SAEGW</span></span>
              <ul>
                <li nz-menu-item *ngFor="let saegw of saegws" (click)="onSelect(saegw)">{{saegw.name}}</li>
              </ul>
            </li>
            <li nz-submenu>
            <span title><i class="anticon anticon-user"></i><span class="nav-text">CG</span></span>
            <ul>
              <li nz-menu-item *ngFor="let cg of cgs" (click)="onSelect(cg)">{{cg.name}}</li>
            </ul>
          </li>
        </ul>
      </li>
      <li nz-submenu>
        <span title><i class="anticon anticon-team"></i><span class="nav-text">脚本执行</span></span>
        <ul>
          <li nz-submenu>
            <span title><i class="anticon anticon-user"></i><span class="nav-text">MME</span></span>
            <ul>
              <li nz-menu-item>用户状况</li>
            </ul>
          </li>
          <li nz-submenu>
            <span title><i class="anticon anticon-user"></i><span class="nav-text">SAEGW</span></span>
            <ul>
              <li nz-menu-item>用户状况</li>
            </ul>
          </li>
        </ul>
      </li>
      <li nz-menu-item><span><i class="anticon anticon-file"></i><span class="nav-text">File</span></span></li>
    </ul>
  `,
    styles: [],
    providers: []
  })
  export class SideBarComponent implements OnInit {
    isCollapsed = false;
    mmes = [ 
        {
          'type' : 'telnet',
          'name' : 'SHMME03BNK',
          'host' : '172.20.13.28',
          //'host' : '127.0.0.1',
          //'port' : '51004',
          'port' : '23',
          'login': [
            { prompt: 'USERNAME', answer: 'NOKIA1\r' },
            { prompt: 'PASSWORD', answer: 'NOKIA2016\r' }
          ]
        },
        {
          'type': 'telnet',
          'name': 'SHMME04BNK',
          //'address': '172.20.12.28',
          'host': '127.0.0.1',
          'port': '51007',
          'login': [
            { prompt: 'USERNAME', answer: 'NOKIA1\r' },
            { prompt: 'PASSWORD', answer: 'NOKIA2016\r' }
          ]
        },
        {
          'type': 'ssh',
          'name': 'CENTOS7',
          'host': '10.20.0.231',
          'port': '22',
          'user': 'huykai',
          'login': [
            { prompt: 'password:', answer: 'Huykai123\n' }
          ]
        }
    ];
    
    saegws = [ 
      {
        'type' : 'ssh',
        'name' : 'SHSAEGW03BNK',
        'host' : '172.20.13.28',
        //'host' : '127.0.0.1',
        'port' : '22',
        'user' : 'nokia1',
        'login': [
          { prompt: 'password:', answer: 'qz76gprs\n' }
        ]
      },
      {
        'type' : 'ssh',
        'name' : 'SHSAEGW04BNK',
        //'address': '172.20.12.28',
        'host' : '127.0.0.1',
        'port' : '51016',
        'user' : 'nokia1',
        'login': [
          { prompt: 'password:', answer: 'qz76gprs\n' }
        ]
      }
    ];

    cgs = [ 
      {
        'type' : 'ssh',
        'name' : 'SHCG17BNK-1',
        'host' : '172.20.13.28',
        //'host' : '127.0.0.1',
        'port' : '22',
        'user' : 'cmd',
        'login': [
          { prompt: 'password:', answer: 'cgadmin!\n' }
        ]
      },
      {
        'type' : 'ssh',
        'name' : 'SHCG17BNK-2',
        //'address': '172.20.12.28',
        'host' : '127.0.0.1',
        'port' : '51088',
        'user' : 'cmd',
        'login': [
          { prompt: 'password:', answer: 'cgadmin!\n' }
        ]
      },
      {
        'type' : 'ssh',
        'name' : 'SHCG18BNK-1',
        //'address': '172.20.13.28',
        'host' : '127.0.0.1',
        'port' : '51089',
        'user' : 'cmd',
        'login': [
          { prompt: 'password:', answer: 'cgadmin!\n' }
        ]
      },
      {
        'type' : 'ssh',
        'name' : 'SHCG18BNK-2',
        //'address': '172.20.12.28',
        'host' : '127.0.0.1',
        'port' : '51092',
        'user' : 'cmd',
        'login': [
          { prompt: 'password:', answer: 'cgadmin!\n' }
        ]
      }
    ];
    
    constructor(private tabContentService: TabContentService) {
    }
  
    ngOnInit() {
    }

    onSelect(host) {
      let taskInfo = {
          title: host.name,
          type: 'terminal',
          info: host
      }
      this.tabContentService.announce(taskInfo);
      console.log('onSelect tabContentService announce');
    }
  }