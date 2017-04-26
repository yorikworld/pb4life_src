import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Post} from '../post';
import {PostsService} from '../posts.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {VkComponent} from '../../shared/vk.comments.component';
import {environment} from "../../../environments/environment";
import {isUndefined} from "util";
// declare var jQuery: any;

@Component({
  selector: 'app-post-single',
  templateUrl: './post-single.component.html',
  styleUrls: ['./post-single.component.css'],
  providers: [PostsService, VkComponent]
})
export class PostSingleComponent implements OnInit, AfterViewInit {

  post: Post;
  author: any;
  date_gmt: string = '';
  public vkApi: any;
  public DEPLOY_PATH: string;

  constructor(private postsService: PostsService, private activeRoute: ActivatedRoute,
              private router: Router,
              private location: Location, vkComponent: VkComponent) {
    this.vkApi = vkComponent.init();
    this.DEPLOY_PATH = environment.DEPLOY_PATH;
  }

  ngAfterViewInit() {
  }

  getPost(slug) {
    this.postsService
        .getPost(slug)
        .subscribe(res => {
          if (isUndefined(res[0]))
            document.location.href = 'page/404';
          this.post = res[0];
          this.postsService.setViewCountPlusOne(this.post['id'])
              .subscribe(res => {
                if (!res)
                  console.log('update post count is fail');
              });
          this.getNormTime(this.post['date_gmt']);
          if (!this.post)
            this.location.go('/404');
          this.getAuthor();
        });
  }

  ngOnInit() {
    this.activeRoute.params.forEach((params: Params) => {
      let slug = params['slug'];
      this.getPost(slug);
    });
  }

  getAuthor() {
    this.postsService
        .getAuthor(this.post['author'])
        .subscribe(res => {
          this.author = res['name'];
        });
  }

  getNormTime(date_gmt) {
    let d = new Date(date_gmt);
    this.date_gmt = d.getUTCHours() + '.' + d.getMinutes();
  }
}
