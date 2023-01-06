import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-component2',
  templateUrl: './component2.component.html',
  styleUrls: ['./component2.component.css']
})
export class Component2Component implements OnInit {
  enteredText: string;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.dataEmitter.subscribe((value) => {
      this.enteredText = value;
    })
  }

}
