const pnd = require('../model/pndModel')
const mongoose = require('mongoose')
const fs = require('fs')

//Get all pnd posts
const getPnd = async (req, res) => {

    const Pnd = await pnd.find({})

    res.status(200).json(Pnd)
}

//Get pnd posts created by the authenticated user
const getUserPnd = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        const userPnd = await pnd.find({ user_id: req.user.userId }); // Fetch posts for the authenticated user
        res.status(200).json(userPnd);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//Get a single pnd post
const getAPnd = async (req, res) => {

    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){  //check id whether its in proper length
        return res.status(404).json({error: "no such a id"})
    }

    const Pnd = await pnd.findById(id)

    if(!Pnd) {
        return res.status(404).json({error: "No such post"})
    }

    res.status(200).json(Pnd)

}

//create new pnd post
const createPnd = async (req, res) => {

    let newPath = null
    if (req.file) {
        const {originalname,path} = req.file;
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        newPath = path+'.'+ext
        fs.renameSync(path, newPath)
        
    }

    const {title, description, causes, solution, author, user_id } = req.body

    try {
        
        const createPnd = await pnd.create({title, description, causes, author, solution, user_id, file: newPath})
        res.status(200).json(createPnd)
    } catch (error) {
        res.status(400).json({error: error.message})
    }


}


//update a news
const updatePnd = async (req, res) => {

    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){  
        return res.status(404).json({error: "no such a id"})
    }

    const uPnd = await pnd.findByIdAndUpdate({_id:id}, {...req.body})

    if(!uPnd) {
        return res.status(404).json({error: "No such post"})
    }

    res.status(200).json(uPnd)
}

//Delete pnd post
const deletePnd = async (req, res) => {

    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){  
        return res.status(404).json({error: "no such a id"})
    }

    const dPnd = await pnd.findByIdAndDelete({_id: id})

    if(!dPnd) {
        return res.status(404).json({error: "No such post"})
    }

    res.status(200).json(dPnd)
}

module.exports = {
    getPnd,
    getUserPnd,
    getAPnd,
    createPnd,
    updatePnd,
    deletePnd
}