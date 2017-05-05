import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import {Post} from './post';
import {environment} from "../../environments/environment";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {isUndefined} from "util";

@Injectable()
export class PostsService {

  private _wpBase: string;
  private _host: string;
  private _prod: boolean;
  private DEPLOY_PATH: string;
  private recommendedPosts: Array<{}>;
  private categories: BehaviorSubject<Array<{}>>;
  private posts: BehaviorSubject<Post[]>;
  private currentCategory: BehaviorSubject<string>;
  private tags: BehaviorSubject<Array<Object>>;

  constructor(private http: Http) {
    console.log('!!!');
    this._wpBase = environment.api;
    this._host = environment.host;
    this._prod = environment.production;
    this.DEPLOY_PATH = environment.DEPLOY_PATH;
    this.recommendedPosts = [];
    this.categories = new BehaviorSubject([]);
    this.categories$ = this.getAllCategories();
    this.posts = new BehaviorSubject([]);
    this.posts$ = this.getPosts();
    this.currentCategory = new BehaviorSubject('');
    this.tags$ = this.getAllTags();
    this.tags = new BehaviorSubject([]);
  }

  get posts$(): Observable<any> {
    return this.posts.asObservable();
  }

  set posts$(res: Observable<any>) {
    res.subscribe(x => {
      this.posts.next(x);
    });
  }

  get tags$(): Observable<any> {
    return this.tags.asObservable();
  }

  set tags$(res: Observable<any>) {
    res.subscribe(x => {
      this.tags.next(x);
    });
  }

  get recommendedPosts$(): Post[] {
    return this.recommendedPosts;
  }

  get categories$(): Observable<any> {
    return this.categories.asObservable();
  }

  set categories$(res: Observable<any>) {
    res.subscribe(x => {
      this.categories.next(x);
    })
  }

  // get currentCategory$() {
  //   return this.currentCategory.asObservable();
  // }
  //
  // set currentCategory$(res: any){
  //   // console.log('!!!');
  //   // res.subscribe(x => {
  //     this.currentCategory.next(res);
  //   // });
  // }


  pushRecommendedPosts(res) {
    res.forEach(item => {
      if (item['acf']['we_recommended']) {
        if (this.recommendedPosts.length < 5) {
          this.recommendedPosts.push(item);
          this.recommendedPosts.reverse();
        }
      }
    });
    return res
  }

  // pushPopularPosts(res){
  //
  //   return res;
  // }

  setDefaultThumbnail(res) {
    res.forEach(item => {
      if (!item['thumbnail'])
        item['thumbnail'] = this.DEPLOY_PATH + 'assets/images/NoImage.jpg';
    });
    return res;
  }

  private getPosts(): Observable<Post[]> {
    //TODO: возможно не стоит всегда брать все посты? А возможно стоит :)
    return this.http
        .get(this._wpBase + 'posts')
        .map((res: Response) => res.json())
        .map((res: Response) => this.setDefaultThumbnail(res))
        .map((res: Response) => this.pushRecommendedPosts(res));
  }

  getPost(slug): Observable<Post> {

    return this.http
        .get(this._wpBase + `posts?slug=${slug}`)
        .map((res: Response) => res.json())
        .map((res: Response) => this.setDefaultThumbnail(res));
  }

  getPostsNumber(number): Observable<Post[]> {

    return this.http
        .get(this._wpBase + `posts?per_page=${number}`)
        .map((res: Response) => res.json())
        .map((res: Response) => this.setDefaultThumbnail(res));
  }

  private getAllCategories(): Observable<Post[]> {

    return this.http
        .get(this._wpBase + 'categories')
        .map((res: Response) => res.json());
  }

  getPostsByCategory(postsCount: number, categoryId: number) {
    let query = `posts?categories=${categoryId}&per_page=${postsCount}`;
    if (postsCount === -1)
      query = `posts?categories=${categoryId}`;
    return this.http
        .get(this._wpBase + query)
        .map((res: Response) => res.json())
        .map((res: Response) => this.setDefaultThumbnail(res))
  }

  getPostsByTagId(tagId): Observable<any> {

    return this.http
        .get(this._wpBase + `posts?tags[]=${tagId}`)
        .map((res: Response) => res.json())
        .map((res: Response) => this.setDefaultThumbnail(res));
  }

  // getTagIdByTagName(tagSlug){
  //   this.tags$.subscribe(res => {
  //     res.map(x =>{
  //       if(x[])
  //       console.log(x);
  //     });
  //   })
  // }

  getNormDate(date_gmt) {
    let d = new Date(date_gmt);
    return d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
  }

  getAuthor(id): Observable<Post> {

    return this.http
        .get(this._wpBase + 'users/' + id)
        .map((res: Response) => res.json());
  }

  getAllTags(): Observable<Array<Object>> {

    return this.http
        .get(this._wpBase + 'tags')
        .map((res: Response) => res.json());
  }

  setViewCountPlusOne(id): Observable<any> {
    //TODO: add nonce check to this request.
    return this.http
        .get(this._host + 'wp-admin/admin-ajax.php?action=post_view_count&id=' + id)
  }

  searchCategoryProperty(whatSearch: string, byWhat: string, byWhatValue: string) {
    // search "whatSearch" by "byWhat" in categories. byWhatValue - value of search.
    let result = '';
    this.categories$
        .subscribe(res => {
          res.forEach((item) => {
            if (item[byWhat] == byWhatValue) {
              return result = item['' + whatSearch + ''];
            }
          });
        });
    return result;
  }

  getCommentsCount(slug, id, vkApi) {

    if (this._prod) {

      let promise = new Promise(function (resolve, reject) {
        vkApi.Api.call('widgets.getComments',
            {widget_api_id: '5900450', page_id: 'http://pb4life.in.ua/' + slug},
            (obj) => {
              if (obj.response['count'])
                resolve(obj.response['count']);
              else
                reject(obj.error);
            });
      });

      promise
          .then(
              res => {
                let el = document.getElementsByClassName('vk_count_' + id);
                for (let i = 0; i < el.length; i++) {
                  document.getElementsByClassName('vk_count_' + id)[i]['innerText'] = 'Коментарии: ' + res;
                }
              }
          )
          .catch(err => console.log(err));
    }
  }

  goTo404(): void {
    document.location.href = 'page/404';
  }
}
