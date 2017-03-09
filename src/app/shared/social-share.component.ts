import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-social-share',
    templateUrl: './social-share.component.html',
    styleUrls: ['./social-share.component.css']
})
export class SocialShareComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    facebook(purl, ptitle, pimg, text) {
        let url = 'http://www.facebook.com/sharer.php?s=100';
        url += '&p[title]=' + encodeURIComponent(ptitle);
        url += '&p[summary]=' + encodeURIComponent(text);
        url += '&p[url]=' + encodeURIComponent(purl);
        url += '&p[images][0]=' + encodeURIComponent(pimg);
        this.popup(url);
    }

    twitter(purl, ptitle) {
        let url = 'http://twitter.com/share?';
        url += 'text=' + encodeURIComponent(ptitle);
        url += '&url=' + encodeURIComponent(purl);
        url += '&counturl=' + encodeURIComponent(purl);
        this.popup(url);
    }


    popup(url) {
        window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
    }
}
