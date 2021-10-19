import { Request, Response } from 'express'
import * as note from '../services/note'
import { error } from '../libs/bindError'

const list = (req: Request<any>, res: Response<any>) => {
    const notes = note.list()
    return res.json(notes)
}

const get = (req: Request<any>, res: Response<any>) => {
    try {
        const id = req.params.id
        if(!id){
            return res.status(400).json({message: 'Informe o campo Id'})
        }
        const noteFound = note.get(id)
        res.json(noteFound)
    } catch (err: any) {
        return error(res, err)
    }
}


const create = (req: Request<any>, res: Response<any>) => {
    try {
        const title = req.body.title
        const description = req.body.description
        
        const noteCreate = note.create({title, description})
        return res.json(noteCreate)
    } catch (err: any) {
        return error(res, err)
    }
}


const update = (req: Request<any>, res: Response<any>) => {
    try {
        const id = req.body.id
        const title = req.body.title
        const description = req.body.description
    
        if(!id){
            res.status(400).json({message: 'Informe o campo Id'})
        }

        const noteUpdate = note.update({id, title, description})
        return res.json(noteUpdate)
    } catch (err: any) {
        return error(res, err)
    }
   
}

const remove = (req: Request<any>, res: Response<any>) => {
   try {
        const id = req.body.id

        if(!id){
            res.status(400).json({message: 'Informe o campo Id'})
        }

        note.remove(id)
        res.json({sucess: true})

   } catch (err: any) {
        return error(res, err)
}
}

export{
    list,
    get,
    create,
    update,
    remove
}