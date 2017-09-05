import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {PostListComponent} from './posts/post-list/post-list.component';
import {RoutingModule} from './app-routing.module';
import {PostSingleComponent} from './posts/post-single/post-single.component';
import {HeaderComponent} from './components/header/header.component';
import {CarouselModule} from 'ngx-bootstrap';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {ContactComponent} from './pages/contact/contact.component';
import {Page404Component} from './pages/page404/page404.component';
import {FooterComponent} from './components/footer/footer.component';
import {VkComponent} from './shared/vk.comments.component';
import {SocialShareComponent} from './shared/social-share.component';
import { CategoryComponent } from './pages/category/category.component';
import { RecommendedComponent } from './components/recommended/recommended.component';
import { RecentComponent } from './components/recent/recent.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {NgxPaginationModule} from 'ngx-pagination';
import { TagsComponent } from './components/tags/tags.component';
import {PostsService} from 'app/posts/posts.service';
import { TagComponent } from './pages/tag/tag.component';
import {DisqusModule} from "ngx-disqus";

@NgModule({
    declarations: [
        AppComponent,
        PostListComponent,
        PostSingleComponent,
        HeaderComponent,
        ContactComponent,
        Page404Component,
        FooterComponent,
        FooterComponent,
        VkComponent,
        SocialShareComponent,
        CategoryComponent,
        RecommendedComponent,
        RecentComponent,
        TagsComponent,
        TagComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RoutingModule,
        PaginationModule,
        NgxPaginationModule,
        ToastModule.forRoot(),
        CarouselModule.forRoot(),
        DisqusModule.forRoot('pb4life')
    ],
    providers: [PostsService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
