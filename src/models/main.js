const database = '../../database'
const uuid = require('uuid/v4')
const path = require('path')
const fs = require('fs')
const dbPath = fs.readFileSync(path.join(__dirname, database, 'db.json'))
const dbPath2 = path.join(__dirname, database, 'db.json')

finder = (array, paramId) => {
  return array.find(a => {
    return a.id === paramId
  })
}

createPost = (title, content) => {
  let result
  if (!content || !title) {
    result = {
      status: 400,
      error: 'No content/title entered'
    }
    return result
  }
  const postArray = JSON.parse(dbPath, 'utf-8')
  let newPost = {
    id: uuid(),
    title,
    content
  }
  postArray.push(newPost)
  console.log('New Post === ', newPost)
  console.log('Post Array === ', postArray)
  // fs.writeFileSync(dbPath2, JSON.stringify(postArray))
  fs.writeFileSync(
    path.join(__dirname, database, 'db.json'),
    JSON.stringify(postArray)
  )
  result = postArray[postArray.length - 1]
  console.log('Result is??? === ', result)
  return result
}

getAllPosts = limit => {
  // const postArray = JSON.parse(dbPath, 'utf-8')
  const postArray = JSON.parse(
    fs.readFileSync(path.join(__dirname, database, 'db.json')),
    'utf-8'
  )
  console.log('what is in here??? == ', postArray)
  const result = !limit ? postArray : postArray.slice(0, limit)
  return result
}

getPostById = paramId => {
  let result
  const postArray = JSON.parse(dbPath, 'utf-8')
  if (!finder(postArray, paramId)) {
    result = {
      status: 400,
      error: 'ID not found'
    }
    return result
  }
  result = finder(postArray, paramId)
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
