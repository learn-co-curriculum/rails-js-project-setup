class Note {
  constructor(noteJSON) {
    this.comments = []
    this.body = noteJSON.body
    this.id = noteJSON.id
    this.loadComments(noteJSON.comments)
  }

  removeComment(commentId) {
    this.comments = this.comments.filter(comment => comment.id !== commentId)
  }

  addComment(newComment) {
    this.comments = this.comments.concat(newComment)
  }

  updateComment(updatedComment, noteId) {
    this.comments = this.comments.map(
      comment =>
        comment.id === updatedComment.id
          ? new Comment(updatedComment, noteId)
          : comment
    )
  }

  loadComments(comments) {
    comments.forEach(commentJSON => {
      this.comments.push(new Comment(commentJSON, this.id))
    })
  }

  commentsHTML() {
    return this.comments
      .map(comment => {
        return comment.render()
      })
      .join('')
  }

  renderShow() {
    return `<h3>${this.body}</h3>
            <p>Comments</p>
            <ul>${this.commentsHTML()}</ul>
            <form id="new-comment-form" data-id=${this.id}>
              <input type="text" name="comment-body" id="new-comment-body">
              <input type="submit" value="Save comment">
            </form>
           `
  }

  render() {
    return `<li data-noteid='${this.id}' data-props='${JSON.stringify(
      this
    )}' class='note-element'><a class="show-link" href='#'>${
      this.body
    }</a> <button data-action='edit-note'>Edit</button> <i data-action='delete-note' class="em em-scream_cat"></i></li>`
  }
}
