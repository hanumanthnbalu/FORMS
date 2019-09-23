import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormComponent } from '../forms/reactive-form/reactive-form.component';
import { TempDrivenFormComponent } from '../forms/temp-driven-form/temp-driven-form.component';

const formRoute = [
  { path: 'reactive', component: ReactiveFormComponent },
  { path: 'template', component: TempDrivenFormComponent },
  { path: '**', redirectTo: '/characters' }
];

@NgModule({
    declarations: [ ReactiveFormComponent, TempDrivenFormComponent ],
    imports: [ CommonModule, FormsModule ,ReactiveFormsModule, RouterModule.forChild(formRoute) ],
    exports: [ RouterModule ]
})
export class FormRoutingModule {}
