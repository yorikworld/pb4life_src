import {Component, OnInit, ViewContainerRef, ElementRef, AfterContentInit, AfterViewInit} from '@angular/core';
import {Post} from '../post';
import {PostsService} from '../posts.service';
import {Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {VkComponent} from '../../shared/vk.comments.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  providers: [PostsService, ToastsManager, VkComponent]
})
export class PostListComponent implements OnInit, AfterContentInit, AfterViewInit {

  posts: Post[];
  popularPosts: Post[];
  latestPosts: Post[];
  categories: Array<any>;
  public postsByCat: Array<any>;
  public myInterval: number = 5000;
  public noWrapSlides: boolean = false;
  public activeSlideIndex: number;
  public noPause: boolean;
  public vkApi: any;

  constructor(private postsService: PostsService, private router: Router,
              public toastr: ToastsManager, vcr: ViewContainerRef,
              private elementRef: ElementRef, private vkComponent: VkComponent) {
    this.toastr.setRootViewContainerRef(vcr);
    this.posts = [{thumbnail: '', title: {rendered: ''}}];
    this.popularPosts = [{thumbnail: '', title: {rendered: ''}}];
    this.latestPosts = [{thumbnail: '', title: {rendered: ''}}];
    this.postsByCat = [];
    this.vkApi = vkComponent.init();
  }

  getPosts() {
    this.postsService
        .getPosts()
        .subscribe(res => {
          this.posts = res;
          this.popularPosts = [].concat(this.posts);
          this.getPopularPosts();
        });
  }

  getPopularPosts(): Post[] {
    if (!this.popularPosts) {
      return [];
    }
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

  getAllCategories() {
    this.postsService
        .getAllCategories()
        .subscribe(res => {
          this.categories = res;
          this.getPostsByCategories();
          // console.log(this.postsByCat);
          // this.toastr.success('You are awesome!', 'Success!');
        })
  }


  getPostsByCategory(count, catId) {
    this.postsService
        .getPostsByCategory(count, catId)
        .subscribe(res => {
          res['currentCat'] = this.getCategoryNameById(catId);
          res.forEach((item) => {
            item['date_gmt'] = this.getNormDate(item.date_gmt);
            this.postsService.getCommentsCount(item.slug, item.id, this.vkApi);
          });
          this.postsByCat.push(res);
        });
  }

  getPostsByCategories() {
    let that = this;
    this.categories.forEach(function (item, index, array) {
      if (item.slug === 'uncategorized') {
        that.categories.splice(index, 0);
      } else {
        that.getPostsByCategory(4, item.id);
      }
    });
  }

  getCategoryNameById(catId) {
    let result = '';
    this.categories.forEach(function (item) {
      if (item.id == catId) {
        result = item.name;
      }
    });
    return result;
  }

  getNormDate(date_gmt) {
    let d = new Date(date_gmt);
    return d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
  }

  ngOnInit() {
    this.getPosts();
    this.getPostsNumber(4);
    this.getAllCategories();
  }

  ngAfterViewInit() {
    this.noPause = true;
  }

  ngAfterContentInit() {
  }


  // selectPost(slug) {
  //     this.router.navigate([slug]);
  // }

  checkParity(i) {
    if (i & 1) {
      return false;
    } else {
      return true;
    }

  }

}
