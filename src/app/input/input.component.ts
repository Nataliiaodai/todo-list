import { Component, OnInit } from '@angular/core';
import {InputDataService} from "../input-data.service";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  enteredText: string;
  constructor(private inputDataService: InputDataService) { }

  onSubmitText() {
    // console.log(this.enteredText);
    this.inputDataService.raiseDataEmitterEvent(this.enteredText);
  }
  ngOnInit(): void {
  }

}

