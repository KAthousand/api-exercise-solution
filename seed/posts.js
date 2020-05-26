const db = require('../db/connection')
const Post = require('../models/post')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
    const posts =
        [
            {
                title: "Lorem Ipsum Dolor",
                imgURL: "https://www.unsplash.com/92hd.png",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                author: "Bruno Galvao"
            }, {
                title: "Ut Enim Ad Minim",
                imgURL: "https://www.unsplash.com/64ea.png",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                author: "Bruno Galvao"
            }
        ]

    await Post.insertMany(posts)
    console.log("Created posts!")
}
const run = async () => {
    await main()
    db.close()
}

run()