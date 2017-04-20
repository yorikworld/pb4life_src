import {Component, OnInit, AfterContentInit, ElementRef} from '@angular/core';

@Component({
  selector: 'vkcomments',
  template: '<div id="vk_comments"></div>'
})
export class VkComponent implements OnInit, AfterContentInit {
  public vkApi: any;

  constructor(private elementRef:ElementRef) {};

  ngOnInit() {
  }

  init(){
    this.vkApi = window['VK'];
    this.vkApi.init({apiId: 5900450, onlyWidgets: true});
    return this.vkApi;
  }

  ngAfterContentInit() {
    let s = document.createElement("script");
    s.type = "text/javascript";
    s.innerText = "VK.Widgets.Comments('vk_comments', {limit: 10, width: '', attach: '*'}, location.href);";
    this.elementRef.nativeElement.appendChild(s);
  }
}
