class Comment {
  constructor(commentJSON) {
    this.content = commentJSON.content
  }

  render() {
    return `<li>${
      this.content
    }<button data-action='edit-note'>Edit</button> <button data-action='delete-note'>x</button></li>`
  }
}
