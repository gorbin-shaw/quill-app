import { Component, ViewEncapsulation, ViewChild } from '@angular/core';

import Quill from 'quill';

// Add fonts to whitelist
var Font = Quill.import('formats/font');
Font.whitelist = ['mirza', 'aref', 'roboto'];
Quill.register(Font, true);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
  	'./app.component.css'
  ],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent {
	title = 'Assignment Editor';
	ngOnInit() {
		console.log("ngOnInit");
	};
}
