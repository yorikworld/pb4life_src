import {Component, OnInit} from '@angular/core';
import {Post} from '../post';
import {PostsService} from '../posts.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css'],
    providers: [PostsService]
})
export class PostListComponent implements OnInit {

    posts: Post[];
    latestPosts: Post[];
    categories: Array<any>;
    public myInterval: number = 5000;
    public noWrapSlides: boolean = false;
    public activeSlideIndex: number;
    public noPause: boolean;

    constructor(private postsService: PostsService, private router: Router) {
        this.posts = [{thumbnail: '', title: {rendered: ''}}];
        this.latestPosts = [{thumbnail: '', title: {rendered: ''}}];
    }

    getPosts() {
        this.postsService
            .getPosts()
            .subscribe(res => {
                this.posts = res;
                this.getPostsByCategories();
            });
    }

    getPostsNumber(number) {
        this.postsService
            .getPostsNumber(number)
            .subscribe(res => {
                this.latestPosts = res;
                console.log(res);
            })
    }

    getAllCategories() {
        this.postsService
            .getAllCategories()
            .subscribe(res => {
                this.categories = res;
            })
    }

    getPostsByCategories(){
        this.posts.forEach(function (item, index, array) {
            console.log(item['categories']);
            if(item['categories']){
                item['categories'].forEach(function (cat) {
                    console.log(cat);
                });
            }

            // if(item.slug === 'uncategorized'){
            //     array.splice(item, 1);
            // }
        });
    }

    ngOnInit() {
        this.getPosts();
        this.getPostsNumber(4);
        this.getAllCategories();
    }

    ngAfterViewInit() {
        this.noPause = true;
    }

    selectPost(slug) {
        this.router.navigate([slug]);
    }

}
