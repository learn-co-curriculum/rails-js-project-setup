class Note {
  constructor(noteJSON) {
    this.comments = []
    this.init()
    this.body = noteJSON.body
    this.id = noteJSON.id
    this.loadComments(noteJSON.comments)
  }

  init() {
    this.noteShowNode = document.getElementById('note-show')

    if (this.noteShowNode.addEventListener) {
      this.noteShowNode.addEventListener('click', handleAddComment, false)
    } else if (this.noteShowNode.attachEvent) {
      this.noteShowNode.attachEvent('onclick', handleAddComment)
    }
  }

  handleAddComment(event) {
    event.preventDefault()
    const content = event.target.children[0].value
    console.log(content)
  }

  loadComments(comments) {
    comments.forEach(commentJSON => {
      this.comments.push(new Comment(commentJSON))
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
            <form id="new-comment-form">
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
