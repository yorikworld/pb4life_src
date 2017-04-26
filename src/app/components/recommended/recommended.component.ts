import {Component, OnInit} from '@angular/core';
import {Post} from "../../posts/post";
import {PostsService} from 'app/posts/posts.service';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css']
})
export class RecommendedComponent implements OnInit {
  recommendedPosts: Post[];

  constructor(private postsService: PostsService) {
    this.recommendedPosts = this.postsService.recommendedPosts$;
  }

  ngOnInit() {
  }
}
