import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Post} from '../post';
import {PostsService} from '../posts.service';
import {Router} from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css'],
    providers: [PostsService, ToastsManager]
})
export class PostListComponent implements OnInit {

    posts: Post[];
    latestPosts: Post[];
    categories: Array<any>;
    public postsByCat: Array<any>;
    public myInterval: number = 5000;
    public noWrapSlides: boolean = false;
    public activeSlideIndex: number;
    public noPause: boolean;
    public date_gmt: string;

    constructor(private postsService: PostsService, private router: Router,
                public toastr: ToastsManager, vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
        this.posts = [{thumbnail: '', title: {rendered: ''}}];
        this.latestPosts = [{thumbnail: '', title: {rendered: ''}}];
        this.postsByCat = [];
    }

    getPosts() {
        this.postsService
            .getPosts()
            .subscribe(res => {
                this.posts = res;
            });
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
                this.postsByCat.push(res);
            });
    }

    getPostsByCategories() {
        let that = this;
        this.categories.forEach(function (item, index, array) {
            if (item.slug === 'uncategorized') {
                that.categories.splice(index,0);
            }else{
                that.getPostsByCategory(4, item.id);
            }
        });
    }

    getCategoryNameById(catId){
        let result = '';
        this.categories.forEach(function (item) {
            if(item.id == catId){
                result = item.name;
            }
        });
        return result;
    }

    getNormDate(date_gmt){
        let d = new Date(date_gmt);
        // this.date_gmt = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
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

    selectPost(slug) {
        this.router.navigate([slug]);
    }

    checkParity(i){
        if ( i & 1 ) {
            return false;
        } else {
            return true;
        }

    }

}
