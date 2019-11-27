'use strict';

const Column = {
  columnIdCounter: 4,
  dragged: null,
  dropped: null,

  createColumn (id = null) {
    const columnElement = document.createElement('div');
    columnElement.classList.add('column');
    columnElement.setAttribute('draggable', 'true');

    if (id) {
      columnElement.setAttribute('data-note-id', id);
    } else {
      columnElement.setAttribute('data-note-id', Column.columnIdCounter);
      Column.columnIdCounter++;
    }

    columnElement.innerHTML =
    `<p class="column-header">В плане</p>
      <div data-notes></div>
      <p class="column-footer">
        <span data-action-addNote class="action">+ Добавить карточку</span>
      </p>`;

    Column.columnProcess(columnElement);

    return columnElement;
  },

  columnProcess (columnElement) {
    const spanActionAddNote = columnElement.querySelector('[data-action-addNote]');

    spanActionAddNote.addEventListener('click', function (evt) {
      const noteElement = Note.createNote();

      columnElement.querySelector('[data-notes]').append(noteElement);

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

    columnElement.addEventListener('dragstart', Column.dragstart);
    columnElement.addEventListener('dragend', Column.dragend);

    columnElement.addEventListener('dragenter', Column.dragenter);
    columnElement.addEventListener('dragleave', Column.dragleave);

    columnElement.addEventListener('dragover', Column.dragover);
    columnElement.addEventListener('drop', Column.drop);
  },

  dragstart (evt) {
    Column.dragged = this;
    Column.dragged.classList.add('dragged');

    evt.stopPropagation();

    document
      .querySelectorAll('.note')
      .forEach(noteElement => noteElement.removeAttribute('draggable'));
  },

  dragend (evt) {
    Column.dragged.classList.remove('dragged');
    Column.dragged = null;
    Column.dropped = null;

    document
      .querySelectorAll('.note')
      .forEach(noteElement => noteElement.setAttribute('draggable', 'true'));

      Application.save();
  },

  dragover (evt) {
    evt.preventDefault();
    evt.stopPropagation();

    if (Column.dragged === this) {
      if (Column.dropped) {
        Column.dropped.classList.remove('under');
      }
      Column.dropped = null;
    }
    if (!Column.dragged || Column.dragged === this) {
      return;
    }

    Column.dropped = this;

    document
      .querySelectorAll('.column')
      .forEach(columnElement => columnElement.classList.remove('under'));

    this.classList.add('under');
  },

  drop () {
    if (Note.dragged) {
      return this.querySelector('[data-notes]').append(Note.dragged);
    }

    else if (Column.dragged) {
        const children = Array.from(document.querySelector('.columns').children);
        const indexA = children.indexOf(this);
        const indexB = children.indexOf(Column.dragged);

        if (indexA < indexB) {
          document.querySelector('.columns').insertBefore(Column.dragged, this)
        } else {
          document.querySelector('.columns').insertBefore(Column.dragged, this.nextElementSibling)
        }

        document
          .querySelectorAll('.column')
          .forEach(columnElement => columnElement.classList.remove('under'));

    }
  }

}
