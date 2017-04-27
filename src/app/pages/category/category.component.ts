import {Component, OnInit} from '@angular/core';
import {PostsService} from 'app/posts/posts.service';
import {ActivatedRoute, Params} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [PostsService]
})
export class CategoryComponent implements OnInit {

  categorySlug: string;
  categoryId: number;
  categoryName: any;
  posts: Array<{}>;
  show: boolean;
  DEPLOY_PATH: string;

  constructor(private postsService: PostsService, private route: ActivatedRoute) {
    this.route.params.forEach((params: Params) => {
      this.categorySlug = params['categorySlug'];
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

  getPosts(){
    this.postsService.getPostsByCategory(10, this.categoryId)
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
