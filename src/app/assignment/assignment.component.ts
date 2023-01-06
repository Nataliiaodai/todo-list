import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {CustomValidators} from "./custom-validators";

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {
  projectForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.projectForm = new FormGroup({
        'projectName': new FormControl(null,
            [Validators.required, CustomValidators.invalidProjectName],
            CustomValidators.asyncInvalidProjectName),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'projectStatus': new FormControl('critical'),
    });

    // this.projectForm.statusChanges.subscribe(
    //     (status) => console.log(status)
    // );
  }

  onSaveProject(){
    console.log(this.projectForm.value);
    // this.projectForm.reset()
  }


}
