import {Component, Input} from '@angular/core';
import {ScreenService} from '../services/screen.service';

@Component({
  selector: 'screen-component',
  providers: [],
  template: `
    <div>
      <h2 style="color: white;">Label: {{label}} - Value: </h2>
      <input type="text" [(ngModel)]="label"/>
      <input type="text" [(ngModel)]="label"/>
    </div>
  `
})
export class ScreenComponent {
  @Input() label = "Not Set";
  
  constructor(private screenService: ScreenService) {
    
  } 
  
  ngOnDestroy(){
    console.log("destroyed");
  }
}