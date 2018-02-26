// Angular 2 
//import {ApplicationRef, Directive, ElementRef, Input, DynamicComponentLoader, ComponentRef, Injector} from '@angular/core';
// Angular 4 DynamicComponentLoader --> ComponentFactoryResolver, ViewContainerRef
import {ApplicationRef, Directive, ElementRef, Input, ComponentFactoryResolver, ViewContainerRef, ComponentRef, Injector} from '@angular/core';
import {ScreenComponent} from '../components/screen.component';
//import {ScreenService} from '../services/screen.service';

declare var GoldenLayout:any;

@Directive({ selector: '[GLScreen]' })
export class GlDirective {
    @Input() glConfig: any;
    
    myLayout: any;
    static componentCount = 0;

    //constructor(el: ElementRef) {
    //   el.nativeElement.style.backgroundColor = 'yellow';
    //}
    constructor(private elementRef: ElementRef, 
        //private dynamicComponentLoader: DynamicComponentLoader,
        private injector: Injector,
        private applicationRef: ApplicationRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        public viewContainerRef: ViewContainerRef
        //private testService: ScreenService
        ) {       
    }

    ngOnInit(){                    
        let disposeComp = (comp) => {
          if (comp.instance && comp.instance.ngOnDestroy)
            comp.instance.ngOnDestroy();
          //this.applicationRef._unloadComponent(comp);
        };
        let goldenConfig = this.glConfig || {
            content: [{
                type: 'row',
                content:[{
                    type: 'component',
                    componentName: 'testComponent',
                    componentState: { label: 'A' } 
                },{
                    type: 'column',
                    content:[{
                        type: 'component',
                        componentName: 'testComponent',
                        componentState: { label: 'B' }
                    },{
                        type: 'component',
                        componentName: 'testComponent',
                        componentState: { label: 'C' }
                    }]
                }]
            }]
        };
        this.myLayout = new GoldenLayout(goldenConfig, this.elementRef.nativeElement);
        this.myLayout.registerComponent( 'testComponent', (container, componentState) => {
            //Create an empty div on the container
            container.getElement().html("<div id='component" + GlDirective.componentCount + "'></div>")
            //Load the component in the div #Angular2 code
            //this.dynamicComponentLoader.loadAsRoot(ScreenComponent, "#component" + GlDirective.componentCount, this.injector, disposeComp)
            //  .then((compRef: ComponentRef) => {
            //    container.compRef = compRef;
            //    this.applicationRef._loadComponent(compRef);
            //    // manually include Inputs
            //    compRef.instance['label'] = componentState.label;
            //    // trigger change detection
            //    if (compRef.instance.ngOnChanges)
            //      compRef.instance.ngOnChanges();
            //    compRef.location.internalElement.parentView.changeDetector.ref.detectChanges()
            //    // always return in a promise
            //    return compRef
            //  });
            //Load the component in the div #Angular4 code
            let componentFactory = this.componentFactoryResolver.resolveComponentFactory(ScreenComponent);
            let viewContainerRef = this.viewContainerRef;
            viewContainerRef.clear();
            
            let componentRef = viewContainerRef.createComponent(componentFactory);
            componentRef.instance['label'] = componentState.label;
            //if (componentRef.instance.ngOnChanges)
            //          componentRef.instance.ngOnChanges();
            //        componentRef.location.internalElement.parentView.changeDetector.ref.detectChanges()
                //    
            GlDirective.componentCount ++;
        });    
        this.myLayout.init();
        //this.testService.myLayout = this.myLayout;
        
        this.myLayout.on("itemDestroyed", (item)=>{
          if (item.container && item.container.compRef){
            disposeComp(item.container.compRef);
          }
        });
      }

}