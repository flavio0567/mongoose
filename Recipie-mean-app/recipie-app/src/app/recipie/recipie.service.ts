import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Recipie } from './recipie';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class RecipieService {
  recipieAdded;

  recipies: Array<Recipie> = [];

  constructor(private _http: Http) { }

  recipie = {
    name: String,
    user: String,
    likes: Number,
    ingredients: [{
      ingredient: String,
      amount: String
    }]
  };


  login(user, callback) {
    this.recipie.user = user;
    console.log('LOGIN success: ', this.recipie.user);
    callback(this.recipie);
  }

  retrieveAll(recipies) {
    this._http.get('/all').subscribe(
      (res) => {
        console.log('SUCCESS in getting recipies: ', res.json());
        this.recipies = res.json();
        recipies(res.json());
      },
      (err) => {
        console.log('ERROR in getting recipies: ', err);
      }
    );
  }

  newRecipie(recipie, callback) {
    this._http.post('/new', {recipie: recipie } ).subscribe(
      (res) => {
        console.log('SUCCESS creatting recipie: ',   res.json());
        callback(res.json());
      },
      (err) => {
        console.log('ERROR creatting recipie: ', err);
      }
    );
  }

  getOne(recipie, id) {
    this._http.get('/recipie').subscribe(
    id => id.json());
    console.log('services-recipie in getOne:', id)
  }

  getRecipieById(id, callback) {
    this._http.get('/recipie/' + id ).subscribe(
      (res) => {
        console.log('SUCCESS getting RecipeByID: ', res.json());
        callback(res.json());
      },
      (err) => {
        console.log('ERROR getting RecipieByID: ', err);
      }
    );
  }

  updateRecipie(ingredients, callback) {
    this._http.put('/recipie/update', ingredients).subscribe(
      (res) => {
        console.log('SUCCESS updating recipie: ', res.json());
        callback(res.json());
      },
      (err) => {
        console.log('ERROR updating recipie: ', err);
      }
    );
  }

  likeRecipie(id, callback) {
    this._http.put('/recipie/like/' + id, this.recipie ).subscribe(
      (res) => {
        console.log('SUCCESS Like recipie: ', res.json());
        res.json();
      },
      (err) => {
        console.log('ERROR like recipie: ', err);
      }
    );
  }

}
