import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipieComponent  } from './recipie/recipie.component';
import { RecipieNewComponent  } from './recipie/recipie-new/recipie-new.component';
import { RecipieDashboardComponent } from './recipie/recipie-dashboard/recipie-dashboard.component';
import { RecipieEditComponent } from './recipie/recipie-edit/recipie-edit.component';
import { RecipieShowComponent } from './recipie/recipie-show/recipie-show.component';
import { PageNotFoundComponent } from './recipie/page-not-found/page-not-found.component'


const routes: Routes = [
  { 
    path: '',
    component: RecipieComponent,
    pathMatch: 'full'
  },
  {
    path: 'all',
    component: RecipieDashboardComponent,
    pathMatch: 'full',
    data: { title: 'Recipies' }
  },
  { 
    path: 'new',
    component: RecipieNewComponent,
    pathMatch: 'full'
  },
  { 
    path: 'recipie/update/:id',
    component: RecipieEditComponent,
    pathMatch: 'full'
  },
  { 
    path: 'recipie/:id',
    component: RecipieShowComponent,
    pathMatch: 'full'
  },
  { 
    path: 'reset',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
