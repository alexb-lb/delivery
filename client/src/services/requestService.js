import localStorageService, { TOKEN_KEY } from 'services/localStorageService'

const errorHandler = (error) => {
  if (typeof (error.status) !== 'string') {
    console.log(error.statusText)
  }

  return {}
}

class RequestService {
  constructor() {
    this.baseUrl = process.env.BACKEND_URL
    this.params = {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
    }

    const token = localStorageService.getItem(TOKEN_KEY)
    if (token) this.setAuthToken(token)
  }

  async request({ url, method = 'GET', data = null, setOnceToken = null }) {
    try {
      const params = { ...this.params }

      if (method.toLowerCase() !== 'get') {
        params.method = 'POST'
        params.body = JSON.stringify(data)
      }

      if (setOnceToken) {
        params.headers = { ...params.headers, 'Authorization': `Bearer ${setOnceToken}` }
      }

      const serverResponse = await fetch(this.baseUrl + url, params)
      const [response, json] = await Promise.all([serverResponse, serverResponse.json()])

      if (!response.ok) return errorHandler(response)

      return json
    } catch (error) {
      alert(error.message)
      return {}
    }
  }

  setAuthToken(token) {
    this.params.headers = { ...this.params.headers, 'Authorization': `Bearer ${token}` }
  }

  removeAuthToken() {
    delete this.params.headers.Authorization
  }
}

export default new RequestService()

