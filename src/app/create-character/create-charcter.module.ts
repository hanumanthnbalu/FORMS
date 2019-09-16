import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateCharacterComponent } from '../create-character/create-character.component';

const createRoutes = [
  { path: '', component: CreateCharacterComponent },
  { path: '**', redirectTo: '/characters' }
];

@NgModule({
    declarations: [ CreateCharacterComponent ],
    imports: [ CommonModule, FormsModule, RouterModule.forChild(createRoutes) ],
    exports: [ RouterModule ]
})
export class CreateCharacterModule {}
