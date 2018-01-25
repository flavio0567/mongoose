import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RecipieService } from '../recipie.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Recipie } from '../recipie';


@Component({
  selector: 'app-recipie-dashboard',
  templateUrl: './recipie-dashboard.component.html',
  styleUrls: ['./recipie-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RecipieDashboardComponent implements OnInit {
  recipies: Array<Recipie> = [];

  recipie: Recipie[];
  user;

  constructor(private _recipieService: RecipieService, private _router: Router) { }
  
  ngOnInit() {
    this.user = this._recipieService.recipie.user;
    this.retrieveAll();
  }

  newRecipie() {
      this._router.navigate(['/new']);
    }

  retrieveAll(){
    this._recipieService.retrieveAll((res) => {
      this.recipies = res;
    });
  }

  onButtonClick(id) {
    this._recipieService.likeRecipie((id), (res)  => {
        this.recipie = res;
      });
    this.retrieveAll()
    };
 

}
