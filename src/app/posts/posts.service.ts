import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import {Post} from './post';
import {environment} from "../../environments/environment";

@Injectable()
export class PostsService {

    private _wpBase: string ;

    constructor(private http: Http) {
        this._wpBase = environment.host;
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

    getPostsByCategory(postsCount: number, categoryId: number){
        return this.http
            .get(this._wpBase + `posts?categories=${categoryId}&per_page=${postsCount}`)
            .map((res: Response) => res.json());
    }

    getAuthor(id): Observable<Post> {

        // console.log(id);

        return this.http
            .get(this._wpBase + 'users/'+id)
            .map((res: Response) => res.json());
    }

}
