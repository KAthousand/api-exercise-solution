const db = require('../db/connection')
const User = require('../models/user')
const Post = require('../models/post')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
    const user1 = new User({ username: "jeff.e", email: "jeffy@gmail.com", posts: [] })
    await user1.save()
    const user2 = new User({ username: "cint.ia", email: "cintia@gmail.com", posts: [] })
    await user2.save()

    const posts =
        [
            {
                title: "Lorem Ipsum Dolor",
                imgURL: "https://www.unsplash.com/92hd.png",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                userId: user1
            }, {
                title: "Ut Enim Ad Minim",
                imgURL: "https://www.unsplash.com/64ea.png",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                userId: user1
            }, {
                title: "Sed Do Eiusmod Tempor",
                imgURL: "https://www.unsplash.com/92hd.png",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                userId: user2
            }, {
                title: "Consectetur Adipiscing Elit",
                imgURL: "https://www.unsplash.com/64ea.png",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                userId: user2
            }
        ]

    await Post.insertMany(posts)
    console.log("Created posts!")

    user1.posts = await Post.find({ userId: user1 })
    await user1.save()
    user2.posts = await Post.find({ userId: user2 })
    await user2.save()
}
const run = async () => {
    await main()
    db.close()
}

run()