const _mkLeads = () => {
  const createElement = (tagName, className) => {
    const element = document.createElement(tagName)
    if (className) {
      element.classList.add(className)
    }
    return element
  }

  const removeElement = selector => {
    const element = document.querySelector(selector)
    element.remove()
  }

  const getIframeUrl = () => {
    const { id, title, value, image, whatsApp, address, phone, email, storeId } =
      window.MKLeads

    const params = `
			id=${id}&
			title=${title}&
			value=${value}&
			image=${image}&
			whatsApp=${whatsApp}&
			address=${address}&
			phone=${phone}&
			email=${email}&
			storeId=${storeId}
		`.replace(/(\r\n|\n|\r|\t)/gm, '')

    return `https://mkleads-v2.vercel.app?${params}`
  }

  const createModal = () => {
    const modal = createElement('div', 'mkleads__modal')
    const iframe = createElement('iframe', 'mkleads__modal__iframe')
    const button = createElement('button', 'mkleads__modal__button')

    iframe.src = getIframeUrl()

    button.type = 'button'
    button['aria-label'] = 'Fechar janela'
    button.innerText = '×'
    button.addEventListener('click', () => removeElement('.mkleads__modal'))

    modal.append(iframe)
    modal.append(button)
    document.body.append(modal)
  }

  const createPopup = () => {
    const popup = createElement('div', 'mkleads__popup')
    const title = createElement('div', 'mkleads__popup__title')
    const button = createElement('button', 'mkleads__popup__button')
    const closeButton = createElement('button', 'mkleads__popup__close')

    title.innerText = 'Gostou desse veículo?'

    button.type = 'button'
    button['aria-label'] = 'Faça uma proposta nesse veículo'
    button.innerText = 'Faça uma proposta'
    button.addEventListener('click', createModal)

    closeButton.type = 'button'
    closeButton['aria-label'] = 'Fechar popup'
    closeButton.innerText = '×'
    closeButton.addEventListener('click', () => removeElement('.mkleads__popup'))

    popup.append(title)
    popup.append(button)
    popup.append(closeButton)
    document.body.append(popup)
  }

  return () => {
    createPopup()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  _mkLeads()()
})
