import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {PostsService} from 'app/posts/posts.service';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit, OnDestroy {

  tags: Array<Object>;
  postTags: Array<Object>;
  tagsSubscribe: Subscription;

  @Input('post') post: Object;

  constructor(private postsService: PostsService) {
    this.postTags = [];
  }

  ngOnInit() {
    this.tagsSubscribe = this.postsService.tags$.subscribe(res => {
      this.tags = res;
      this.searchPostTags();
    });
  }

  searchPostTags() {
    if (!this.post['tags'].length)
      this.postTags = [];
    else {
      this.tags.map(x => {
        this.post['tags'].map(y => {
          if (x['id'] === y) {
            x['color'] = x['description'];
            this.postTags.push(x);
          }
        });
      });
    }
  }

  ngOnDestroy() {
    this.tagsSubscribe.unsubscribe();
  }

}
