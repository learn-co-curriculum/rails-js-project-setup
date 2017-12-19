class Comment {
  constructor(commentJSON, noteId) {
    this.content = commentJSON.content
    this.id = commentJSON.id
    this.noteId = noteId
  }

  render() {
    return `<li data-commentid='${this.id}' data-noteid='${this.noteId}'>${
      this.content
    }<button data-action='edit-note'>Edit</button> <button data-action='delete-note'>x</button></li>`
  }
}
