class Note {
  constructor(noteJSON) {
    this.body = noteJSON.body
    this.id = noteJSON.id
  }

  renderShow() {
    return `<h3>${this.body}</h3>`
  }

  render() {
    return `<li data-noteid='${this.id}' data-props='${JSON.stringify(
      this
    )}' class='note-element'><a class="show-link" href='#'>${
      this.body
    }</a> <button data-action='edit-note'>Edit</button> <i data-action='delete-note' class="em em-scream_cat"></i></li>`
  }
}
