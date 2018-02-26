import { Component, Inject } from '@angular/core';
import { GoldenLayoutComponentState, GlOnResize, GlOnHide, GlOnShow, GoldenLayoutContainer } from '@goldsam/ng-golden-layout';
import * as GoldenLayout from 'golden-layout';
import { LayoutService } from '../goldenlayout/layoutservice';

@Component({
  /*
  template: `
    <div>
      <h1>{{state?.label}}</h1>
      <input type="text" [value]="state?.value || ''" (input)="onInput($event)">
    </div>
  `,
  */
  template: `
    <div>
      <h2 style="color: white;">Label: {{label}} - Value: </h2>
      <input type="text" [(ngModel)]="label"/>
      <input type="text" [(ngModel)]="label"/>
      <button (click)="onClick()" >press to create new component</button>
    </div>
`,
  selector: 'test-panel',
  styles  : [ `
  body .lm_content{
    overflow: scroll;
  }
  test-panel {
    z-index: -10;
  }
` ],
  providers: [LayoutService]
})
export class TestPanelComponent implements GlOnResize, GlOnHide, GlOnShow {

  constructor(@Inject(GoldenLayoutComponentState) private state: any,
              @Inject(GoldenLayoutContainer) private container: GoldenLayout.Container,
              @Inject(GoldenLayout) private gl: GoldenLayout,
              @Inject(LayoutService) private layoutService: LayoutService) {
                console.log('test-panel: gl: ', this.gl);
                this.layoutService.setLayout(this.gl);
                console.log('test-panel: myLayout', this.layoutService.getLayout());
              }
  //constructor(private state: any, private container: GoldenLayout.Container) {}
  public newItemConfig = {
    title: 'test',
    type: 'component',
    componentName: 'test-panel',
    componentState: { text: 'test' }
  };
  
  public onInput(e: Event): void {
    
    this.container.extendState({
      value: (<HTMLInputElement>e.target).value
    });

    console.log('state saved.');
    this.gl.root.contentItems[ 0 ].addChild( this.newItemConfig );
  }

  public glOnResize(): void {
    console.log('Resizing!');
    
    //this.gl.root.contentItems[ 0 ].addChild( this.newItemConfig );
  }

  public glOnShow(): void {
    console.log('Showing!');
  }

  public glOnHide(): void {
    console.log('Hiding!');
    //console.log('gl:', this.gl.root.contentItems[ 0 ]);
  }

  public onClick() {
    console.log('onClick run.');
    this.gl.root.contentItems[ 0 ].addChild( this.newItemConfig );
  }
} 