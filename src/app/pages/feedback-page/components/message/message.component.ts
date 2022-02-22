/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() message: any;
  @Input() isMain = false;

  /*
  {
    "content": "While waiting for dark mode, there are browser extensions that will also do the job. Search for 'dark theme' followed by your browser. There might be a need to turn off the extension for sites with naturally black backgrounds though.",
    "replyingTo": "hummingbird1",
    "user": {
      "image": "./assets/user-images/image-anne.jpg",
      "name": "Anne Valentine",
      "username": "annev1990"
    }
  },
   */

  constructor() { }

  ngOnInit(): void {
    console.log(this.message.replies);
  }

}
