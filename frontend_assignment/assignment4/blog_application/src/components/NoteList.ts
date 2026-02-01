import { NoteStore } from "../store"
import { navigate } from "../router"
import { NoteComponent } from "./Note"

export class NoteListComponent {
  private mount: HTMLElement

  constructor(mount: HTMLElement) {
    this.mount = mount
    this.render()
  }

  render() {
    const container = document.createElement("div")
    container.innerHTML = `<h2>All Notes</h2>`

    const notes = NoteStore.getAll()

    if (notes.length === 0) {
      container.innerHTML += `<p>No notes yet.</p>`
    }

    notes.forEach(note => {
      const item = new NoteComponent(note)
      const el = item.render()

      el.addEventListener("click", () => {
        navigate(`/note/${note.id}`)
      })

      container.appendChild(el)
    })

    this.mount.appendChild(container)
  }
}
