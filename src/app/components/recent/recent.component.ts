import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.css']
})
export class RecentComponent implements OnInit {
  public DEPLOY_PATH: string;

  constructor() {
    this.DEPLOY_PATH = environment.DEPLOY_PATH;
  }

  ngOnInit() {
  }

}
