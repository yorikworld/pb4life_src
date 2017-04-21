import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-social-share',
  template: '<div class="ya-share2" data-services="vkontakte,twitter,facebook,gplus" data-counter></div>',
  styles: ['.ya-share2{margin-bottom: 15px;}']
})
export class SocialShareComponent implements OnInit {
//TODO: Проконтролировать одну ссылку для всех соцсетей. В документации написано как конкретно указать страницу. Что бы небыло разницы между http и https.
  constructor() {
  }

  ngOnInit() {
    let el = document.getElementById('yashare-script');
    if (el) {
      el.remove();
    }
    let script = document.createElement('script');
    script.id = 'yashare-script';
    script.src = '//yastatic.net/share2/share.js';
    document.body.appendChild(script);
  }
}
