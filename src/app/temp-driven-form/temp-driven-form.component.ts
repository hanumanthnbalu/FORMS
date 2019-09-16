import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-temp-driven-form',
  templateUrl: './temp-driven-form.component.html',
  styleUrls: ['./temp-driven-form.component.scss']
})
export class TempDrivenFormComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;
  genders = ['male','female', 'others'];

  constructor() { }

  ngOnInit() {
  }
  //   onSubmit(form: NgForm) {
  //    console.log('SUBMITTED: ', form.value);
  //  }
  onSubmit() {
    console.log('SUBMITTED: ', this.signupForm);
  }
}
