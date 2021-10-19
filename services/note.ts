import { INote } from "../types/INote"
import { v4 as uuidv4 } from 'uuid'

const notes: Array<INote> = []

const list = () => {
    return notes
}

const get = (id: string) => {
    if(!id){
        throw new Error ("Informe o campo ID")
    }
  
    const note = notes.find((n => n.id === id)) //verifica se existe o ID
  
    if(!note){
        throw new Error("ID não encontrado!!")
    }
  
    return note
}

const create = (note: INote) => {
  if(!note.title){
    throw new Error("Informe o campo title")
  }

  if(!note.description){
    throw new Error("Informe o campo description")
  }

  note.id = uuidv4()

  notes.push(note) 
   
  return note
}

const update = (note: INote) => {
  if(!note.id){
    throw new Error("Informe o campo Id")
  }

  const noteFound = notes.find((n => n.id === note.id)) //verifica se existe o ID

  if(!noteFound){
    throw new Error("ID não encontrado!!")
  }
  
  if(!note.title){
    throw new Error("Informe o campo title")
  }

  if(!note.description){
    throw new Error("Informe o campo description")
  }

  for(const noteObject of notes){
    if(noteObject.id === note.id){
       noteObject.title = note.title
       noteObject.description = note.description
    }
  }
   
  return note
}

const remove = (id: string) => {
  if(!id){
    throw new Error("Informe o campo Id")
  }

  const note = notes.find((n => n.id === id)) //verifica se existe o ID

  if(!note){
    throw new Error("ID não encontrado!!")
  }

  for(const index in notes){
    if(notes[index].id === id){
      notes.splice(Number(index), 1)//excluí um elemento do array
    }
  }
 
   return true
}

export{
    list,
    get,
    create,
    update,
    remove
}