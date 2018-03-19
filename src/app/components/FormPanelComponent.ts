import { Component, OnInit, Inject} from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TerminalCommandService } from '../services/TerminalCommandService';

@Component({
  selector: 'FormPanel',
  styles  : [ ],
  template: `
<div style="margin-left:5px; width: 100%; overflow-y: auto;height:600px;">
  <!--<form nz-form [nzType]="'horizontal'" [formGroup]="validateForm"> -->
  
    <div nz-row>
      <div nz-col [nzSpan]="6" [nzOffset]="1">
        <label>选择脚本文件：</label>
      </div>
      <div nz-col [nzSpan]="6" [nzOffset]="1">
        <input type="file" name="" id="myFile" value="" multiple="false" />
      </div>
    </div>
    
    <div nz-row>
      <div nz-col [nzSpan]="6" [nzOffset]="1">
        <label>选择终端：</label>
      </div>
      <div nz-col [nzSpan]="14" [nzOffset]="1">
        <nz-select style="margin: 0px,10px; width: 100%;"
          [nzMode]="'multiple'"
          [nzPlaceHolder]="'请选择终端'"
          [(ngModel)]="selectedTerminalMultipleOptions"
          [nzNotFoundContent]="'无法找到'">
          <nz-option 
            *ngFor="let option of terminalOptions"
            [nzLabel]="option.label"
            [nzValue]="option.value">
          </nz-option>
        </nz-select>
      </div>
    </div>

    <div nz-row *ngFor="let job of jobs">
      <div nz-col [nzSpan]="1" >
        <label>{{job.index}}</label>
      </div>
      <div nz-col [nzSpan]="18" >
        <nz-input [(ngModel)]="job.command" nzType="textarea" nzAutosize nzPlaceHolder="Commands input and modify here..."></nz-input>
      </div>
      <div nz-col [nzSpan]="5" >
        <button nz-button [nzType]="'primary'" (click)="runCommand(job)" >
          <span>Run</span>
        </button>
      </div>
    </div>
    <div nz-row>
      <div nz-col [nzSpan]="1" [nzOffset]="1" >
        <button nz-button [nzType]="'primary'" (click)="runCommand(job)" >
          <span>Run</span>
        </button>
      </div>
      <div nz-col [nzSpan]="18" [nzOffset]="1">
        <button nz-button [nzType]="'primary'" (click)="runCommand(job)" >
          <span>Run</span>
        </button>
      </div>

    <!--
    <div nz-form-item nz-row>
      <div nz-form-label nz-col [nzSpan]="6">
        <label>Plain Text</label>
      </div>
      <div nz-form-control nz-col [nzSpan]="14">
        <span nz-form-text>China</span>
      </div>
    </div>
    <div nz-form-item nz-row>
      <div nz-form-label nz-col [nzSpan]="6">
        <label nz-form-item-required>Select</label>
      </div>
      <div nz-form-control nz-col [nzSpan]="14">
        <nz-select formControlName="select" [nzSize]="'large'">
          <nz-option [nzLabel]="'China'" [nzValue]="'China'"></nz-option>
          <nz-option [nzLabel]="'U.S.A'" [nzValue]="'U.S.A'"></nz-option>
        </nz-select>
      </div>
    </div>
    <div nz-form-item nz-row>
      <div nz-form-label nz-col [nzSpan]="6">
        <label nz-form-item-required>Select[multiple]</label>
      </div>
      <div nz-form-control nz-col [nzSpan]="14">
        <nz-select formControlName="select_multiple" [nzSize]="'large'" [nzMode]="'multiple'">
          <nz-option [nzLabel]="'Red'" [nzValue]="'Red'"></nz-option>
          <nz-option [nzLabel]="'Green'" [nzValue]="'Green'"></nz-option>
          <nz-option [nzLabel]="'Blue'" [nzValue]="'Blue'"></nz-option>
        </nz-select>
      </div>
    </div>
    <div nz-form-item nz-row>
      <div nz-form-label nz-col [nzSpan]="6">
        <label nz-form-item-required>DatePicker</label>
      </div>
      <div nz-form-control nz-col [nzSpan]="14">
        <nz-datepicker formControlName="datepicker" [nzSize]="'large'">
        </nz-datepicker>
      </div>
    </div>
    <div nz-form-item nz-row>
      <div nz-form-label nz-col [nzSpan]="6">
        <label nz-form-item-required>TimePicker</label>
      </div>
      <div nz-form-control nz-col [nzSpan]="14">
        <nz-timepicker formControlName="timepicker" [nzSize]="'large'">
        </nz-timepicker>
      </div>
    </div>
    <div nz-form-item nz-row>
      <div nz-form-label nz-col [nzSpan]="6">
        <label>InputNumber</label>
      </div>
      <div nz-form-control nz-col [nzSpan]="14">
        <nz-input-number formControlName="input_number" [nzSize]="'large'" [nzStep]="1" [nzMax]="4" [nzMin]="1"></nz-input-number>
        <span nz-form-text> machines</span>
      </div>
    </div>
    <div nz-form-item nz-row>
      <div nz-form-label nz-col [nzSpan]="6">
        <label>Switch</label>
      </div>
      <div nz-form-control nz-col [nzSpan]="14">
        <nz-switch formControlName="switch"></nz-switch>
      </div>
    </div>
    <div nz-form-item nz-row>
      <div nz-form-label nz-col [nzSpan]="6">
        <label>Slider</label>
      </div>
      <div nz-form-control nz-col [nzSpan]="14">
        <nz-slider formControlName="slider" [nzMarks]="marks"></nz-slider>
      </div>
    </div>
    <div nz-form-item nz-row>
      <div nz-form-label nz-col [nzSpan]="6">
        <label>Radio.Group</label>
      </div>
      <div nz-form-control nz-col [nzSpan]="14">
        <nz-radio-group formControlName="radio_group">
          <label nz-radio [nzValue]="1">
            <span>item 1</span>
          </label>
          <label nz-radio [nzValue]="2">
            <span>item 2</span>
          </label>
          <label nz-radio [nzValue]="3">
            <span>item 3</span>
          </label>
        </nz-radio-group>
      </div>
    </div>
    <div nz-form-item nz-row>
      <div nz-form-label nz-col [nzSpan]="6">
        <label>Radio.Button</label>
      </div>
      <div nz-form-control nz-col [nzSpan]="14">
        <nz-radio-group formControlName="radio_button">
          <label nz-radio-button [nzValue]="1">
            <span>item 1 4 4 4v4v4v4</span>
          </label>
          <label nz-radio-button [nzValue]="2">
            <span>item 2</span>
          </label>
          <label nz-radio-button [nzValue]="3">
            <span>item 3</span>
          </label>
        </nz-radio-group>
      </div>
    </div>
    <div nz-form-item nz-row>
      <div nz-form-control nz-col [nzSpan]="12" [nzOffset]="6">
        <button nz-button [nzType]="'primary'" [nzSize]="'large'">Submit</button>
      </div>
    </div>
    
  </form>
  -->
</div>
`
})

