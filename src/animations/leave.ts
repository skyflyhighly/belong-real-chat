import { createAnimation } from '@ionic/vue'

const createRootAnimation = (
  baseEl: HTMLElement,
  presentingEl: HTMLElement,
  opts: object,
  elementRef?: HTMLElement,
  duration?: number
) => {
  const rootAnimation = createAnimation()
    .duration(duration || 600)
    .addElement(baseEl)
    .easing('cubic-bezier(0.32, 0.72, 0, 1)')
    .beforeAddClass('transaction-modal-hidden')
    .afterRemoveClass('transaction-modal-hidden')

  const modalCloseButton = createAnimation()
    .addElement(baseEl.querySelector('ion-button.modal-close') as HTMLElement)
    .keyframes([
      { offset: 0, opacity: 1, transform: 'translate(-22px, -51px) scale(1)' },
      { offset: 1, opacity: 0, transform: 'translate(-36px, -25px) scale(2)' },
    ])

  const modalMoreButton = createAnimation()
    .addElement(baseEl.querySelector('ion-icon.modal-more') as HTMLElement)
    .keyframes([
      { offset: 0, opacity: 1, transform: 'translate(12px, -42px) scale(1)' },
      { offset: 1, opacity: 0, transform: 'translate(0px, 8px) scale(1.15)' },
    ])

  const homePageTitle = createAnimation()
    .addElement(baseEl.querySelector('.header ion-title') as HTMLElement)
    .keyframes([
      { offset: 0, opacity: 0, transform: 'translate(0, -40px) scale(0.6)' },
      { offset: 1, opacity: 1, transform: 'translate(0, 0) scale(1)' },
    ])

  const homePageButton = createAnimation()
    .addElement(
      baseEl.querySelector('.header ion-icon.add-to-wallet') as HTMLElement
    )
    .keyframes([
      {
        offset: 0,
        opacity: 0.1,
        transform: 'translate(12px, -50px) scale(0.85)',
      },
      { offset: 1, opacity: 1, transform: 'translate(0, 0) scale(1)' },
    ])

  let foundMainCard = false
  const allCards = Array.from(baseEl.querySelectorAll('.card-group'))
  let beforeCards = [] as HTMLElement[]
  let afterCards = [] as HTMLElement[]

  const cardElement = elementRef?.parentElement?.parentElement?.parentElement
  allCards.forEach((card) => {
    if (card === cardElement) {
      foundMainCard = true
    } else {
      if (foundMainCard) {
        afterCards.push(card as HTMLElement)
      } else {
        beforeCards.push(card as HTMLElement)
      }
    }
  })

  const beforeCardsAnimation = createAnimation()
    .addElement(beforeCards)
    .keyframes([
      { offset: 0, transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { offset: 1, transform: 'translate(0, -20px) scale(0.8)', opacity: 0 },
    ])

  const afterCardsAnimation = createAnimation()
    .addElement(afterCards)
    .keyframes([
      { offset: 0, transform: 'translate(0, 100vh)' },
      { offset: 1, transform: 'translate(0, 0)' },
    ])

  return rootAnimation.addAnimation([
    modalCloseButton,
    modalMoreButton,
    homePageTitle,
    homePageButton,
    beforeCardsAnimation,
    afterCardsAnimation,
  ])
}

export const createTransactionLeaveAnimation = (
  baseEl: HTMLElement,
  opts: object,
  presentingEl: HTMLElement,
  elementRef: HTMLElement,
  translateCardElement?: HTMLElement
) => {
  const cardElement = elementRef as HTMLElement

  const rootAnimation = createRootAnimation(
    baseEl,
    presentingEl,
    opts,
    cardElement
  )

  const transactionsList = createAnimation()
    .addElement(baseEl.querySelectorAll('.transactions-list'))
    .keyframes([
      { offset: 0, opacity: 1 },
      { offset: 1, opacity: 0 },
    ])

  const parentElement = cardElement?.parentElement?.parentElement as HTMLElement

  const cardBBox = parentElement.getBoundingClientRect()
  const mainCard = createAnimation()
    .addElement(parentElement)
    .easing('cubic-bezier(0.17, 0.67, 0.22, 1.26)')
    .keyframes([
      {
        offset: 0,
        transform: `translate(0, calc(-${
          cardBBox.top - 60
        }px + var(--ion-safe-area-top)))`,
      },
      {
        offset: 1,
        transform: `translate(0, calc(${
          cardBBox.top + 30
        }px + var(--ion-safe-area-top)))`,
      },
    ])

  return rootAnimation.addAnimation([transactionsList, mainCard])
}

export const createGenericLeaveAnimation = (
  baseEl: HTMLElement,
  opts: object,
  presentingEl: HTMLElement,
  elementRef: HTMLElement,
  translateCardElement?: HTMLElement
) => {
  const cardElement = elementRef as HTMLElement
  const rootAnimation = createRootAnimation(
    baseEl,
    presentingEl,
    opts,
    cardElement,
    800
  ).afterAddWrite(() =>
    document
      .querySelectorAll('.card-mask')
      .forEach((c) => c.classList.add('card-mask'))
  )

  const parentElement = cardElement?.parentElement?.parentElement
    ?.parentElement as HTMLElement
  const translateParentElement = translateCardElement?.parentElement
    ?.parentElement as HTMLElement
  const cardBBox = translateParentElement.getBoundingClientRect()

  const allCards = Array.from(parentElement.querySelectorAll('.card'))
  const primaryCard = allCards[allCards.length - 1]
  const secondaryCards = allCards.slice(0, allCards.length)

  const cardOffset = 50
  const totalCardOffset = cardOffset * secondaryCards.length

  const mainCard = createAnimation()
    .addElement(cardElement)
    .keyframes([
      {
        offset: 0,
        transform: `translate(${cardBBox.x}px, 0)`,
      },
      {
        offset: 1,
        transform: `translate(${cardBBox.x}px, calc(${cardBBox.top - 60}px)`,
      },
    ])
    .onFinish(() => rootAnimation.play())

  secondaryCards.forEach((card, i) => {
    const cardAnimation = createAnimation()
      .addElement(card)
      .easing('cubic-bezier(0.32, 0.72, 0, 1)')
      .keyframes([
        {
          offset: 0,
          transform: `translate(0, 0)`,
        },
        {
          offset: 1,
          transform: `translate(calc(-${94 * i}vw + ${cardBBox.x}px), ${
            cardBBox.top - 70 + 10 * (i + 1)
          }px)`,
        },
      ])

    rootAnimation.addAnimation(cardAnimation)
  })

  return rootAnimation.addAnimation([mainCard])
}
