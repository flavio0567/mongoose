import { Component, OnInit, Input } from '@angular/core';
import { RecipieService } from '../recipie.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Recipie } from '../recipie';

@Component({
  selector: 'app-recipie-edit',
  templateUrl: './recipie-edit.component.html',
  styleUrls: ['./recipie-edit.component.css']
})
export class RecipieEditComponent implements OnInit {
  // subData: any = [];
  recipieName;
  user;
  id;

  newIngredient = {
    id: String,
    ingredient: String
  };

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
    this.recipie.name = this._recipieService.recipie.name; 
    this.getRecipie();
  };

  getRecipie(){
    this._route.paramMap.subscribe(params => {
      this._recipieService.getRecipieById(params.get('id'), (res) => {
        this.recipie = res;
      });
    });
  }
  createIngredient(createForm) {
    this.newIngredient.id = this.recipie['_id'];
    this.newIngredient.ingredient = createForm.value;
    this._recipieService.updateRecipie(this.newIngredient, (res) => {
    this.recipie = res;
    this.getRecipie();
    });
  }
}
