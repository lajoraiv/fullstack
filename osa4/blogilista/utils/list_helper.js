const { forEach } = require("lodash")

const dummy = (blogs) => {
    {
        return 1
    }
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
      }

      return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return 0
    let favoriteBlog = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
    return favoriteBlog
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return 0
    const groupedByName = blogs.reduce((x, y) => {
        (x[y.author] = x[y.author] || []).push(y);
        return x;
    }, {})
    const blogger = {
        author: "",
        blogs: 0
    }
    Object.keys(groupedByName).forEach(key => {
        if (groupedByName[key].length > blogger.blogs) {
            blogger.author = key
            blogger.blogs = groupedByName[key].length
        }
    })
    
    return (blogger)
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return 0
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    
    if (blogs.length === 0) return 0
    const groupedByName = blogs.reduce((x, y) => {
        (x[y.author] = x[y.author] || []).push(y);
        return x;
    }, {})

    const blogger = {
        author: "",
        likes: 0
    }

    Object.keys(groupedByName).forEach(key => {
        if (groupedByName[key].reduce(reducer, 0) > blogger.likes) {
            blogger.author = key
            blogger.likes = groupedByName[key].reduce(reducer, 0)
        }
    })
    
    return (blogger)

}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }