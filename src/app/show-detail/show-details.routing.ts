import {Routes, RouterModule} from "@angular/router";
import {ShowDetailComponent} from "./show-detail.component";
const ShowDetailsRoutes: Routes = [
  {
    path: 'crisis-center',
    component: ShowDetailComponent,
    children: [
      { path: ':id',  component: ShowDetailComponent },
    ]
  }
];

export const crisisCenterRouting = RouterModule.forChild(ShowDetailsRoutes);
