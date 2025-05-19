const posts = require('../model/postsModel')
const mongoose = require('mongoose')
const fs = require('fs')

//Get all posts
const getPosts = async (req, res) => {

    const Posts = await posts.find({})

    res.status(200).json(Posts)
}

//Get posts created by the authenticated user
const getUserPosts = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        const userPosts = await posts.find({ user_id: req.user.userId }); // Fetch posts for the authenticated user
        res.status(200).json(userPosts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
/* Routes
router.get("/posts", getPosts); Fetch all posts
router.get("/my-posts", authenticateUser, getUserPosts); Fetch posts for the authenticated user */



//Get a single post
const getAPost = async (req, res) => {

    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){  //check id whether its in proper length
        return res.status(404).json({error: "no such a id"})
    }

    const post = await posts.findById(id)

    if(!post) {
        return res.status(404).json({error: "No such post"})
    }

    res.status(200).json(post)

}

//create new post
const createPost = async (req, res) => {

    let newPath = null
    if (req.file) {
        const {originalname,path} = req.file;
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        newPath = path+'.'+ext
        fs.renameSync(path, newPath)
        
    }

    const {title, binominalName, description, sunRequirement, soilRequirements, sowingMethod, wateringNeeds, spread, rowSpacing, height, user_id} = req.body

    try {
        //const user_id = req.user.userId  add user_id down there(next to file)
        const createPost = await posts.create({title, binominalName, description, sunRequirement, soilRequirements, sowingMethod, wateringNeeds, spread, rowSpacing, height, user_id, file: newPath})
        res.status(200).json(createPost)
    } catch (error) {
        res.status(400).json({error: error.message})
    }


}

//update a post
const updatePost = async (req, res) => {

    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){  
        return res.status(404).json({error: "no such a id"})
    }

    const uPost = await posts.findByIdAndUpdate({_id:id}, {...req.body})

    if(!uPost) {
        return res.status(404).json({error: "No such post"})
    }

    res.status(200).json(uPost)
}


//Delete post
const deletePost = async (req, res) => {

    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){  
        return res.status(404).json({error: "no such a id"})
    }

    const dPost = await posts.findByIdAndDelete({_id: id})

    if(!dPost) {
        return res.status(404).json({error: "No such post"})
    }

    res.status(200).json(dPost)
}

module.exports = {
    getPosts,
    getUserPosts,
    getAPost,
    createPost,
    updatePost,
    deletePost

}