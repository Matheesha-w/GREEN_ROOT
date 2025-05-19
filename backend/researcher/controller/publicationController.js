const publication = require('../model/publications')
const mongoose = require('mongoose')
const fs = require('fs')

//Get all publications
const getPublications = async (req, res) => {

    const Pub = await publication.find({})

    res.status(200).json(Pub)
}

//Get publications created by the authenticated user
const getUserPublications = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        const userPubs = await publication.find({ user_id: req.user.userId }); // Fetch publications for the authenticated user
        res.status(200).json(userPubs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//create new publication
const createPublication = async (req, res) => {

    let newPath = null
    if (req.file) {
        const {originalname,path} = req.file;
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        newPath = path+'.'+ext
        fs.renameSync(path, newPath)
        
    }

    const {title, author, user_id } = req.body

    try {
        const createPub = await publication.create({title, author, user_id, file: newPath})
        res.status(200).json(createPub)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//Delete publication
const deletePublication = async (req, res) => {

    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){  
        return res.status(404).json({error: "no such a id"})
    }

    const dPub = await publication.findByIdAndDelete({_id: id})

    if(!dPub) {
        return res.status(404).json({error: "No such file"})
    }

    res.status(200).json(dPub)
}

// Download original file
const downloadFile = async (req, res) => {
    try {
        const pub = await publication.findById(req.params.id);
        if (!pub || !pub.file) {
            return res.status(404).json({ error: "File not found" });
        }

        const filePath = path.join(__dirname, '..', pub.file);
        res.download(filePath); // Browser will prompt download
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getPublications,
    getUserPublications,
    createPublication,
    deletePublication,
    downloadFile
}