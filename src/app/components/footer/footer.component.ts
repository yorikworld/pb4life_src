import { Component, OnInit } from '@angular/core';
import {PostsService} from "../../posts/posts.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  tags: Array<Object>;

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.postsService.tags$.subscribe(res => {
      this.tags = res;
    });
  }

}
