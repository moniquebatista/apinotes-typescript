import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())


const PORT = 3000

interface INote{
  id: string,
  title: string,
  description: string
}

const notes: Array<INote> = []

app.use(express.static('www'))

app.get('/notes', (req, res) => {
  res.json(notes)
})

app.get('/notes/:id', (req, res) => {
  const id = req.params.id
  
  if(!id){
    res.status(400).json({message: 'Informe o campo Id'})
  }

  const note = notes.find((n => n.id === id)) //verifica se existe o ID

  if(!note){
    res.status(400).json({message: 'ID não encontrado!!'})
  }


  res.json(note)
})

app.post('/notes', (req, res) => {
  const title = req.body.title
  const description = req.body.description

  if(!title){
    res.status(400).json({message: 'Informe o campo title'})
  }
  if(!description){
    res.status(400).json({message: 'Informe o campo description'})
  }

  notes.push({
    id: uuidv4(),
    title, 
    description
  })
   
  res.json({message: 'Anotação salva com sucesso!'})
})

app.put('/notes', (req, res) => {
  const id = req.body.id
  const title = req.body.title
  const description = req.body.description

  if(!id){
    res.status(400).json({message: 'Informe o campo Id'})
  }

  const note = notes.find((n => n.id === id)) //verifica se existe o ID

  if(!note){
    res.status(400).json({message: 'ID não encontrado!!'})
  }
  if(!title){
    res.status(400).json({message: 'Informe o campo title'})
  }
  if(!description){
    res.status(400).json({message: 'Informe o campo description'})
  }

  for(const noteObject of notes){
    if(noteObject.id ===id){
       noteObject.title = title
       noteObject.description = description
    }
  }
   
  res.json({message: 'Anotação editada com sucesso!'})
})

app.delete('/notes', (req, res) => {
  const id = req.body.id

  if(!id){
    res.status(400).json({message: 'Informe o campo Id'})
  }

  const note = notes.find((n => n.id === id)) //verifica se existe o ID

  if(!note){
    res.status(400).json({message: 'ID não encontrado!!'})
  }

  for(const index in notes){
    if(notes[index].id === id){
      notes.splice(Number(index), 1)//excluí um elemento do array
    }
  }
 
   
  res.json({message: 'Anotação excluída com sucesso!'})
})

app.listen(PORT, () => {
  console.log(`⚡️[server]: API rodando em http://localhost:${PORT}`)
})