export class FormPanelComponent implements OnInit {
  validateForm: FormGroup;
  terminalOptions = [];
  jobs = [];
  
  selectedTerminalMultipleOptions = [];

  constructor(private fb: FormBuilder,
              private terminalCommandService:TerminalCommandService) {
    console.log("Here is FormPanelComponent")
  }

  runCommand(cmd) {
    console.log('runCommand: ', cmd.command);
    console.log('selectedTerminalMultipleOption: ', this.selectedTerminalMultipleOptions);
    for (let selectedTerminal of this.selectedTerminalMultipleOptions){
      for (let terminalOption of this.terminalOptions) {
        console.log('terminalOption: ', terminalOption);
        if (terminalOption['value'] === selectedTerminal) {
          let term = window['terminal_' + terminalOption['value']]
          if(term) {
            term.command.sendString_(cmd.command + '\r\n');
          }
          
        }
      }
    }
  }

  ngOnInit() {
    console.log('FormPanelComponent ngOnInit');
    this.validateForm = this.fb.group({
      cmdsFile       : [],
      terminalsSelect: [],
      select         : [ 'China' ],
      select_multiple: [ [ 'Red' ] ],
      datepicker     : [ new Date() ],
      timepicker     : [ new Date() ],
      input_number   : [ 4 ],
      switch         : [ false ],
      slider         : [ 0 ],
      radio_group    : [ 1 ],
      radio_button   : [ 1 ]
    });
    
    this.terminalCommandService.AnnouncedTerminals$.subscribe((terminalInfo:any[]) => {
      console.log('subscribe terminalInfo: ', terminalInfo);
      if(terminalInfo.length > 0 ) {
        let options = [];
        for (let info of terminalInfo) {
          options.push({
            'label': info['label'],
            'value': info['value']
          })
        }
        this.terminalOptions = options;
        console.log('subscribe terminalOption: ', this.terminalOptions);
      }
    });

    var oFile = document.getElementById("myFile");
    var oCotnent = document.getElementById("content");
    oFile.addEventListener("change", ev => {
      var event = ev || window.event;
      var files:any = (<HTMLInputElement>ev.target).files;
      /*
      file content format:
      COMMAND1
      COMMAND2
      ...
      */
      this.handleCmdFile(files)
    }, false);
  }

  handleCmdFile(files) {
    for (var i = 0, len = files.length; i < len; i++) {
      var reader = new FileReader();
      var file = files[i];
      reader.onload = (file => {
        return e => {
          let commands = e.target.result.split('\n');
          console.log('file reader result: ', commands);
          let localjobs = []
          let index = 0;
          for (let command of commands) {
            if (command !== '') {
              localjobs.push({
                'index': ++index,
                'command': command
              })
            }
          }
          console.log('this.jobs:', this.jobs);
          console.log('jobs:', localjobs);
          this.jobs = localjobs;
        };
      })(file);
      //读取文件内容
      reader.readAsText(file,"utf-8");
    }
  }

}