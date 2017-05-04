import {Component, OnInit} from '@angular/core';
import {PostsService} from 'app/posts/posts.service';
import {ActivatedRoute, Params} from "@angular/router";
import {environment} from "../../../environments/environment";
import {Location} from '@angular/common';
import {PaginationConfig} from "ngx-bootstrap";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [PostsService, PaginationConfig]
})
export class CategoryComponent implements OnInit {

  categorySlug: string;
  categoryId: number;
  categoryName: any;
  posts: Array<{}>;
  show: boolean;
  DEPLOY_PATH: string;
  page: number;
  perPage: number = 5;

  constructor(private postsService: PostsService, private route: ActivatedRoute,
              private location: Location) {
    this.route.params.forEach((params: Params) => {
      this.categorySlug = params['categorySlug'];
      this.page = +params['pageNumber'];
      this.postsService.categories$.subscribe(res => {
        res.forEach((item) => {
          if (item['slug'] == this.categorySlug) {
            this.categoryName = item['name'];
            this.categoryId = item['id'];
            this.getPosts();
          }
        });
      });
    });
    this.DEPLOY_PATH = environment.DEPLOY_PATH;

  }

  ngOnInit() {

  }

  pageChanged($event){
    if($event.page === 1)
      this.location.go(`category/${this.categorySlug}`);
    else
      this.location.go(`category/${this.categorySlug}/page/${$event.page}`);
  }

  getPosts() {
    this.postsService.getPostsByCategory(-1, this.categoryId)
        .subscribe(res => {
          res['currentCat'] = this.categoryName;
          res.forEach((item) => {
            item['date_gmt'] = this.postsService.getNormDate(item.date_gmt);
            // this.postsService.getCommentsCount(item.slug, item.id, this.vkApi);
          });
          this.posts = res;
          this.show = !!(this.posts.length);
        });
  }

}
