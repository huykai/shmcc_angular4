import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, FormArray, FormBuilder,
  Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
// Imports the PanelBar
import { LayoutModule } from '@progress/kendo-angular-layout';
// import { PanelBarModule, SplitterModule, TabStripModule } from '@progress/kendo-angular-layout';
// Import the Animations module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Import the ButtonsModule
import { ButtonsModule } from '@progress/kendo-angular-buttons';
//Import the ng-zorro-antd  --by alibaba
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { FormPanelComponent } from './components/FormPanelComponent';
import { TabPanelComponent } from './components/TabPanelComponent';
import { SideBarComponent } from './components/SideBarComponent';
import { ContentPanelComponent } from './components/ContentPanelComponent';
import { TabContentService } from './services/TabContentService';
import { TerminalCommandService } from './services/TerminalCommandService';

// Import for D3
import { NzLayoutBasicComponent } from './components/NzLayoutBasicComponent';
import { D3Service, D3_DIRECTIVES } from './d3';
import { GraphComponent } from './visuals/graph/graph.component';
import { SHARED_VISUALS } from './visuals/shared';
import { BarChartD3Component } from './components/D3Components/BarChartD3Component';

// Import for GoogleChart
import { GoogleChartComponent } from './components/GoogleChartComponent';
import { EvolutionComponent } from './components/EvolutionComponent';
import { GoogleChartLineComponent } from './components/GoogleChartLineComponent';

// Import for GoldenLayout
//import { ScreenComponent } from './components/screen.component';
//import { ScreenService } from './services/screen.service';
//import { GlDirective } from './directives/GlDirective';
import { TestPanelComponent } from './components/test-panel.component';


// import * as rxjs from 'rxjs';
import * as GoldenLayout from 'golden-layout';
import { 
  GoldenLayoutModule, 
  GoldenLayoutConfiguration, 
  DEFAULT_LOCAL_STORAGE_STATE_STORE_PROVIDER 
} from '@goldsam/ng-golden-layout';

import { LeftsideComponent } from './components/LeftsideComponent';
import { LayoutService } from './goldenlayout/layoutservice';

import { SocketIOService } from './DynamicService/SocketIOService';
import { GateOneTerminalComponent } from './components/GateOneComponents/GateOneTerminal';

const goldenLayoutConfig: GoldenLayoutConfiguration = {
  components: [
    {
      component: TestPanelComponent,
      componentName: 'test-panel'
    },
    {
      component: EvolutionComponent,
      componentName: 'EvolutionComponent'
    },
    {
      component: GoogleChartComponent,
      componentName: 'GoogleChartComponent'
    },
    {
      component: GoogleChartLineComponent,
      componentName: 'GoogleChartLineComponent'
    },
    {
      component: GraphComponent,
      componentName: 'GraphComponent'
    },
    {
      component: BarChartD3Component,
      componentName: 'BarChartD3Component'
    },
    {
      component: GateOneTerminalComponent,
      componentName: 'GateOneTerminalComponent'
    }
  ],
  defaultLayout: {
    content: [{
    type: 'row',
    content: [
      {
      type: 'component',
      title: 'A',
      width: 60,
      componentName: 'test-panel',
      componentState: { label: 'A' }
    }
    /*, {
      type: 'stack',
      content: [{
        type: 'component',
        title: 'B', 
        componentName: 'test-panel',
        componentState: { label: 'B' }
      }, {
        type: 'component',
        title: 'C', 
        componentName: 'test-panel',
        componentState: { label: 'C' }
      }]
    }*/]
  }]
  }
}

@NgModule({
  declarations: [
    AppComponent,
    GoogleChartComponent,
    EvolutionComponent,
    NzLayoutBasicComponent,
    GraphComponent,
    ...SHARED_VISUALS,
    ...D3_DIRECTIVES,
    TestPanelComponent,
    LeftsideComponent,
    GoogleChartLineComponent,
    BarChartD3Component,
    GateOneTerminalComponent,
    TabPanelComponent,
    FormPanelComponent,
    SideBarComponent,
    ContentPanelComponent
    //ScreenComponent,
    //GlDirective
  ],
  entryComponents: [
    TestPanelComponent,
    GoogleChartComponent,
    EvolutionComponent,
    GoogleChartLineComponent,
    GraphComponent,
    BarChartD3Component,
    GateOneTerminalComponent
    //LeftsideComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    // Register the modules 
    BrowserAnimationsModule,
    ButtonsModule,
    // For ng-zorro-antd
    NgZorroAntdModule.forRoot(),
    GoldenLayoutModule.forRoot(goldenLayoutConfig),
    AppRoutingModule,
    // For Kendo
    LayoutModule
    //, PanelBarModule, SplitterModule, TabStripModule
  ],
  providers: [
    D3Service, 
    SocketIOService,
    TabContentService,
    TerminalCommandService,
    //ScreenService,
    LayoutService,
    DEFAULT_LOCAL_STORAGE_STATE_STORE_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
