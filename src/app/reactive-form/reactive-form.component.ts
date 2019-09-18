import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {
  genders = ['Male', 'Female', 'Others'];
  signupForm: FormGroup;
  forbiddenUsername = ['hanumanthnbalu', 'HANUMANTHNBALU', 'HANUMANTH'];
  constructor() { }
  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl('', [ Validators.required,
                                      Validators.minLength(3),
                                      this.forbiddenNames.bind(this) ]),
      email: new FormControl('', [ Validators.required, Validators.email], this.forbiddenEmails),
      gender: new FormControl('Male'),
      hobbies: new FormArray([])
    });
  }
  onSubmit() {
    console.log('REACTIVE FORM: ', this.signupForm);
  }
  onAddHobbies() {
    const control = new FormControl('', Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsername.indexOf(control.value) !== -1) {
      return {'forbiddenName': true}
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
  removeHobbies(hobbies, i) {
    ( < FormArray > this.signupForm.controls['hobbies']).removeAt(i);
  }
}
