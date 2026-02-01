import type{ Note } from "./types"

const STORAGE_KEY = "notes -qwertyuiop"

let notes: Note[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")

export const NoteStore = {
  getAll() {
    return notes
  },

  add(note: Note) {
    notes.push(note)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  }
}
