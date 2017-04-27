import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.css']
})
export class Page404Component implements OnInit {

  DEPLOY_PATH: string;

  constructor() {
    this.DEPLOY_PATH = environment.DEPLOY_PATH;
  }

  ngOnInit() {
  }

}
