import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PostListComponent} from './posts/post-list/post-list.component';
import {PostSingleComponent} from './posts/post-single/post-single.component';
import {Page404Component} from "./pages/page404/page404.component";
import {ContactComponent} from "./pages/contact/contact.component";
import {CategoryComponent} from "./pages/category/category.component";
import {TagComponent} from "./pages/tag/tag.component";

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
    path: 'category/:categorySlug',
    component: CategoryComponent
  },
  {
    path: 'category/:categorySlug/page/:pageNumber',
    component: CategoryComponent,
  },
  {
    path: 'tag/:tagSlug',
    component: TagComponent,
  },
  {
    path: 'tag/:tagSlug/page/:pageNumber',
    component: TagComponent,
  },
  {
    path: 'page/404',
    component: Page404Component,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'page/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule {
}
