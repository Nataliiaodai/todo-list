import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputDataService {
  dataEmitter = new EventEmitter<string>();
  constructor() { }

  raiseDataEmitterEvent(data: string) {
    this.dataEmitter.emit(data);
  }

}
