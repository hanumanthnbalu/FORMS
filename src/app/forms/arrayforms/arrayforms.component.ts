import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CustomValidators } from '../../shared/custom-validators';


@Component({
  selector: 'app-arrayforms',
  templateUrl: './arrayforms.component.html',
  styleUrls: ['./arrayforms.component.scss']
})
export class ArrayformsComponent implements OnInit {
  employeeForm: FormGroup;
  fullNameLength = 0;
  public imagePath;
  imgURL: any;
  public message: string;
  formErrors = {
    'fullName': '',
    'email': '',
    'confirmEmail': '',
    'phone': '',
    // 'skillName': '',
    // 'experienceInYears': '',
    // 'proficiency': ''
  };

  validationMessages = {
    'fullName': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 2 characters.',
      'maxlength': 'Full Name must be less than 10 characters.'
    },
    'email': {
      'required': 'Email is required.',
      'emailDomain': 'Email domian should be hanumanthnbalu.com'
    },
    'confirmEmail': {
      'required': 'Confirm Email is required.'
    },
    'emailGroup': {
      'emailMismatch': 'Email and Confirm E-mail not matched.'
    },
    'phone': {
      'required': 'Phone number is required.'
    },
    // 'skillName': {
    //   'required': 'Skill Name is required.',
    // },
    // 'experienceInYears': {
    //   'required': 'Experience is required.',
    // },
    // 'proficiency': {
    //   'required': 'Proficiency is required.',
    // },
  };
  constructor(private fb: FormBuilder) { }
  ngOnInit() {
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      contactPreference: ['email'],
      emailGroup: this.fb.group({
        email: ['', [Validators.required]],
        confirmEmail: ['', [Validators.required]],
      }, { validator: matchEmails }),
      phone: [''],
      skills: this.fb.array([
        this.addSkillFormGroup()
      ]),
    });

    this.employeeForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.employeeForm);
    });

    this.employeeForm.get('contactPreference').valueChanges.subscribe((data: string) => {
      this.onContactPrefernceChange(data);
    });
  }

  addSkillButtonClick(): void {
    (<FormArray>this.employeeForm.get('skills')).push(this.addSkillFormGroup());
  }

  logValidationErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid
        && (abstractControl.touched || abstractControl.dirty)) {
        const messages = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
      // if (abstractControl instanceof FormArray) {
      //   for (const control of abstractControl.controls ) {
      //     if (control instanceof FormGroup) {
      //       this.logValidationErrors(control);
      //     }
      //   }
      // }
    });
  }

  preview(files: any) {
    if (files.length === 0) { return; }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }
  onContactPrefernceChange(selectedValue: string) {
    const phoneFormControl = this.employeeForm.get('phone');
    if (selectedValue === 'phone') {
      phoneFormControl.setValidators(Validators.required);
    } else {
      phoneFormControl.clearValidators();
    }
    phoneFormControl.updateValueAndValidity();
  }


  onLoadDataClick(): void {
    const formArray = new FormArray([
      new FormControl('HNB', Validators.required),
      new FormGroup({
        country: new FormControl('', Validators.required)}),
        new FormArray([])
    ]);

    const formArray1 = this.fb.array([
      new FormControl('HNB', Validators.required),
      new FormControl('IT', Validators.required),
      new FormControl('Male', Validators.required),
    ]);

    const formGroup = this.fb.group([
      new FormControl('HNB', Validators.required),
      new FormControl('IT', Validators.required),
      new FormControl('Male', Validators.required),
    ]);
    formArray1.push(new FormControl('HANU', Validators.required))
    console.log(formArray1.at(3).value);
    console.log(formGroup);
  }

  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      experienceInYears: ['', Validators.required],
      proficiency: ['', Validators.required]
    });
  }
  removeSkills(skillGroupIndex: number): void {
    (<FormArray>this.employeeForm.get('skills')).removeAt(skillGroupIndex);
  }

  onSubmit() {
    console.log(this.employeeForm);
  }

}

function matchEmails(group: AbstractControl): { [key: string]: any } | null {
  const emailControl = group.get('email');
  const confirmEmailControl = group.get('confirmEmail');

  if (emailControl.value === confirmEmailControl.value || confirmEmailControl.pristine) {
    return null;
  } else {
    return { 'emailMismatch': true };
  }
}
