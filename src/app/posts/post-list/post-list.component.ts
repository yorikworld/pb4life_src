import {
  Component,
  OnInit,
  ViewContainerRef,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import {Post} from '../post';
import {PostsService} from '../posts.service';
import {Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {VkComponent} from '../../shared/vk.comments.component';
import {environment} from 'environments/environment'
import {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  providers: [ToastsManager, VkComponent]
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  postsSubscription: Subscription;
  popularPosts: Post[];
  latestPosts: Post[];
  categories: Array<any>;
  categoriesSubscriber: Subscription;
  public postsByCat: Array<any>;
  public myInterval: number = 5000;
  public noWrapSlides: boolean = false;
  public activeSlideIndex: number = 0;
  public noPause: boolean = false;
  public vkApi: any;
  public DEPLOY_PATH: string;

  constructor(private postsService: PostsService, private router: Router,
              public toastr: ToastsManager, vcr: ViewContainerRef,
              private elementRef: ElementRef, private vkComponent: VkComponent) {
    this.toastr.setRootViewContainerRef(vcr);
    // this.posts = [{better_featured_image:{media_details:{sizes: {carousel:{source_url: ''}}}}, title: {rendered: ''}}];
    this.popularPosts = [{thumbnail: '', title: {rendered: ''}}];
    this.latestPosts = [{thumbnail: '', title: {rendered: ''}}];
    this.postsByCat = [];
    // this.vkApi = vkComponent.init();
    this.DEPLOY_PATH = environment.DEPLOY_PATH;
  }

  ngOnInit() {
    this.postsSubscription = this.postsService.posts$.subscribe(res => {
      this.posts = res;
      this.popularPosts = [].concat(this.posts);
      console.log(this.popularPosts);
      this.getPopularPosts();
    });

    this.getPostsNumber(4);
    this.categoriesSubscriber = this.postsService.categories$.subscribe(res => {
      this.categories = res;
      this.getPostsByCategories();
    });
  }

  toSingle(currentCategorySlug) {
    // this.postsService.currentCategory$ = currentCategorySlug;
  }

  // getPosts() {
  //   this.postsService
  //       .getPosts()
  //       .subscribe(res => {
  //         this.posts = res;
  //
  //       });
  // }

  getPopularPosts() {
    // if (!this.popularPosts) {
    //   return [];
    // }
    this.popularPosts.sort((a, b) => {
      return a['acf']['views_count'] - b['acf']['views_count'];
    });
    this.popularPosts.reverse();
    this.popularPosts = this.popularPosts.slice(0, 5);
  }

  getPostsNumber(number) {
    this.postsService
        .getPostsNumber(number)
        .subscribe(res => {
          this.latestPosts = res;
        })
  }

  getPostsByCategory(count, catId) { //create array of 4 posts for category id
    this.postsService
        .getPostsByCategory(count, catId)
        .subscribe(res => {
          res['currentCat'] = this.postsService.searchCategoryProperty('name', 'id', catId);
          res['currentCatSlug'] = this.postsService.searchCategoryProperty('slug', 'id', catId);
          res.forEach((item) => {
            item['date_gmt'] = this.postsService.getNormDate(item.date_gmt);
//            this.postsService.getCommentsCount(item.slug, item.id, this.vkApi);
          });
          this.postsByCat.push(res);
        });
  }

  getPostsByCategories() {
    this.categories.forEach((item, index, array) => {
      if (item.slug === 'uncategorized') {
        this.categories.splice(index, 0);
      } else {
        this.getPostsByCategory(4, item.id);
      }
    });
  }

  getThumbnail(post, thumbnail){
    return this.postsService.getThumbnail(post, thumbnail);
  }

  ngOnDestroy() {
    this.categoriesSubscriber.unsubscribe();
    this.postsSubscription.unsubscribe();
    delete this.popularPosts;
  }

  // checkParity(i) {
  //   if (i & 1) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

}
