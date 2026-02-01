import { renderHome, renderCreate, renderNoteDetails } from "./main"

export function router() {
  const path = window.location.pathname

  if (path === "/create") {
    renderCreate()
    return
  }

  if (path.startsWith("/note/")) {
    const id = Number(path.split("/")[2])
    renderNoteDetails(id)
    return
  }

  renderHome()
}

export function navigate(path: string) {
  history.pushState({}, "", path)
  router()
}
