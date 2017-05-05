import {Component, OnInit, OnDestroy} from '@angular/core';
import {PostsService} from 'app/posts/posts.service';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  categories: Array<{}>;
  categoriesSubscriber: Subscription;

  constructor(private postService: PostsService) {
  }

  ngOnInit() {
    this.categoriesSubscriber = this.postService.categories$.subscribe(x => {
      this.categories = x;
    });
  }

  ngOnDestroy() {
    this.categoriesSubscriber.unsubscribe();
  }

}
