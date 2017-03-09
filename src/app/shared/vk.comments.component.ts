import {Component, OnInit, AfterContentInit, ElementRef} from '@angular/core';

@Component({
  selector: 'vkcomments',
  template: '<div id="vk_comments"></div>'
})
export class VkComponent implements OnInit, AfterContentInit {

  constructor(private elementRef:ElementRef) {};

  ngOnInit() {
  }

  ngAfterContentInit() {
    let s = document.createElement("script");
    s.type = "text/javascript";
    s.innerText = "VK.Widgets.Comments('vk_comments', {limit: 10, width: '', attach: '*'}, location.href);";
    this.elementRef.nativeElement.appendChild(s);
  }
}
