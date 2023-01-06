import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-component1',
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.css']
})
export class Component1Component implements OnInit {
  inputText: string;

  constructor(private dataService: DataService) { }

  onButonClick() {
    // console.log(this.inputText);
    this.dataService.riseNewEvent(this.inputText);
  }

  ngOnInit(): void {
  }

}
