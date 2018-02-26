import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TabContentService {
  public newTabContentConfig = {
    title: '',
    type: '',
    componentName: '',
    componentState: { text: 'test' }
};

  // Observable sources
  private AnnouncedSource = new BehaviorSubject<Object>(this.newTabContentConfig);
  private ConfirmedSource = new BehaviorSubject<Object>({});

  
  // Observable streams
  Announced$ = this.AnnouncedSource.asObservable();
  Confirmed$ = this.ConfirmedSource.asObservable();

  // Service message commands
  announce(tabContent: Object) {
    console.log('TabContentService announce next ', tabContent);
    this.AnnouncedSource.next(tabContent);
  }

  confirm(result: string) {
    this.ConfirmedSource.next(result);
  }
}