class Notes {
  constructor() {
    this.notes = []
    this.initBindingsAndEventListeners()
    this.adapter = new NotesAdapter()
    this.fetchAndLoadNotes()
  }

  initBindingsAndEventListeners() {
    this.notesForm = document.getElementById('new-note-form')
    this.noteInput = document.getElementById('new-note-body')
    this.notesNode = document.getElementById('notes-container')
    this.body = document.querySelector('body')
    this.notesForm.addEventListener('submit', this.handleAddNote.bind(this))
    this.notesNode.addEventListener('click', this.handleDeleteNote.bind(this))
    this.body.addEventListener('click', this.toggleEditNote.bind(this))
    this.body.addEventListener('blur', this.updateNote.bind(this), true)
  }

  fetchAndLoadNotes() {
    this.adapter
      .getNotes()
      .then(notesJSON =>
        notesJSON.forEach(note => this.notes.push(new Note(note)))
      )
      .then(this.render.bind(this))
      .catch(error => console.log(error))
  }

  updateNote() {
    const { target } = event
    target.contentEditable = false
    target.classList.remove('editable')
    const body = event.target.innerHTML
    const noteId = target.dataset.noteid
    this.adapter.updateNote(body, noteId)
  }
  handleAddNote() {
    event.preventDefault()
    const body = this.noteInput.value
    this.adapter
      .createNote(body)
      .then(noteJSON => this.notes.push(new Note(noteJSON)))
      .then(this.render.bind(this))
      .then(() => (this.noteInput.value = ''))
  }

  toggleEditNote() {
    const { target } = event
    if (target.className == 'note-element') {
      target.classList.add('editable')
      const noteId = target.dataset.noteid
      const note = this.notes.find(n => n.id == noteId)
      target.contentEditable = true
      target.focus()
      // event.target.innerHTML = `<input type="text" value='${note.body}' />`
    }
  }

  handleDeleteNote() {
    if (
      event.target.dataset.action === 'delete-note' &&
      event.target.parentElement.classList.contains('note-element')
    ) {
      const noteId = event.target.parentElement.dataset.noteid
      this.adapter.deleteNote(noteId).then(resp => this.removeDeletedNote(resp))
    }
  }

  removeDeletedNote(deleteResponse) {
    this.notes = this.notes.filter(note => note.id !== deleteResponse.noteId)
    this.render()
  }

  notesHTML() {
    return this.notes.map(note => note.render()).join('')
  }

  render() {
    this.notesNode.innerHTML = `<ul>${this.notesHTML()}</ul>`
  }
}
