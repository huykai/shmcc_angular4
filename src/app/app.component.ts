import { Component } from '@angular/core';
//import { NzDemoLayoutBasicComponent } from './components/NzDemoLayoutBasicComponent';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //title = 'My First Angular App';
  title = 'app';
  onButtonClick() {
    this.title = 'Hello from Kendo UI!';
    console.log('Button click!')
  }
}
