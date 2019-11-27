'use strict';

const Note = {
  noteIdCounter: 8,
  dragged: null,

  createNote (id = null, content = '') {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');
    noteElement.setAttribute('draggable', 'true');
    noteElement.textContent = content;

    if (id) {
      noteElement.setAttribute('data-note-id', id);

    } else {
      noteElement.setAttribute('data-note-id', Note.noteIdCounter);
      Note.noteIdCounter++;
    }

    Note.process(noteElement);

    return noteElement;
  },

  process (noteElement) {
    noteElement.addEventListener('dblclick', function (evt) {
      noteElement.setAttribute('contenteditable', 'true');
      noteElement.removeAttribute('draggble');
      noteElement.closest('.column').removeAttribute('draggble');
      noteElement.focus();
    });

    noteElement.addEventListener('blur', function (evt) {
      noteElement.removeAttribute('contenteditable');
      noteElement.setAttribute('draggble', 'true');
      noteElement.closest('.column').setAttribute('draggble', 'true');

      if (!noteElement.textContent.trim().length) {
        noteElement.remove();
      }

      Application.save();
    });

    noteElement.addEventListener('dragstart', Note.dragstart);
    noteElement.addEventListener('dragend', Note.dragend);
    noteElement.addEventListener('dragenter', Note.dragenter);
    noteElement.addEventListener('dragover', Note.dragover);
    noteElement.addEventListener('dragleave', Note.dragleave);
    noteElement.addEventListener('drop', Note.drop);
  },

  dragstart (evt) {
    Note.dragged = this;
    this.classList.add('dragged');
    evt.stopPropagation();
  },

  dragend (evt) {
    Note.dragged = null;
    this.classList.remove('dragged');

    document
      .querySelectorAll('.note')
      .forEach(x => x.classList.remove('under'));

    evt.stopPropagation();

    Application.save();
  },

  dragenter (evt) {
    evt.stopPropagation();

    if (!Note.dragged || this === Note.dragged) {
      return;
    }
    this.classList.add('under');
  },

  dragover (evt) {
    evt.preventDefault();
    evt.stopPropagation();

    if (!Note.dragged || this === Note.dragged) {
      return;
    }
  },

  dragleave (evt) {
    evt.stopPropagation();

    if (!Note.dragged || this === Note.dragged) {
      return;
    }
    this.classList.remove('under');
  },

  drop (evt) {
    evt.stopPropagation();

    if (!Note.dragged || this === Note.dragged) {
      return;
    }

    if (this.parentElement === Note.dragged.parentElement) {
      const notes = Array.from(this.parentElement.querySelectorAll('.note'));
      const indexA = notes.indexOf(this);
      const indexB = notes.indexOf(Note.dragged);

      if (indexA < indexB) {
        this.parentElement.insertBefore(Note.dragged, this)
      } else {
        this.parentElement.insertBefore(Note.dragged, this.nextElementSibling)
      }
    } else {
      this.parentElement.insertBefore(Note.dragged, this)
    }
  }
}
