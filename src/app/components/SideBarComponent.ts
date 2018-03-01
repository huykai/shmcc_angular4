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