import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {ActivatedRoute, Params} from "@angular/router";
import {PostsService} from "../../posts/posts.service";
import {PaginationConfig} from "ngx-bootstrap";
import {Location} from '@angular/common';
//TODO: отсутсвующая категория должна перенаправляться на 404.

@Component({
  selector: 'app-tag',
  templateUrl: '../category/category.component.html',
  styleUrls: ['../category/category.component.css'],
  providers: [PaginationConfig]
})
export class TagComponent implements OnInit {
  DEPLOY_PATH: string;
  page: number;
  tagSlug: string;
  tagId: number;
  posts: Array<Object>;
  show: boolean;
  perPage: number = 5;

  constructor(private postsService: PostsService, private route: ActivatedRoute,
              private location: Location) {
    this.route.params.forEach((params: Params) => {
      this.page = +params['pageNumber'];
      this.tagSlug = params['tagSlug'];
    });
    this.DEPLOY_PATH = environment.DEPLOY_PATH;
  }

  ngOnInit() {
    this.postsService.tags$.subscribe(res => {
      res.map(x => {
        if (x.slug == this.tagSlug) {
          this.tagId = x.id;
          this.postsService.getPostsByTagId(this.tagId)
              .subscribe(res => {
                this.posts = res;
                this.show = !!(this.posts.length);
              });
        }
      });
    });
  }

  pageChanged($event) {
    if ($event.page === 1)
      this.location.go(`tag/${this.tagSlug}`);
    else
      this.location.go(`tag/${this.tagSlug}/page/${$event.page}`);
  }

}
