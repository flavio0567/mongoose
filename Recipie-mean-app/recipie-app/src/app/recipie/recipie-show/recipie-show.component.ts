import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RecipieService } from '../recipie.service';
import { ActivatedRoute } from '@angular/router';
import { Recipie } from '../recipie'

@Component({
  selector: 'app-recipie-show',
  templateUrl: './recipie-show.component.html',
  styleUrls: ['./recipie-show.component.css']
})
export class RecipieShowComponent implements OnInit {
  user;
  likes;

  recipie = {
    name: String,
    user: String,
    likes: Number,
    ingredients: [{
      ingredient: String,
      amount: String }]
  };

  constructor(
    private _recipieService: RecipieService, 
    private _router: Router, 
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.user = this._recipieService.recipie.user; 
    this._route.paramMap.subscribe(params => {
      this._recipieService.getRecipieById(params.get('id'), (res) => {
        this.recipie = res;
        console.log('recipie on show: ', this.recipie);
        this.likes = this.recipie.likes; 
      });
    });
  }

  edit(id) {
      this._recipieService.getRecipieById(id, (recipie) => {
        this.recipie = recipie;
        console.log('recipie on show edit: ', this.recipie);
        this._router.navigate(['/recipie/update'], id);
        // this._router.navigate(['/recipie/update'],  { queryParams: this.recipie });
    });
  }

  
}
