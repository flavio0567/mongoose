import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Http } from '@angular/http';
import { Note  } from './note';

@Injectable()
export class NoteService {
  notesObserver = new BehaviorSubject([]);

  constructor(private _http: Http) { }

  retrieveAll() {
    this._http.get('/notes').subscribe(
      notes => this.notesObserver.next(notes.json()),
      errorResponse => console.log(errorResponse)
    );
  }

  createNote(note: Note) {
    this._http.post('/notes', note).subscribe(
      response => this.retrieveAll(),
      errorResponse => console.log(errorResponse)
    );
  }


}
