import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OlMapComponent } from './components/ol-map/ol-map.component';

const routes: Routes = [
  { path: '', redirectTo: 'app-map', pathMatch: 'full' },
  { path: 'ol', component: OlMapComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
