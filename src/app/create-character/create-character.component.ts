import { Component, OnInit } from '@angular/core';
import { StarWarsService } from '../star-wars.service';

@Component({
	selector: 'app-create-character',
	templateUrl: './create-character.component.html',
	styleUrls: [ './create-character.component.scss' ]
})
export class CreateCharacterComponent implements OnInit {
	avialbleSides = [
		{ display: 'None', value: '' },
		{ display: 'Light', value: 'light' },
		{ display: 'Dark', value: 'dark' }
	];
	constructor(private swService: StarWarsService) {}

  ngOnInit() {}
  
	onSubmit(form) {
		if (form.invalid) {
			console.log('invalid');
			return;
		}
		this.swService.addCharacter(form.value.name, form.value.side);
		form.resetForm();
		console.log('Submiited!!', form);
	}
}
