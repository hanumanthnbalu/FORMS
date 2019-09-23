import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { TabsComponent } from './tabs/tabs.component';
import { ListComponent } from './list/list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReactiveFormComponent } from './forms/reactive-form/reactive-form.component';
import { TempDrivenFormComponent } from './forms/temp-driven-form/temp-driven-form.component';

const route = [
	{ path: '', redirectTo: '/characters/all', pathMatch: 'full' },
	{
		path: 'characters',
		component: TabsComponent,
		children: [ { path: '', redirectTo: 'all', pathMatch: 'full' }, { path: ':side', component: ListComponent } ]
	},
  { path: 'new-character', loadChildren: './create-character/create-charcter.module#CreateCharacterModule' },
  // { path: 'forms', loadChildren: '../app/forms/formsrouting.module#FormRoutingModule' },
  { path: 'forms/template', component: TempDrivenFormComponent },
  { path: 'forms/reactive', component: ReactiveFormComponent },
	{ path: '**', component: NotFoundComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(route) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
