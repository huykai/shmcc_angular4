import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { TabContentService } from '../services/TabContentService';
import { getService } from '../services/getService';

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
              <li nz-menu-item *ngFor="let mme of mmes" (click)="onSelect('terminal', mme)">{{mme.name}}</li>
            </ul>
          </li>
          <li nz-submenu>
            <span title><i class="anticon anticon-user"></i><span class="nav-text">SAEGW</span></span>
            <ul>
              <li nz-menu-item *ngFor="let saegw of saegws" (click)="onSelect('terminal', saegw)">{{saegw.name}}</li>
            </ul>
          </li>
          <li nz-submenu>
            <span title><i class="anticon anticon-user"></i><span class="nav-text">CG</span></span>
            <ul>
              <li nz-menu-item *ngFor="let cg of cgs" (click)="onSelect('terminal', cg)">{{cg.name}}
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li nz-submenu>
        <span title><i class="anticon anticon-team"></i><span class="nav-text">帮助信息查询</span></span>
        <ul>
          <li nz-menu-item (click)="onSelect('info', 'NED')">NED信息查询</li>
          <li nz-submenu>
            <span title><i class="anticon anticon-user"></i><span class="nav-text">网元信息查询</span></span>
            <ul>
              <li nz-menu-item *ngFor="let doc of docs" (click)="onSelect('info', doc)">{{doc}}
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li nz-submenu>
        <span title><i class="anticon anticon-team"></i><span class="nav-text">其他系统接口</span></span>
        <ul>
          <li nz-menu-item (click)="onSelect('info', 'FMA')">FMA系统</li>
        </ul>
      </li>
    </ul>
  `,
    styles: [],
    providers: []
  })
  export class SideBarComponent implements OnInit {
    isCollapsed = false;
    mmes = [ 
        {
          'name': 'SHMME03BNK',
        },
        {
          'name': 'SHMME04BNK',
        },
        {
          'name': 'SHMME05BNK',
        },
        {
          'name': 'SHMME06BNK',
        },
        {
          'name': 'SHMME07BNK',
        },
        {
          'name': 'SHMME08BNK',
        },
        {
          'name': 'SHMME09BNK',
        },
        {
          'name': 'SHMME10BNK',
        }
    ];
    
    saegws = [ 
      {
        'name': 'SHSAEGW03BNK',
      },
      {
        'name': 'SHSAEGW04BNK',
      },
      {
        'name': 'SHSAEGW05BNK',
      },
      {
        'name': 'SHSAEGW06BNK',
      },
      {
        'name': 'SHSAEGW07BNK',
      },
      {
        'name': 'SHSAEGW08BNK',
      },
      {
        'name': 'SHSAEGW09BNK',
      },
      {
        'name': 'SHSAEGW10BNK',
      },
      {
        'name': 'SHSAEGW11BNK',
      },
      {
        'name': 'SHSAEGW12BNK',
      }
    ];

    cgs = [ 
      {
        'name': 'SHCG16BNK-1',
      },
      {
        'name': 'SHCG16BNK-2',
      },
      {
        'name': 'SHCG17BNK-1',
      },
      {
        'name': 'SHCG17BNK-2',
      },
      {
        'name': 'SHCG18BNK-1',
      },
      {
        'name': 'SHCG18BNK-2',
      },
      {
        'name': 'SHCG19BNK-1',
      },
      {
        'name': 'SHCG19BNK-2',
      },
      {
        'name': 'SHCG20BNK-1',
      },
      {
        'name': 'SHCG20BNK-2',
      },
      {
        'name': 'SHCG21BNK-1',
      },
      {
        'name': 'SHCG21BNK-2',
      },
      {
        'name': 'SHCG22BNK-1',
      },
      {
        'name': 'SHCG22BNK-2',
      },
      {
        'name': 'SHCG23BNK-1',
      },
      {
        'name': 'SHCG23BNK-2',
      },
      {
        'name': 'SHCG24BNK-1',
      },
      {
        'name': 'SHCG24BNK-2',
      },
      {
        'name': 'SHCG25BNK-1',
      },
      {
        'name': 'SHCG25BNK-2',
      },
      {
        'name': 'SHCG26BNK-1',
      },
      {
        'name': 'SHCG26BNK-2',
      },
      {
        'name': 'SHCG27BNK-1',
      },
      {
        'name': 'SHCG27BNK-2',
      },
      {
        'name': 'SHCG28BNK-1',
      },
      {
        'name': 'SHCG28BNK-2',
      },
      {
        'name': 'SHCG29BNK-1',
      },
      {
        'name': 'SHCG29BNK-2',
      },
      {
        'name': 'SHCG30BNK-1',
      },
      {
        'name': 'SHCG30BNK-2',
      }
    ];
    
    docs: any;

    docGetUrl = '../Documents/';
    docGetUrlApi = '/api/getDocumentList';
    constructor(private tabContentService: TabContentService,
                private getService: getService) {
    }
  
    ngOnInit() {
      this.getService.getInfo(this.docGetUrlApi)
      .subscribe(data => {
        try {
          // console.log(data)
          this.docs = data
          // console.log('Get Document docs: ', this.docs)
        } catch (Error) {
          console.log('Get Document with error. data: ', data.toString())
        }
        // console.log('this.docs: ', this.docs);
      })
    }

    onSelect(type, info) {
      let taskInfo = {
        title: type==='terminal'?info.name:info,
        type: type,
        info: info
      }
      this.tabContentService.announce(taskInfo);
    }
  }