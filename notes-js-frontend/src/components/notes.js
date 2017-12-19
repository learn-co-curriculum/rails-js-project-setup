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
    this.noteShowNode = document.getElementById('note-show')
    this.body = document.querySelector('body')
    this.notesForm.addEventListener('submit', this.handleAddNote.bind(this))
    this.body.addEventListener('blur', this.updateNote.bind(this))
    this.notesNode.addEventListener('click', this.handleNoteClick.bind(this))
    this.noteShowNode.addEventListener(
      'submit',
      this.handleAddComment.bind(this)
    )
    this.noteShowNode.addEventListener(
      'click',
      this.handleCommentClick.bind(this)
    )
    this.noteShowNode.addEventListener('blur', this.updateComment.bind(this))
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

  findById(id) {
    return this.notes.find(note => note.id === +id)
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

  updateNote() {
    if (event.target.className.includes('note-element')) {
      const { target } = event
      target.contentEditable = false
      target.classList.remove('editable')
      const body = event.target.innerHTML
      const noteId = target.dataset.noteid
      this.adapter.updateNote(body, noteId).then(updatedNote => {
        const newNote = new Note(updatedNote)
        this.notes = this.notes.map(
          note => (note.id === updatedNote.id ? newNote : note)
        )
        this.render()
        this.noteShowNode.innerHTML = newNote.renderShow()
      })
    }
  }

  toggleEditNote() {
    const { parentElement: target } = event.target
    if (target.className == 'note-element') {
      target.classList.add('editable')
      const noteId = target.dataset.noteid
      const note = this.notes.find(n => n.id == noteId)
      target.contentEditable = true
      target.innerHTML = note.body
      target.focus()
    }
  }

  handleNoteClick() {
    if (
      event.target.dataset.action === 'delete-note' &&
      event.target.parentElement.classList.contains('note-element')
    ) {
      const noteId = event.target.parentElement.dataset.noteid
      this.adapter.deleteNote(noteId).then(resp => this.removeDeletedNote(resp))
    } else if (event.target.dataset.action === 'edit-note') {
      this.toggleEditNote()
    } else if (event.target.className === 'show-link') {
      const noteId = event.target.parentElement.dataset.noteid
      const note = this.findById(noteId)
      this.noteShowNode.innerHTML = note.renderShow()
    }
  }

  removeDeletedNote(deleteResponse) {
    this.notes = this.notes.filter(note => note.id !== deleteResponse.noteId)
    this.render()
    this.noteShowNode.innerHTML = ''
  }

  notesHTML() {
    return this.notes.map(note => note.render()).join('')
  }

  render() {
    this.notesNode.innerHTML = `<ul>${this.notesHTML()}</ul>`
  }

  //comment CRUD
  handleAddComment(event) {
    event.preventDefault()
    const content = event.target.children[0].value
    const noteId = event.target.dataset.id
    const note = this.findById(noteId)
    this.adapter.createComment(content, noteId).then(comment => {
      note.addComment(new Comment(comment, noteId))
      this.noteShowNode.innerHTML = note.renderShow()
    })
  }

  toggleEditComment() {
    const { parentElement: target } = event.target
    target.classList.add('editable')
    const noteId = target.dataset.noteid
    const commentId = target.dataset.commentid
    const note = this.notes.find(n => n.id == noteId)
    const comment = note.comments.find(comment => comment.id === +commentId)
    target.contentEditable = true
    target.innerHTML = comment.content
    target.focus()
  }

  updateComment() {
    if (event.target.className === 'editable') {
      const { target } = event
      const noteId = target.dataset.noteid
      const commentId = target.dataset.commentid
      const note = this.findById(noteId)
      target.contentEditable = false
      const content = target.innerHTML
      target.classList.remove('editable')

      this.adapter
        .updateNoteComment(noteId, commentId, content)
        .then(updatedComment => {
          note.updateComment(updatedComment, noteId)
          this.noteShowNode.innerHTML = note.renderShow()
        })
    }
  }

  handleCommentClick() {
    if (event.target.dataset.action === 'delete-note') {
      const { parentElement: target } = event.target
      const noteId = target.dataset.noteid
      const commentId = target.dataset.commentid
      const note = this.findById(noteId)
      this.adapter.deleteNoteComment(noteId, commentId).then(data => {
        note.removeComment(data.commentId)
        this.noteShowNode.innerHTML = note.renderShow()
      })
    } else if (event.target.dataset.action === 'edit-note') {
      this.toggleEditComment()
    }
  }
}
