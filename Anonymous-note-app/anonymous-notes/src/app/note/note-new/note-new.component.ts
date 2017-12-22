import { Component, OnInit } from '@angular/core';
import { NoteService } from '../note.service';
import { Note } from '../note';

@Component({
  selector: 'app-note-new',
  templateUrl: './note-new.component.html',
  styleUrls: ['./note-new.component.css']
})
export class NoteNewComponent implements OnInit {
  newNote: Note = new Note();

  constructor(private _noteService: NoteService) { }

  
  ngOnInit() {
  }

  onSubmit(note: Note){
    this._noteService.createNote(this.newNote);
    this.newNote = new Note();   
  }

}
