import {Component, OnInit} from '@angular/core';
import {filter, from, Observable, of} from "rxjs";
import {map} from 'rxjs';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent implements OnInit {

  ngOnInit() {}



  yell(text: string) {
    alert(text);
  }


}
