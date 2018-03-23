import { Component, OnInit, Input } from '@angular/core';
import { SafePipe } from '../pips/SafePipe';

@Component({
    selector: 'InfoIframe',
    template: `
        <iframe width="100%" height="800" [src]="url | safe">
            <p>Your browser does not support iframes.</p>
        </iframe>
    `,
    styles  : [
    ]
})

export class InfoIframeComponent {
    @Input('urlsrc') urlsrc:string;
    url:string;
    
        
    constructor() {   
    }
    ngOnInit() {
        if (this.urlsrc === 'NED'){
            // this.url = "http://localhost:9090/informationbrowser/index.jsp";
            // this.url = "http://172.20.24.252:9090/informationbrowser/index.jsp";
            console.log('InfoIframeComponent urlsrc: ', this.urlsrc);
        this.url = "webs/ned/index.jsp";
        } else if (this.urlsrc.split('.')[1] === 'pdf') {
            console.log('InfoIframeComponent urlsrc: ', this.urlsrc);
            // this.url = "http://localhost:3000/documents/" + this.urlsrc;
            this.url = "/documents/" + this.urlsrc;
        } else if (this.urlsrc === 'FMA') {
            console.log('InfoIframeComponent urlsrc: ', this.urlsrc);
            // this.url = "http://localhost:51018/FMANS17/login.xhtml";
            // this.url = "http://10.10.31.19:8080/FMANS17/login.xhtml";
            this.url = "/webs/fma/login.xhtml";
        }
    }
}