import {Component, OnInit} from '@angular/core';
import {filter, from, Observable, of} from "rxjs";
import {map} from 'rxjs';
import {InputDataService} from "./input-data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
    providers: [InputDataService]
})
export class AppComponent implements OnInit {
    constructor(private inputDataService: InputDataService) {}
    ngOnInit() {}
}
