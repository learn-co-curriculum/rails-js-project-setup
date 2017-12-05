class NotesAdapter {
  constructor(){
    this.baseUrl = 'http://localhost:3000/api/v1/notes'
  }

  getNotes() {
    return fetch(this.baseUrl).then(res => res.json())
  }

  createNote(body){
    const noteCreateParams = {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      }
    },
    body: JSON.stringify({body})
  }
  return fetch(this.baseUrl, noteCreateParams).then(res => res.json())
}