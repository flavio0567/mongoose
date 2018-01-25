import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RecipieComponent } from './recipie/recipie.component';
import { RecipieDashboardComponent } from './recipie/recipie-dashboard/recipie-dashboard.component';
import { RecipieNewComponent } from './recipie/recipie-new/recipie-new.component';
import { RecipieEditComponent } from './recipie/recipie-edit/recipie-edit.component';

import { FormsModule } from '@angular/forms'; 
import { HttpModule } from '@angular/http';
import { RecipieService } from './recipie/recipie.service';
import { PageNotFoundComponent } from './recipie/page-not-found/page-not-found.component';
import { RecipieShowComponent } from './recipie/recipie-show/recipie-show.component';


@NgModule({
  declarations: [
    AppComponent,
    RecipieComponent,
    RecipieDashboardComponent,
    RecipieNewComponent,
    RecipieEditComponent,
    PageNotFoundComponent,
    RecipieShowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [RecipieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
