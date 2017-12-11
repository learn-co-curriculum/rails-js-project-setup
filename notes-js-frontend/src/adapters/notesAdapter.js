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
}
