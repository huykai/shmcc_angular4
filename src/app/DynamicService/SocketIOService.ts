import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class SocketIOService {
  private url = 'http://localhost:3000';  
  private socket;
  
  sendMessage(message){
    this.socket.emit('add-message', message);    
  }
  
  getMessages(messageid) {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on(messageid, (data) => {
          console.log("get Message : ", data);
          //data = [
          //  ['Evolution', 'Imports', 'Exports'],
          //  ['A', Math.round(Math.random()*10000), Math.round(Math.random()*10000)],
          //  ['B', Math.round(Math.random()*10000), Math.round(Math.random()*10000)],
          //  ['C', Math.round(Math.random()*10000), Math.round(Math.random()*10000)]
          //];
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }  
}