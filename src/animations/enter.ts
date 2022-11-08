import { createAnimation } from '@ionic/vue'

/**
 * TODO: There is some pretty gnarly strings/math/values in this file.
 * It would be nice to find a way to better generalize it to
 * work with more screen sizes.
 */

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

  const modalCloseButton = createAnimation()
    .addElement(baseEl.querySelector('ion-button.modal-close') as HTMLElement)
    .keyframes([
      { offset: 0, opacity: 0, transform: 'translate(-36px, -25px) scale(2)' },
      { offset: 1, opacity: 1, transform: 'translate(-22px, -51px) scale(1)' },
    ])

  const modalMoreButton = createAnimation()
    .addElement(baseEl.querySelector('ion-icon.modal-more') as HTMLElement)
    .keyframes([
      { offset: 0, opacity: 0, transform: 'translate(0px, 8px) scale(1.15)' },
      { offset: 1, opacity: 1, transform: 'translate(12px, -42px) scale(1)' },
    ])

  const homePageTitle = createAnimation()
    .addElement(baseEl.querySelector('.header ion-title') as HTMLElement)
    .keyframes([
      { offset: 0, opacity: 1, transform: 'translate(0, 0) scale(1)' },
      { offset: 1, opacity: 0, transform: 'translate(0, -40px) scale(0.6)' },
    ])

  const homePageButton = createAnimation()
    .addElement(
      baseEl.querySelector('.header ion-icon.add-to-wallet') as HTMLElement
    )
    .keyframes([
      { offset: 0, opacity: 1, transform: 'translate(0, 0) scale(1)' },
      {
        offset: 1,
        opacity: 0.1,
        transform: 'translate(12px, -50px) scale(0.85)',
      },
    ])

  /**
   * This lets us control which direction
   * each of the cards go. Given a tapped card,
   * cards below it should move down and away but
   * cards above it should move up and away.
   */
  let foundMainCard = false
  const allCards = Array.from(baseEl.querySelectorAll('.card-group'))
  let beforeCards = [] as HTMLElement[]
  let afterCards = [] as HTMLElement[]

  /**
   * TODO: See if you can find a way to do this without using a loop!
   */
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
      { offset: 0.4, transform: 'translate(0, -20px) scale(0.4)', opacity: 0 },
      { offset: 1, transform: 'translate(0, -20px) scale(0.4)', opacity: 0 },
    ])

  const afterCardsAnimation = createAnimation()
    .addElement(afterCards)
    .keyframes([
      { offset: 0, transform: 'translate(0, 0)' },
      { offset: 1, transform: 'translate(0, 100vh)' },
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

export const createTransactionEnterAnimation = (
  baseEl: HTMLElement,
  opts: object,
  presentingEl: HTMLElement,
  elementRef?: EventTarget | null
) => {
  const cardElement = elementRef as HTMLElement
  const rootAnimation = createRootAnimation(
    baseEl,
    presentingEl,
    opts,
    cardElement,
    500
  )
    .beforeAddClass('transaction-modal-hidden')
    .afterRemoveClass('transaction-modal-hidden')
    .fill('none')

  const transactionsList = createAnimation()
    .addElement(baseEl.querySelector('.transactions-list') as HTMLElement)
    .keyframes([
      { offset: 0, opacity: 0 },
      { offset: 1, opacity: 1 },
    ])

  const parentElement = cardElement?.parentElement?.parentElement
    ?.parentElement as HTMLElement
  const cardBBox = parentElement.getBoundingClientRect()
  const mainCard = createAnimation()
    .addElement(parentElement)
    .easing('cubic-bezier(0.17, 0.67, 0.22, 1.26)')
    .keyframes([
      { offset: 0, transform: 'translate(0, 0)' },
      {
        offset: 1,
        transform: `translate(0, calc(-${
          cardBBox.top - 60
        }px + var(--ion-safe-area-top)))`,
      },
    ])

  return rootAnimation.addAnimation([transactionsList, mainCard])
}

export const createGenericEnterAnimation = (
  baseEl: HTMLElement,
  opts: object,
  presentingEl: HTMLElement,
  elementRef?: EventTarget | null
) => {
  const cardElement = elementRef as HTMLElement
  const rootAnimation = createRootAnimation(
    baseEl,
    presentingEl,
    opts,
    cardElement,
    1400
  )
    .beforeAddWrite(
      () =>
        document
          .querySelectorAll('.card-mask')
          .forEach((c) => c.classList.remove('card-mask')) // change .card-mask
    )
    .beforeAddClass('transaction-modal-hidden')

  const parentElement = cardElement.parentElement?.parentElement
    ?.parentElement as HTMLElement
  const cardBBox = parentElement.getBoundingClientRect()

  const allCards = Array.from(parentElement.querySelectorAll('.card'))
  const primaryCard = allCards[allCards.length - 1]
  const secondaryCards = allCards.slice(0, allCards.length - 1)

  const cardOffset = 50
  const totalCardOffset = cardOffset * secondaryCards.length

  const rootAnimationFinish = createAnimation()
    .fill('none')
    .duration(rootAnimation.getDuration())
    .easing(rootAnimation.getEasing())
    .addElement(rootAnimation.elements)
    .afterRemoveClass('transaction-modal-hidden')

  /**
   * We need to destroy the root animation
   * here, otherwise we get conflicting animation objects
   * when we dismiss the modal.
   * We can't use fill: none on the rootAnimation
   * because it finishes before the entire animation.
   * and we'd get some flickering.
   * Maybe a problem we can solve in Ionic Animations
   * via a feature?
   */
  // .onFinish(() => rootAnimation.destroy())
  // const rootAnimationFinish = createRootAnimation(
  //   baseEl,
  //   presentingEl,
  //   opts,
  //   cardElement
  // )

  const mainCard = createAnimation()
    .addElement(parentElement)
    .keyframes([
      { offset: 0, transform: 'translate(0, 0)', opacity: 1 },
      {
        offset: 0.4,
        transform: `translate(0, calc(-${
          cardBBox.top - 60
        }px + var(--ion-safe-area-top) + ${totalCardOffset}px))`,
        opacity: 1,
      },
      {
        offset: 0.6,
        transform: `translate(0, calc(-${
          cardBBox.top - 60
        }px + var(--ion-safe-area-top) + ${totalCardOffset}px))`,
        opacity: 1,
      },
      {
        offset: 1,
        transform: `translate(0, calc(-${
          cardBBox.top - 60 + secondaryCards.length * 10
        }px + var(--ion-safe-area-top)))`,
        opacity: 1,
      },
    ])
    .onFinish(() => rootAnimationFinish.play())

  secondaryCards.forEach((card, i) => {
    const cardAnimation = createAnimation()
      .addElement(card)
      .keyframes([
        { offset: 0, transform: 'translate(0, 0)', opacity: 1 },
        {
          offset: 0.4,
          transform: `translate(0, -${
            cardOffset * Math.abs(i - secondaryCards.length)
          }px)`,
          opacity: 1,
        },
        {
          offset: 0.6,
          transform: `translate(0, -${
            cardOffset * Math.abs(i - secondaryCards.length)
          }px)`,
          opacity: 1,
        },
        {
          offset: 1,
          transform: `translate(${
            94 * Math.abs(i - secondaryCards.length)
          }vw, +${10 * Math.abs(i - secondaryCards.length)}px)`,
          opacity: 1,
        },
      ])

    rootAnimation.addAnimation(cardAnimation)
  })

  return rootAnimation.addAnimation([mainCard])
}
