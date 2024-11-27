export class Query {
  private name: string

  constructor (name: string) {
    this.name = name
  }

  private static auth = (): { Authorization: string } => ({
    Authorization: `Bearer ${localStorage.getItem('jwt')}`
  })

  async $getAll (params?: any): Promise<any> {
    const query = new URLSearchParams(params || {}).toString() || ''
    const response = await fetch(
      `${process.env.VUE_APP_API_URL}/${this.name}?${query}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          ...Query.auth()
        }
      }
    )
    if (!response.ok) {
      console.log(`Ошибка HTTP: ${response.status}`)
      return
    }
    return response.json()
  }

  async $get (id: number): Promise<any> {
    const response = await fetch(`${process.env.VUE_APP_API_URL}/${this.name}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        ...Query.auth()
      }
    })
    if (!response.ok) {
      console.log(`Ошибка HTTP: ${response.status}`)
      return
    }
    return response.json()
  }

  async $post (params: any): Promise<any> {
    const response = await fetch(`${process.env.VUE_APP_API_URL}/${this.name}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        ...Query.auth()
      },
      body: JSON.stringify({
        ...params
      })
    })
    if (!response.ok) {
      console.log(`Ошибка HTTP: ${response.status}`)
      return
    }
    return response.json()
  }

  async $patch (id: number, params: any): Promise<any> {
    const response = await fetch(`${process.env.VUE_APP_API_URL}/${this.name}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        ...Query.auth()
      },
      body: JSON.stringify({
        ...params
      })
    })
    if (!response.ok) {
      console.log(`Ошибка HTTP: ${response.status}`)
      return
    }
    return response.json()
  }

  async $delete (id: number): Promise<any> {
    const response = await fetch(`${process.env.VUE_APP_API_URL}/${this.name}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        ...Query.auth()
      }
    })
    if (!response.ok) {
      console.log(`Ошибка HTTP: ${response.status}`)
      return
    }
    return response.json()
  }
}
