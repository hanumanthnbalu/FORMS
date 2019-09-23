import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-arrayforms',
  templateUrl: './arrayforms.component.html',
  styleUrls: ['./arrayforms.component.scss']
})
export class ArrayformsComponent implements OnInit {
  employeeForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.employeeForm = new FormGroup({
      fullName: new FormControl(),
      email: new FormControl()
    });
  }
  // addSkillFormGroup(): FormGroup {
  //     return this.fb.group({
  //       skillName: ['', Validators.required],
  //       profieciency: ['', Validators.required],
  //       experienceinYear: ['', Validators.required],
  //     });
  // }
  onSubmit() {
    console.log(this.employeeForm);
  }

}
