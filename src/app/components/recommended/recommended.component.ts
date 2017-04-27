import {Component, OnInit} from '@angular/core';
import {Post} from "../../posts/post";
import {PostsService} from 'app/posts/posts.service';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css']
})
export class RecommendedComponent implements OnInit {
  recommendedPosts: Post[];
  DEPLOY_PATH: string;

  constructor(private postsService: PostsService) {
    this.recommendedPosts = this.postsService.recommendedPosts$;
    this.DEPLOY_PATH = environment.DEPLOY_PATH;
  }

  ngOnInit() {
  }
}
