const uuid = require('uuid/v4')
const database = require('../../database/db.json')

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

  let newPost = {
    id: uuid(),
    title,
    content
  }

  database.push(newPost)
  return newPost
}

getAllPosts = limit => {
  return database
}

getPostById = paramId => {
  let result

  if (!finder(database, paramId)) {
    result = {
      status: 400,
      error: 'ID not found'
    }
    return result
  }
  result = finder(database, paramId)
  return result
}

update = (paramId, title, content) => {
  let result

  if (!finder(database, paramId)) {
    result = {
      status: 400,
      error: 'ID not found'
    }
    return result
  }
  database.forEach((a, idx) => {
    if (a.id === paramId) {
      database[idx].title = title
      database[idx].content = content
      result = database[idx]
    }
  })
  return result
}

deletePost = paramId => {
  if (!finder(database, paramId)) {
    result = {
      status: 400,
      error: 'ID not found'
    }
    return result
  }
  database.forEach((a, idx) => {
    if (a.id === paramId) {
      database.splice(idx, 1)
    }
  })
  return database
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  update,
  deletePost
}
