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

    mostViewedPosts: Post[];
    latestPosts: Post[];
    public myInterval: number = 5000;
    public noWrapSlides: boolean = false;
    public activeSlideIndex: number;
    public noPause: boolean;

    constructor(private postsService: PostsService, private router: Router) {
        this.mostViewedPosts = [{thumbnail: '', title: {rendered: ''}}];
        this.latestPosts = [{thumbnail: '', title: {rendered: ''}}];
    }

    getPosts() {
        this.postsService
            .getPosts()
            .subscribe(res => {
                this.mostViewedPosts = res;
            });
    }

    getPostsNumber(number){
        this.postsService
            .getPostsNumber(number)
            .subscribe(res => {
                this.latestPosts = res;
                console.log(res);
            })
    }

    ngOnInit() {
        this.getPosts();
        this.getPostsNumber(4);
    }

    ngAfterViewInit(){
        this.noPause = true;
    }

    selectPost(slug) {
        this.router.navigate([slug]);
    }

}
