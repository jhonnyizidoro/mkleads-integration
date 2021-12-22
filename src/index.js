const _mkLeads = () => {
  const createElement = (tagName, className = '') => {
    const element = document.createElement(tagName)
    element.className = className
    return element
  }

  const removeElement = selector => {
    const element = document.querySelector(selector)
    element.remove()
  }

  const getIframeUrl = () => {
    let params = ''

    Object.keys(window.MKLeads).forEach(key => {
      params += `${key}=${window.MKLeads[key]}&`
    })

    return `https://mkleads-v2.vercel.app?${params}`
  }

  const createModal = () => {
    const modal = createElement('div', 'mkleads__modal')
    const content = createElement('div', 'mkleads__modal__content')
    const iframe = createElement('iframe', 'mkleads__modal__iframe')
    const button = createElement('button', 'mkleads__modal__button')

    iframe.src = getIframeUrl()

    button.type = 'button'
    button['aria-label'] = 'Fechar janela'
    button.innerText = '×'
    button.addEventListener('click', () => removeElement('.mkleads__modal'))

    content.append(button)
    content.append(iframe)
    modal.append(content)
    document.body.append(modal)
  }

  const createPopup = () => {
    const popup = createElement('div', 'mkleads__popup')
    const header = createElement('div', 'mkleads__popup__header')
    const title = createElement('div', 'mkleads__popup__title')
    const button = createElement('button', 'mkleads__popup__button')
    const closeButton = createElement(
      'button',
      'mkleads__popup__close icon icon--angle-right'
    )

    title.innerText = 'Gostou desse veículo?'

    button.type = 'button'
    button.innerText = 'Faça uma proposta'
    button.addEventListener('click', createModal)

    closeButton.type = 'button'
    closeButton['aria-label'] = 'Fechar popup'
    closeButton.addEventListener('click', () => removeElement('.mkleads__popup'))

    header.append(title)
    header.append(closeButton)
    popup.append(header)
    popup.append(button)
    document.body.append(popup)
  }

  return () => {
    createPopup()
    createModal()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  _mkLeads()()
})
