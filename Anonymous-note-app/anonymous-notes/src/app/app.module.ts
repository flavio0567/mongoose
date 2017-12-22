import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NoteComponent } from './note/note.component';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule
import { HttpModule } from '@angular/http'; // <-- Import HttpModule
import { NoteService } from './note/note.service';
import { NoteListComponent } from './note/note-list/note-list.component';
import { NoteNewComponent } from './note/note-new/note-new.component';

@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
    NoteListComponent,
    NoteNewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // <-- Include module in our AppModules
		HttpModule // <-- Include module in our AppModules
  ],
  providers: [NoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
