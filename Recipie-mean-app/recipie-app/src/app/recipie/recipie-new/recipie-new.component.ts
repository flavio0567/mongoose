import { Component, OnInit } from '@angular/core';
import { RecipieService } from '../recipie.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Recipie } from '../recipie';

@Component({
  selector: 'app-recipie-new',
  templateUrl: './recipie-new.component.html',
  styleUrls: ['./recipie-new.component.css']
})
export class RecipieNewComponent implements OnInit {
  recipieAdded;
  recipieName;
  user;
  id;

  recipie = {
    name: String,
    user: String,
    likes: Number,
    ingredients: {
      ingredient: String,
      amount: String }
  }

  constructor(
      private _recipieService: RecipieService, 
      private _router: Router, 
      private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.user = this._recipieService.recipie.user;
    this.recipie.user = this.user;
    console.log('entrando on new: ', this.user); 
  }

  newRecipie() {
    this.recipie.name = this.recipieName;
    console.log('recipie on new: ', this.recipie); 
    this._recipieService.newRecipie(this.recipie, (res) => {
      this._router.navigate(['/recipie/update', res]);
    });
  };

}
