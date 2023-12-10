import request from '@/utils/request'

export const getJobListService = (data) => {
  const { pageNum, pageSize, userId, fuzzySearch, state } = data
  const url = `/getJob/getJobList?pageNum=${pageNum}&pageSize=${pageSize}&userId=${userId}&fuzzySearch=${fuzzySearch}&state=${state}`
  return request.get(url)
}
export const deleteGetJobByIdService = (id) => {
  const url = `/getJob/deleteGetJob?id=${id}`
  return request.delete(url)
}

export const addgetJobService = (data) => {
  return request.post('/getJob/addGetJob', data)
}

export const updateGetJobService = (data) => {
  return request.post('/getJob/updateGetJob', data)
}
