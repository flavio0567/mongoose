import { Component, OnInit } from '@angular/core';
import { RecipieService } from './recipie.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipie',
  templateUrl: './recipie.component.html',
  styleUrls: ['./recipie.component.css']
})
export class RecipieComponent implements OnInit {
  user: String = '';

  constructor(private _recipieService: RecipieService, private _router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this._recipieService.login(this.user, (res) => {
      this._router.navigate(['/all']);
    });
  }
}
