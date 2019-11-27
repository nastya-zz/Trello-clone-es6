'use strict';
const Application = {
  save () {
    const object = {
      columns: {
        idCounter: Column.idCounter,
        items: []
      },
      notes: {
        idCounter: Note.idCounter,
        items: []
      }
    }

    document
      .querySelectorAll('.column')
      .forEach(columnElement => {
        const column = {
          // title: '',
          id: parseInt(columnElement.getAttribute('data-column-id'), 10),
          noteIds: []
        }

        columnElement
          .querySelectorAll('.note')
          .forEach(noteElement => {
            column.noteIds.push(parseInt(noteElement.getAttribute('data-note-id'), 10))
          });


        object.columns.items.push(column);
      });

    document
    .querySelectorAll('.note')
    .forEach(noteElement => {
      const note = {
        id: parseInt(noteElement.getAttribute('data-note-id')),
        content: noteElement.textContent
      }

      object.notes.items.push(note);
    })

    const json = JSON.stringify(object);

    localStorage.setItem('trello', json);
  },

  load () {
    if (!localStorage.getItem('trello')) {
      return;
    }
    const mountePoint = document.querySelector('.columns');
    mountePoint.innerHTML = '';

    const object = JSON.parse(localStorage.getItem('trello'));
    const getNoteById = id => object.notes.items.find(note => note.id === id);

    for (const column of object.columns.items) {
      const columnElement = Column.createColumn(column.id);

      mountePoint.append(columnElement);


      for (const noteId of column.noteIds) {
        const note = getNoteById(noteId);

        const noteElement = Note.createNote(note.id, note.content);
        columnElement.querySelector('[data-notes]').append(noteElement);
      }
    }
  }
}
