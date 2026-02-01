import { NoteStore } from "../store"
import { navigate } from "../router"
import { NoteComponent } from "./Note"

export class NoteDetailsComponent {
  private mount: HTMLElement
  private id: number

  constructor(mount: HTMLElement, id: number) {
    this.mount = mount
    this.id = id
    this.render()
  }

  render() {
    const note = NoteStore.getAll().find(n => n.id === this.id)

    if (!note) {
      this.mount.innerHTML = "<p>Note not found</p>"
      return
    }

    const item = new NoteComponent(note, true)
    const back = document.createElement("button")

    back.textContent = "← Back"
    back.onclick = () => navigate("/")

    this.mount.appendChild(item.render())
    this.mount.appendChild(back)
  }
}
