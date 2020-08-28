export class Api {
  constructor({ url, token}) {
    this._url = url
    this._token = token
  }

  getInitialCards() {
    return fetch(`${this._url}${'/cards'}`, {
      headers: {
        authorization: this._token
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }

  likeCardToggle(id, isLiked, counter, likeBtn) {
    if (!isLiked) {

      this._setlike(id)
      .then((res) => {
        likeBtn.classList.toggle('element__like-button_pressed')
        counter.textContent = parseInt(res.likes.length)
      })
      .catch(err => console.log(err))

    } else if (isLiked) {
      
      this._removeLike(id)
      .then((res) => {
        likeBtn.classList.toggle('element__like-button_pressed')
        counter.textContent = parseInt(res.likes.length)
      })
      .catch(err => console.log(err))
    }
  }

  _setlike(id) {
    return fetch(`${this._url}${'/cards/likes'}/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }

  _removeLike(id) {
    return fetch(`${this._url}${'/cards/likes'}/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }
  
  getUserInfo() {
    return fetch(`${this._url}${'/users/me'}`, {
      headers: {
        authorization: this._token
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }

  setUserInfo(name, about) {
    return fetch(`${this._url}${'/users/me'}`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then((res) => {
      if (res.ok) {
        return res
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }

  setAvatar(avatar) {
    return fetch(`${this._url}${'/users/me/avatar'}`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then((res) => {
      if (res.ok) {
        return res
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }

  createCard(name, link) {
    return fetch(`${this._url}${'/cards'}`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })  
    .catch((err) => console.log(err))
  }

  deleteCard(id) {
    return fetch(`${this._url}${'/cards'}/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch((err) => console.log(err))
  }
}