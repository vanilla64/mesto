export class UserInfo {
  constructor({ nameSelerctor, aboutSelerctor }) {
    this._nameSelerctor = nameSelerctor
    this._aboutSelerctor = aboutSelerctor
  }

  getUserInfo() {
    const objInfo = { 
      name: this._nameSelerctor.textContent, 
      about: this._aboutSelerctor.textContent
    }

    return objInfo
  }

  setUserInfo(name, about) {
    this._nameSelerctor.textContent = name
    this._aboutSelerctor.textContent = about
  }
}