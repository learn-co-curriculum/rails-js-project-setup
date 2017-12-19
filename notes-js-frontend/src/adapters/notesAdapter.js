class NotesAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/v1/notes'
  }

  getNotes() {
    return fetch(this.baseUrl).then(res => res.json())
  }

  createNote(body) {
    const noteCreateParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ body })
    }
    return fetch(this.baseUrl, noteCreateParams).then(res => res.json())
  }

  updateNote(body, id) {
    const noteUpdateParams = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ body })
    }

    return fetch(`${this.baseUrl}/${id}`, noteUpdateParams).then(res =>
      res.json()
    )
  }

  deleteNote(noteId) {
    const noteDeleteParams = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return fetch(`${this.baseUrl}/${noteId}`, noteDeleteParams).then(res =>
      res.json()
    )
  }

  updateNoteComment(noteId, commentId, content) {
    const commentUpdateParams = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content })
    }

    return fetch(
      `${this.baseUrl}/${noteId}/comments/${commentId}`,
      commentUpdateParams
    ).then(res => res.json())
  }

  deleteNoteComment(noteId, commentId) {
    const noteDeleteParams = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    return fetch(
      `${this.baseUrl}/${noteId}/comments/${commentId}`,
      noteDeleteParams
    ).then(res => res.json())
  }

  createComment(content, id) {
    const commentCreateParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content })
    }
    return fetch(`${this.baseUrl}/${id}/comments`, commentCreateParams).then(
      res => res.json()
    )
  }
}
