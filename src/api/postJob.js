import request from '@/utils/request'

export const getPostJobListService = (data) => {
  const { pageNum, pageSize, userId, fuzzySearch, state } = data
  const url = `/postJob/getPostJob?pageNum=${pageNum}&pageSize=${pageSize}&userId=${userId}&fuzzySearch=${fuzzySearch}&state=${state}`
  return request.get(url)
}

export const deletePostJobByIdService = (id) => {
  const url = `/postJob/deletePostJob?id=${id}`
  return request.delete(url)
}

export const addPostJobService = (data) => {
  return request.post('/postJob/addPostJob', data)
}

export const updatePostJobService = (data) => {
  return request.post('/postJob/updatePostJob', data)
}
