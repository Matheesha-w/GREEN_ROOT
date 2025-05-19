const news = require('../model/newsModel')
const mongoose = require('mongoose')
const fs = require('fs')


//Get all posts
const getNews = async (req, res) => {

    const News = await news.find({})

    res.status(200).json(News)
}

//Get news created by the authenticated user
const getUserNews = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        const userNews = await news.find({ user_id: req.user.userId }); // Fetch posts for the authenticated user
        res.status(200).json(userNews);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
/* Routes
router.get("/news", getNews); Fetch all posts
router.get("/my-news", authenticateUser, getUserNews); Fetch news for the authenticated user */


//Get a single news
const getANews = async (req, res) => {

    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){  //check id whether its in proper length
        return res.status(404).json({error: "no such a id"})
    }

    const News = await news.findById(id)

    if(!News) {
        return res.status(404).json({error: "No such post"})
    }

    res.status(200).json(News)

}

//create new News
const createNews = async (req, res) => {

    let newPath = null
    if (req.file) {
        const {originalname,path} = req.file;
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        newPath = path+'.'+ext
        fs.renameSync(path, newPath)
        
    }

    const {title, content, author, user_id } = req.body

    try {
        const createNews = await news.create({title, content, author, user_id, file: newPath})
        res.status(200).json(createNews)
    } catch (error) {
        res.status(400).json({error: error.message})
    }


}

//update a news
const updateNews = async (req, res) => {

    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){  
        return res.status(404).json({error: "no such a id"})
    }

    const uNews = await news.findByIdAndUpdate({_id:id}, {...req.body})

    if(!uNews) {
        return res.status(404).json({error: "No such news"})
    }

    res.status(200).json(uNews)
}

//Delete post
const deleteNews = async (req, res) => {

    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){  
        return res.status(404).json({error: "no such a id"})
    }

    const dNews = await news.findByIdAndDelete({_id: id})

    if(!dNews) {
        return res.status(404).json({error: "No such news"})
    }

    res.status(200).json(dNews)
}


module.exports = {
    getNews,
    getUserNews,
    getANews,
    createNews,
    updateNews,
    deleteNews
}