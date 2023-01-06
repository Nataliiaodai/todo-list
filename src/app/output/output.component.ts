import { Component, OnInit } from '@angular/core';
import {InputDataService} from "../input-data.service";

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements OnInit {
  inputText: string;
  constructor(private inputDataService: InputDataService) { }

  ngOnInit(): void {
    this.inputDataService.dataEmitter.subscribe((value) => {
      this.inputText = value;
    })
  }

}
