'use strict';

const Column = {
  columnIdCounter: 4,

  columnProcess(columnElement) {
    const spanActionAddNote = columnElement.querySelector('[data-action-addNote]');

    spanActionAddNote.addEventListener('click', function (evt) {
      const noteElement = document.createElement('div');
      noteElement.classList.add('note');
      noteElement.setAttribute('draggable', 'true');
      noteElement.setAttribute('data-note-id', Note.noteIdCounter);

      Note.noteIdCounter++;
      columnElement.querySelector('[data-notes]').append(noteElement);
      Note.process(noteElement);

      noteElement.setAttribute('contenteditable', 'true');
      noteElement.focus();
    });

    const headerElement = columnElement.querySelector('.column-header');
    headerElement.addEventListener('dblclick', function (evt) {
      headerElement.setAttribute('contenteditable', 'true');
      headerElement.focus();
    });

    headerElement.addEventListener('blur', function (evt) {
      headerElement.removeAttribute('contenteditable');
    });

    columnElement.addEventListener('dragover', function (evt) {
      evt.preventDefault();
    });

    columnElement.addEventListener('drop', function (evt) {
      if (Note.dragged) {
        return columnElement.querySelector('[data-notes]').append(Note.dragged);
      }
    });
  }
}
