import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostSingleComponent } from './posts/post-single/post-single.component';
import {PageComponent} from "./pages/page/page.component";
import {Page404Component} from "./pages/page404/page404.component";
import {ContactComponent} from "./pages/contact/contact.component";

const routes: Routes = [
  {
    path: '',
    component: PostListComponent,
    pathMatch: 'full'
  },
  {
    path: ':slug',
    component: PostSingleComponent
  },
  {
    path: 'page/contact',
    component: ContactComponent
  },
  {
    path: '404',
    component: Page404Component
  },
  {
      path: '**',
      redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class Wpng2RoutingModule { }
