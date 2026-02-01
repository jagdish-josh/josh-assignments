import type { Note } from "../types"

export class NoteComponent {
  private note: Note
  private showContent: boolean

  constructor(note: Note, showContent = false) {
    this.note = note
    this.showContent = showContent
  }

  render() {
    const div = document.createElement("div")
    div.className = "note card"

    div.innerHTML = `
      <h3>${this.note.title}</h3>
      <small>${new Date(this.note.createdAt).toLocaleString()}</small>
      ${
        this.showContent
          ? `<p style="margin-top:10px">${this.note.content}</p>`
          : ""
      }
    `

    return div
  }
}
