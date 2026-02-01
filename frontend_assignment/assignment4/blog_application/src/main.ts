import { router, navigate } from "./router"
import { NoteListComponent } from "./components/NoteList"
import { CreateNoteComponent } from "./components/CreateNote"
import { NoteDetailsComponent } from "./components/NoteDetail"

const app = document.getElementById("app")!

export function renderHome() {
  app.innerHTML = ""
  new NoteListComponent(app)
}

export function renderCreate() {
  app.innerHTML = ""
  new CreateNoteComponent(app)
}

export function renderNoteDetails(id: number) {
  app.innerHTML = ""
  new NoteDetailsComponent(app, id)
}

document.addEventListener("click", e => {
  const target = e.target as HTMLElement
  if (target.matches("[data-link]")) {
    e.preventDefault()
    navigate(target.getAttribute("href")!)
  }
})

window.addEventListener("popstate", router)

router()
