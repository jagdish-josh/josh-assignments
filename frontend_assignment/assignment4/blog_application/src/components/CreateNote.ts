import type { Note } from "../types"
import { NoteStore } from "../store"
import { navigate } from "../router"

export class CreateNoteComponent {
  private mount: HTMLElement
  private title = ""
  private content = ""

  constructor(mount: HTMLElement) {
    this.mount = mount
    this.render()
  }

  render() {
    const form = document.createElement("form")

    form.innerHTML = `
      <h2>Create Note</h2>
      <input placeholder="Title" required />
      <textarea placeholder="Content" required></textarea>
      <button>Create</button>
    `

    const [titleInput, contentInput] =
      form.querySelectorAll("input, textarea")

    titleInput.addEventListener("input", e => {
      this.title = (e.target as HTMLInputElement).value
    })

    contentInput.addEventListener("input", e => {
      this.content = (e.target as HTMLTextAreaElement).value
    })

    form.addEventListener("submit", e => {
      e.preventDefault()

      const note: Note = {
        id: Date.now(),
        title: this.title,
        content: this.content,
        createdAt: new Date().toISOString()
      }

      NoteStore.add(note)
      navigate("/")
    })

    this.mount.appendChild(form)
  }
}
