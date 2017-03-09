import { BrowserModule } from '@angular/platform-browser';
import {NgModule, ViewContainerRef} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { Wpng2RoutingModule } from './app-routing.module';
import { PostSingleComponent } from './posts/post-single/post-single.component';
import { HeaderComponent } from './components/header/header.component';
import { CarouselModule } from 'ng2-bootstrap';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { ContactComponent } from './pages/contact/contact.component';
import { PageComponent } from './pages/page/page.component';
import { Page404Component } from './pages/page404/page404.component';
import { FooterComponent } from './components/footer/footer.component';
import { VkComponent } from './shared/vk.comments.component';
import { SocialShareComponent } from './shared/social-share.component';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostSingleComponent,
    HeaderComponent,
    ContactComponent,
    PageComponent,
    Page404Component,
    FooterComponent,
    FooterComponent,
    VkComponent,
    SocialShareComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Wpng2RoutingModule,
    ToastModule,
    CarouselModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
