import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import {Post} from './post';
import {environment} from "../../environments/environment";

@Injectable()
export class PostsService {

  private _wpBase: string;
  private _host: string;
  private _prod: boolean;

  constructor(private http: Http) {
    this._wpBase = environment.api;
    this._host = environment.host;
    this._prod = environment.production;
  }

  getPosts(): Observable<Post[]> {

    return this.http
        .get(this._wpBase + 'posts')
        .map((res: Response) => res.json());

  }

  getPost(slug): Observable<Post> {

    return this.http
        .get(this._wpBase + `posts?slug=${slug}`)
        .map((res: Response) => res.json());

  }

  getPostsNumber(number): Observable<Post[]> {

    return this.http
        .get(this._wpBase + `posts?per_page=${number}`)
        .map((res: Response) => res.json());
  }

  getAllCategories(): Observable<Post[]> {

    return this.http
        .get(this._wpBase + 'categories')
        .map((res: Response) => res.json());
  }

  getPostsByCategory(postsCount: number, categoryId: number) {
    return this.http
        .get(this._wpBase + `posts?categories=${categoryId}&per_page=${postsCount}`)
        .map((res: Response) => res.json());
  }

  getAuthor(id): Observable<Post> {

    return this.http
        .get(this._wpBase + 'users/' + id)
        .map((res: Response) => res.json());
  }

  setViewCountPlusOne(id): Observable<any> {
    //TODO: add nonce check to this request.
    console.log(id);
    return this.http
        .get(this._host + 'wp-admin/admin-ajax.php?action=post_view_count&id='+id)

  }

  getCommentsCount(slug, id, vkApi) {

    if (this._prod) {

      let promise = new Promise(function (resolve, reject) {
        vkApi.Api.call('widgets.getComments',
            {widget_api_id: '5900450', page_id: 'http://pb4life.in.ua/' + slug},
            function (obj) {
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


}
