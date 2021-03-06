import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { TabsComponent } from './tabs/tabs.component';
import { ListComponent } from './list/list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ItemComponent } from './item/item.component';
import { StarWarsService } from './star-wars.service';
import { LogService } from './log.service';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TempDrivenFormComponent } from './forms/temp-driven-form/temp-driven-form.component';
import { ReactiveFormComponent } from './forms/reactive-form/reactive-form.component';
import { ArrayformsComponent } from './forms/arrayforms/arrayforms.component';
// import { FormRoutingModule } from './forms/formsrouting.module';

@NgModule({
	declarations: [
		AppComponent,
		TabsComponent,
		ListComponent,
		ItemComponent,
		HeaderComponent,
    NotFoundComponent,
    ArrayformsComponent,
    TempDrivenFormComponent,
    ReactiveFormComponent
	],
  imports: [ BrowserModule,
             FormsModule,
             HttpClientModule,
             AppRoutingModule,
             ReactiveFormsModule ],
	providers: [ StarWarsService, LogService ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
