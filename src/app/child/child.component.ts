import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
 
  constructor() { }

  @Output() onYell = new EventEmitter<string>();

  name: string = 'Nataliia';
  ngOnInit(): void {
  }
 
  fireYellEvent(e) {
    this.onYell.emit('Hello ' + this.name);
  }

}
