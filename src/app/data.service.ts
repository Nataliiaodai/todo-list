import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // dataEmitter = new EventEmitter<string>();
  dataEmitter = new Subject<string>();

  riseNewEvent(data: string) {
    // this.dataEmitter.emit(data);
    this.dataEmitter.next(data);
  }

  constructor() { }

}
