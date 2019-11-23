'use strict';


let columnIdCounter = 4;



document
  .querySelectorAll('.column')
  .forEach(columnProcess);

document
  .querySelector('[data-action-addColumn]')
  .addEventListener('click', function(evt) {
    const columnElement = document.createElement('div');
    columnElement.classList.add('column');
    columnElement.setAttribute('draggble', 'true');
    columnElement.setAttribute('data-note-id', columnIdCounter);

    columnElement.innerHTML =
    `<p class="column-header">В плане</p>
      <div data-notes></div>
      <p class="column-footer">
        <span data-action-addNote class="action">+ Добавить карточку</span>
      </p>`;

    columnIdCounter++;

    document.querySelector('.columns').append(columnElement);
    columnProcess(columnElement);
  });

document
  .querySelectorAll('.note')
  .forEach(Note.process);


function columnProcess (columnElement) {
  const spanActionAddNote = columnElement.querySelector('[data-action-addNote]');

  spanActionAddNote.addEventListener('click', function (evt) {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');
    noteElement.setAttribute('draggble', 'true');
    noteElement.setAttribute('data-note-id', noteIdCounter);

    noteIdCounter++;
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
    if (dragged) {
      return columnElement.querySelector('[data-notes]').append(dragged);
    }
  });
};
