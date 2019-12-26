import axios from 'axios'
import * as config from './config'

const getJsonData = (path) => axios.get(`${config.BACKEND_SERVER_URL}${path}`)
  .then(response => response.data)

const postJsonData = (path, jsonData) => axios.post(`${config.BACKEND_SERVER_URL}${path}`, jsonData)
  .then(response => response.data)

const deleteJsonData = (path) => axios.delete(`${config.BACKEND_SERVER_URL}${path}`)
  .then(response => response.data)

export const getShopList = () => getJsonData('/apis/shops')

export const getProductList = () => getJsonData('/apis/products')

export const getOrderList = () => getJsonData('/apis/orders')

export const postOrder = (payload) => postJsonData('/apis/orders', payload)

export const deleteOrder = (id) => deleteJsonData(`/apis/orders/${id}`)

export const postTask = (topic) => postJsonData('/apis/tasks', {topic})

export const getTaskStatus = (taskId) => getJsonData(`/apis/tasks/${taskId}/status`)

export const downloadTaskResult = (taskId) => axios({
  url: `${config.BACKEND_SERVER_URL}/apis/tasks/${taskId}/result`,
  method: 'GET',
  responseType: 'blob', // important
}).then((response) => {
  console.log(response.headers)
  const [, filename] = /filename="([^"]+)"/.exec(response.headers['content-disposition'])
  console.log(filename)
  const url = window.URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement('a')
  link.href = url;
  link.setAttribute('download', filename)
  document.body.appendChild(link);
  link.click();
});
