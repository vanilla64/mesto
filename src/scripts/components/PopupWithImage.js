import Popup from "./Popup.js";

export class PopupWithImage extends Popup {

  open({ location, link }) {
    const photoPopupImg = this._popup.querySelector('.popup__image')

    photoPopupImg.src = link
    photoPopupImg.alt = location
    this._popup.querySelector('.popup__description').textContent = location

    super.open()
  }
}