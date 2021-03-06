import { Component, OnInit } from '@angular/core';
import { TabContentService } from '../services/TabContentService';
import { TerminalCommandService } from '../services/TerminalCommandService';
import { Subscription }   from 'rxjs/Subscription';
import { InfoIframeComponent } from './InfoIframeComponent';


import { lib, hterm } from '../hyktty/hterm_all.js';
import { hyktty } from '../hyktty/hyktty.js';
import * as io from 'socket.io-client';
/* <evolution></evolution> */

declare var document:any;
declare var window:any;

@Component({
    selector: 'tabs-card',
    template: `
    <!--
    <nz-content height="240" style="margin:0 16px; padding:24px; background: #fff">
      <FormPanel> </FormPanel>
    </nz-content>
    -->
    <!--
    <kendo-tabstrip>
      <kendo-tabstrip-tab *ngFor="let task of tasks" [title]="task.title" [selected]="task.selected">
        <ng-template kendoTabContent>
          <p>
            {{task.content}}
          </p>
          <div id='terminal_{{task.title}}' class='terminal'> </div>
        </ng-template>
      </kendo-tabstrip-tab>
    </kendo-tabstrip>
    -->
    <nz-tabset [nzType]="'card'" [nzSelectedIndex]="tasks.length">
      <nz-tab *ngFor="let task of tasks" >
        <ng-template #nzTabHeading>
          {{task.title}}
          <i class="anticon anticon-cross" (click)="closeTab(task)"></i>
        </ng-template>
        <span>{{task.content}}</span>
        <div id='terminal_parent' *ngIf="task.type === 'terminal'">
          <div id='terminal_{{task.taskId}}' class='terminal'> </div>
        </div>
        <div id='info_parent' *ngIf="task.type === 'info'">
          <div id='info_{{task.taskId}}' class='info'> 
            <InfoIframe [urlsrc]="task.title" [urltype]="task.info"></InfoIframe>
          </div>
        </div>
      </nz-tab>
    </nz-tabset>
      `,
    styles: [`
    #terminal_parent {
      display: block;
      position: relative;
      overflow-x:auto;
      white-space:nowrap;
      width: 100%;
      height: 630px;
    }
    .terminal {
      display: block;
      position: relative;
      width: 800px;
      height: 600px;
      padding: 0px, 0px, 10px, 2px;
    }
    `],
    providers: []
  })
  export class TabPanelComponent implements OnInit {
    tasks = [
      
    ];

    tabSubscription: Subscription;
    terminalSubscription: Subscription;

    constructor(private tabContentService: TabContentService,
                private terminalCommandService: TerminalCommandService ) {
    }
    
    socket;
    // socket_location = "http://127.0.0.1:3000/";
    socket_location = location.origin;
    terminal(taskInfo):any {
      console.log('taskInfo : ', taskInfo.host) ;
      var term;
      var buf = '';
      //this.socket = io(location.origin, {path: '/hyktty/socket.io'})
      this.socket = io(this.socket_location, {path: '/hyktty/socket.io'})
      //this.socket = io()
      
      this.socket.on('connect', () => {
        console.log('taskInfo socket connect') ;
        lib.init(() => {
          hterm.defaultStorage = new lib.Storage.Local();
          term = new hterm.Terminal();
          let termname = 'terminal_' + taskInfo['taskId'];
          window[termname] = term;
          console.log('New Terminal Name: ', termname);
          term.decorate(document.getElementById(termname));
  
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
        console.log('socket emit remote login');
        this.socket.emit('login', {
          name: taskInfo['name']
        });
        
      });
    
      this.socket.on('output', (data) => {
        console.log('taskInfo socket output: ',data) ;
        if (!term) {
          buf += data;
          return;
        }
        term.io.writeUTF16(data);
        //if (taskInfo['login'] && taskInfo['login'].length > 0) {
          // console.log('login info: ', taskInfo['login']);
        //  let loginparam = taskInfo['login'][0];
          // console.log('login param: ', loginparam);
        //  if (data.indexOf(loginparam['prompt']) >= 0) {
        //    console.log('login param: ', loginparam);
        //    taskInfo['login'].splice(0,1);
        //    term.command.socket.emit('input', loginparam['answer']);
        //  }
        //}
      });
      
      this.socket.on('disconnect', function() {
        console.log("Socket.io connection closed");
      })

    }

    ngOnInit() {
      this.terminalSubscription = this.terminalCommandService.AnnouncedCommands$.subscribe(
        cmdsInfo => {

        } 
      )
      this.tabSubscription = this.tabContentService.Announced$.subscribe(
        taskInfo => {
          console.log('TabPanelComponent announce received ', taskInfo);
          
          if (taskInfo['type'] === 'info') {
            let taskId = taskInfo['title'] + Date.now();
            let content = `
            Info about ${taskInfo['title']} ${taskInfo['info']} 
            `;
            if (taskInfo['title'] === 'NED') {
              if (taskInfo['info'] === 'remote') {
                content += ' Notice: 远程NED连接只能在移动网元内部网络环境下使用。请确保172.20.24.250的NED已经正常启动。'
              } else {
                content += ' Notice: 本地NED连接只有在已经在本机安装NED的情况下使用。本地NED的端口号应为9090.'
              }
            } else if (taskInfo['title'] === 'FMA') {
              if (taskInfo['info'] === 'remote') {
                content += ' Notice: 远程FMA连接只能在移动网元内部网络环境下使用。'
              } else {
                content += ' Notice: 本地FMA连接需要在本机做远程FMA的端口映射，localhost:51018映射到10.10.31.19:8080.'
              }
            }
            
            let newtask = {
              type: 'info',
              title: taskInfo['title'],
              taskId: taskId,
              info: taskInfo['info'],
              content: content,
              selected: true
            }
            for (let task of this.tasks){
              task['selected'] = false;
            }
            this.tasks.push(newtask);
          }
          else if(taskInfo['type'] === 'terminal') {
            let taskId = taskInfo['title'] + Date.now();
            taskInfo['info']['taskId'] = taskId;
            let newtask = {
              type: 'terminal',
              title: taskInfo['title'],
              taskId: taskId,
              info: '',
              content: `
              terminal on ${taskInfo['title']} 
              `,
              selected: true
            }
            for (let task of this.tasks){
              task['selected'] = false;
            }
            this.tasks.push(newtask);
            let taskInfoDetail = JSON.parse(JSON.stringify(taskInfo['info']));
            this.terminal(taskInfoDetail);
            console.log('taskInfoDetail: ', taskInfoDetail, ' newtask: ', newtask, ' tasks: ', this.tasks);
            let taskParams = [];
            for (let task of this.tasks) {
              let tasksinfo = {
                'label': task['title'],
                'value': task['taskId']
              };
              taskParams.push(tasksinfo);
            }
            console.log('taskParams:', taskParams);
            this.terminalCommandService.announceTerminals(taskParams);
          }
        }
      )
    }

    closeTab(tab) {
      console.log('closeTab: ', tab, ' tabindex: ', this.tasks.indexOf(tab));
      this.tasks.splice(this.tasks.indexOf(tab), 1);
      console.log('after closeTab: ', this.tasks.length);
      let term = window['terminal_' + tab['taskId']];
      if (term) {
        term.command.socket.close();
        delete(window['terminal_' + tab['taskId']]);
      }
      this.terminalCommandService.announceTerminals(this.tasks);
    };
  }