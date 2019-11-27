'use strict';

// document
//   .querySelectorAll('.column')
//   .forEach(Column.columnProcess);

Application.load();

document
  .querySelector('[data-action-addColumn]')
  .addEventListener('click', function(evt) {
    const columnElement = Column.createColumn();
    document.querySelector('.columns').append(columnElement);

    Application.save();
  });

// document
//   .querySelectorAll('.note')
//   .forEach(Note.process);
