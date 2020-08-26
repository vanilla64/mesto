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
    .then(res => res.json())
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
        console.log(res.likes)
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
    .then(res => res.json())
  }

  _removeLike(id) {
    return fetch(`${this._url}${'/cards/likes'}/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
  }
  
  getUserInfo() {
    return fetch(`${this._url}${'/users/me'}`, {
      headers: {
        authorization: this._token
      }
    })
    .then(res => res.json())
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
    .then(res => res.json())
    .catch((err) => console.log(err))
  }

  deleteCard(id) {
    return fetch(`${this._url}${'/cards'}/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
      // body: JSON.stringify({
      //   _id: id
      // })
    })
      .then(res => res.json())
      .catch((err) => console.log(err))
  }
}