const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    let total = 0
    blogs.map(x => {
        total += x.likes
    })
    return total
}

const favoriteBlogs = (blogs) => {
    const mostLikes = Math.max(...blogs.map(x => x.likes))
    const obj = blogs.find(x => x.likes === mostLikes)
    const newobj = {
        title: obj.title,
        author: obj.author,
        likes: obj.likes
    }
    return newobj
}

const mostBlogs = (blogs) => {
    let namesObj = {}
    blogs.map(x => {
        if(namesObj[x.author]){
            namesObj[x.author] += 1
        }else{
            namesObj[x.author] = 1
        }
    })
    const most = Math.max(...Object.values(namesObj))
    const auth = Object.keys(namesObj).find(key => namesObj[key] === most)
    
    return {
        "author": auth,
        "blogs": most
    }
}

const mostLikes = (blogs) => {
    let namesObj = {}
    blogs.map(x => {
        if(namesObj[x.author]){
            namesObj[x.author] += x.likes
        }else{
            namesObj[x.author] = x.likes
        }
    })
    const most = Math.max(...Object.values(namesObj))
    const auth = Object.keys(namesObj).find(key => namesObj[key] === most)
    
    return {
        "author": auth,
        "likes": most
    }
}


module.exports = {
    dummy, 
    totalLikes,
    favoriteBlogs, 
    mostBlogs,
    mostLikes
}