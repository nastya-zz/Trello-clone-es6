

document
  .querySelectorAll('.column')
  .forEach(Column.columnProcess);

document
  .querySelector('[data-action-addColumn]')
  .addEventListener('click', function(evt) {
    const columnElement = document.createElement('div');
    columnElement.classList.add('column');
    columnElement.setAttribute('draggable', 'true');
    columnElement.setAttribute('data-note-id', Column.columnIdCounter);

    columnElement.innerHTML =
    `<p class="column-header">В плане</p>
      <div data-notes></div>
      <p class="column-footer">
        <span data-action-addNote class="action">+ Добавить карточку</span>
      </p>`;

    Column.columnIdCounter++;

    document.querySelector('.columns').append(columnElement);
    Column.columnProcess(columnElement);
  });

document
  .querySelectorAll('.note')
  .forEach(Note.process);
