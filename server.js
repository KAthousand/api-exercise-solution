const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const PORT = process.env.PORT || 3000
const db = require('./db/connection')
const Post = require('./models/post')

const app = express()

app.use(bodyParser.json())
app.use(logger('dev'))

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(PORT, () => console.log(`Express server listening on port ${PORT}`))

app.get('/', (req, res) => res.send("This is root!"))

app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.get('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params
        const post = await Post.findById(id)
        if (!post) throw Error('Post not found')
        res.json(post)
    } catch (e) {
        console.log(e)
        res.send('Post not found!')
    }
})

app.post('/posts', async (req, res) => {
    console.log(req.body)
    try {
        const post = await new Post(req.body)
        await post.save()
        res.status(201).json(post)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
})

app.put('/posts/:id', async (req, res) => {
    const { id } = req.params
    await Post.findByIdAndUpdate(id, req.body, { new: true }, (error, post) => {
        if (error) {
            return res.status(500).json({ error: error.message })
        }
        if (!post) {
            return res.status(404).json({ message: 'Post not found!' })
        }
        res.status(200).json(post)
    })
})

app.delete('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Post.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("Post deleted")
        }
        throw new Error("Post not found")
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})