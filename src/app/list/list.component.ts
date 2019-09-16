import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit , OnDestroy{
  @Input() characters;
  loadedSide = 'all';
  subscription;

  constructor(private route: ActivatedRoute, private swService: StarWarsService) { }

  ngOnInit() {    
    this.route.params.subscribe(
      (params) =>{
        this.characters = this.swService.getCharacters(params.side);
        this.loadedSide = params.side;
      }
    );
    this.subscription = this.swService.charactersChanged.subscribe(() => {
        this.characters = this.swService.getCharacters(this.loadedSide);
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
