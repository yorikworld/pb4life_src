import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {Post} from '../post';
import {PostsService} from '../posts.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {VkComponent} from '../../shared/vk.comments.component';
import {environment} from "../../../environments/environment";
import {isUndefined} from "util";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-post-single',
  templateUrl: './post-single.component.html',
  styleUrls: ['./post-single.component.css'],
  providers: [VkComponent]
})
export class PostSingleComponent implements OnInit, AfterViewInit, OnDestroy {

  post: Post;
  author: any;
  date_gmt: string = '';
  public vkApi: any;
  public DEPLOY_PATH: string;
  public _host: string;
  private currentCategory: string;
  private currentCategorySubscription: Subscription;
  public slug: string;

  constructor(private postsService: PostsService, private activeRoute: ActivatedRoute,
              private router: Router,
              private location: Location, vkComponent: VkComponent) {
    // this.vkApi = vkComponent.init();
    this.DEPLOY_PATH = environment.DEPLOY_PATH;
    this._host = environment.host;
  }

  ngAfterViewInit() {
  }

  getPost(slug) {
    this.postsService
        .getPost(slug)
        .subscribe(res => {
          if (isUndefined(res[0]))
            this.postsService.goTo404();
          this.post = res[0];
          this.postsService.setViewCountPlusOne(this.post['id'])
              .subscribe(res => {
                if (!res)
                  console.log('update post count is fail');
              });
          this.getNormTime(this.post['date_gmt']);
          this.getAuthor();
        });
  }

  ngOnInit() {
    // this.currentCategorySubscription = this.postsService.currentCategory$.subscribe(x => {
    //   this.currentCategory = x;
    //   console.log(this.currentCategory);
    // });
    this.activeRoute.params.forEach((params: Params) => {
      this.slug = params['slug'];
      this.getPost(this.slug);
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

  ngOnDestroy() {
    // this.currentCategorySubscription.unsubscribe();
  }

  getThumbnail(post, thumbnail){
    return this.postsService.getThumbnail(post, thumbnail);
  }
}
