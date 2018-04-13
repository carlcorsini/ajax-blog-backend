const database = '../../database'
const uuid = require('uuid/v4')
const path = require('path')
const fs = require('fs')
const dbPath = fs.readFileSync(path.join(__dirname, database, 'db.json'))
const dbPath2 = path.join(__dirname, database, 'db.json')
const theDataBase = require('../../database/db.json')

finder = (array, paramId) => {
  return array.find(a => {
    return a.id === paramId
  })
}

createPost = (title, content) => {
  console.log('hey')
  let result
  if (!content || !title) {
    result = {
      status: 400,
      error: 'No content/title entered'
    }
    return result
  }

  // const postArray = theDatabase

  let newPost = {
    id: uuid(),
    title,
    content
  }

  theDataBase.push(newPost)
  console.log('someshit=====', theDataBase)
  console.log('New Post === ', newPost)
  // console.log('Post Array === ', postArray)
  // fs.writeFileSync(dbPath2, JSON.stringify(postArray))
  // fs.writeFileSync(
  // path.join(__dirname, database, 'db.json'),
  // JSON.stringify(postArray)
  // )
  result = postArray[postArray.length - 1]
  // console.log('Result is??? === ', result)
  return result
}

getAllPosts = limit => {
  return theDataBase
}

getPostById = paramId => {
  let result
  // const postArray = JSON.parse(dbPath, 'utf-8')
  if (!finder(theDataBase, paramId)) {
    result = {
      status: 400,
      error: 'ID not found'
    }
    return result
  }
  result = finder(theDataBase, paramId)
  return result
}

update = (paramId, title, content) => {
  let result
  const postArray = JSON.parse(dbPath, 'utf-8')

  if (!finder(postArray, paramId)) {
    result = {
      status: 400,
      error: 'ID not found'
    }
    return result
  }
  postArray.forEach((a, idx) => {
    if (a.id === paramId) {
      postArray[idx].title = title
      postArray[idx].content = content
      result = postArray[idx]
    }
  })
  fs.writeFileSync(dbPath2, JSON.stringify(postArray))
  return result
}

deletePost = paramId => {
  const postArray = JSON.parse(dbPath, 'utf-8')
  if (!finder(postArray, paramId)) {
    result = {
      status: 400,
      error: 'ID not found'
    }
    return result
  }
  postArray.forEach((a, idx) => {
    if (a.id === paramId) {
      postArray.splice(idx, 1)
    }
  })
  fs.writeFileSync(dbPath2, JSON.stringify(postArray))
  return postArray
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  update,
  deletePost
}
