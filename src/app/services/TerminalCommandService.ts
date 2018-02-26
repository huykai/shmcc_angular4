import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TerminalCommandService {
  public CommandsConfig = {
    cmds: [],
    type: ''
  };
  public TerminalsConfig = [];
  /*
  {
    title: '',
    taskId: '',
    content: '',
    selected: true,
    term: ''
  };
  */
  // Observable sources
  private AnnouncedCommandsSource = new BehaviorSubject<Object>(this.CommandsConfig);
  private AnnouncedTerminalsSource = new BehaviorSubject<Object>(this.TerminalsConfig);
    
  // Observable streams
  AnnouncedCommands$ = this.AnnouncedCommandsSource.asObservable();
  AnnouncedTerminals$ = this.AnnouncedTerminalsSource.asObservable();
  
  // Service message commands
  announceCmds(CommandsContent: Object) {
    console.log('TerminalCommandService announce next ', CommandsContent);
    this.AnnouncedCommandsSource.next(CommandsContent);
  }

  announceTerminals(TerminalsContent: Object) {
    console.log('TerminalCommandService announce next ', TerminalsContent);
    this.AnnouncedTerminalsSource.next(TerminalsContent);
  }
}