const Note = {
  noteIdCounter: 8,
  dragged: null,

  process (noteElement) {
    noteElement.addEventListener('dblclick', function (evt) {
      noteElement.setAttribute('contenteditable', 'true');
      noteElement.removeAttribute('draggble');
      noteElement.closest('.column').removeAttribute('draggble');
      noteElement.focus();
    });

    noteElement.addEventListener('blur', function (evt) {
      noteElement.removeAttribute('contenteditable');
      noteElement.closest('.column').setAttribute('draggble', 'true');
      noteElement.removeAttribute('draggble', 'true');

      if (!noteElement.textContent.trim().length) {
        noteElement.remove();
      }
    });

    noteElement.addEventListener('dragstart', dragstartNoteHandler);
    noteElement.addEventListener('dragend', dragendNoteHandler);
    noteElement.addEventListener('dragenter', dragenterNoteHandler);
    noteElement.addEventListener('dragover', dragoverNoteHandler);
    noteElement.addEventListener('dragleave', dragleaveNoteHandler);
    noteElement.addEventListener('drop', dropNoteHandler);

    function dragstartNoteHandler (evt) {
      dragged = this;
      this.classList.add('dragged');
      evt.stopPropagation();
    };
    function dragendNoteHandler (evt) {
      dragged = null;
      this.classList.remove('dragged');

      document
        .querySelectorAll('.note')
        .forEach(x => x.classList.remove('under'));
    };
    function dragenterNoteHandler (evt) {
      if (this === dragged) {
        return;
      }
      this.classList.add('under');
    };
    function dragoverNoteHandler (evt) {
      evt.preventDefault();
      if (this === dragged) {
        return;
      }
    };
    function dragleaveNoteHandler (evt) {
      if (this === dragged) {
        return;
      }
      this.classList.remove('under');
    };
    function dropNoteHandler (evt) {
      evt.stopPropagation();

      if (this === dragged) {
        return;
      }

      if (this.parentElement === dragged.parentElement) {
        const notes = Array.from(this.parentElement.querySelectorAll('.note'));
        const indexA = notes.indexOf(this);
        const indexB = notes.indexOf(dragged);

        if (indexA < indexB) {
          this.parentElement.insertBefore(dragged, this)
        } else (
          this.parentElement.insertBefore(dragged, this.nextElementSibling)
        )
      } else {
        this.parentElement.insertBefore(dragged, this)
      }
    };
  }
}

// function noteProcess (noteElement) {
//   noteElement.addEventListener('dblclick', function (evt) {
//     noteElement.setAttribute('contenteditable', 'true');
//     noteElement.removeAttribute('draggble');
//     noteElement.closest('.column').removeAttribute('draggble');
//     noteElement.focus();
//   });
//
//   noteElement.addEventListener('blur', function (evt) {
//     noteElement.removeAttribute('contenteditable');
//     noteElement.closest('.column').setAttribute('draggble', 'true');
//     noteElement.removeAttribute('draggble', 'true');
//
//     if (!noteElement.textContent.trim().length) {
//       noteElement.remove();
//     }
//   });
//
//   noteElement.addEventListener('dragstart', dragstartNoteHandler);
//   noteElement.addEventListener('dragend', dragendNoteHandler);
//   noteElement.addEventListener('dragenter', dragenterNoteHandler);
//   noteElement.addEventListener('dragover', dragoverNoteHandler);
//   noteElement.addEventListener('dragleave', dragleaveNoteHandler);
//   noteElement.addEventListener('drop', dropNoteHandler);
//
//   function dragstartNoteHandler (evt) {
//     dragged = this;
//     this.classList.add('dragged');
//     evt.stopPropagation();
//   };
//   function dragendNoteHandler (evt) {
//     dragged = null;
//     this.classList.remove('dragged');
//
//     document
//       .querySelectorAll('.note')
//       .forEach(x => x.classList.remove('under'));
//   };
//   function dragenterNoteHandler (evt) {
//     if (this === dragged) {
//       return;
//     }
//     this.classList.add('under');
//   };
//   function dragoverNoteHandler (evt) {
//     evt.preventDefault();
//     if (this === dragged) {
//       return;
//     }
//   };
//   function dragleaveNoteHandler (evt) {
//     if (this === dragged) {
//       return;
//     }
//     this.classList.remove('under');
//   };
//   function dropNoteHandler (evt) {
//     evt.stopPropagation();
//
//     if (this === dragged) {
//       return;
//     }
//
//     if (this.parentElement === dragged.parentElement) {
//       const notes = Array.from(this.parentElement.querySelectorAll('.note'));
//       const indexA = notes.indexOf(this);
//       const indexB = notes.indexOf(dragged);
//
//       if (indexA < indexB) {
//         this.parentElement.insertBefore(dragged, this)
//       } else (
//         this.parentElement.insertBefore(dragged, this.nextElementSibling)
//       )
//     } else {
//       this.parentElement.insertBefore(dragged, this)
//     }
//   };
// };
