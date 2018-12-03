import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import Quill from 'quill';

// Add fonts to whitelist
var Font = Quill.import('formats/font');
Font.whitelist = ['mirza', 'aref', 'roboto'];
Quill.register(Font, true);

//import delta
var Delta = Quill.import('delta');
var contentDelta = new Delta();

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
	editorContent = localStorage.getItem('assignment-content');
	pendingSave = false;

	@ViewChild('editor') editor: QuillEditorComponent;
	
	ngOnInit() {
		
		this.editor
      .onContentChanged
      .pipe(
        debounceTime(2000),
        distinctUntilChanged()
      )
      .subscribe(data => {
        //console.log('Debounced content change', data); //data not relevant
        //write to storage & clear delta
        //console.log('Updating in storage', contentDelta);
        contentDelta = new Delta();
        this.pendingSave = false;
        localStorage.setItem('assignment-content', this.editorContent);
      });

	};
	
	notifyChange($event: any) {
    //console.log('Content changed', $event);
    //update contentDelta
    contentDelta = contentDelta.compose($event.delta);
    this.pendingSave = true;
  }

}
