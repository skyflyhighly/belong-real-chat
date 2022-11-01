import { createAnimation } from '@ionic/vue'

/**
 * TODO: There is some pretty gnarly strings/math/values in this file.
 * It would be nice to find a way to better generalize it to
 * work with more screen sizes.
 */

const createRootAnimation = (baseEl: HTMLElement, opts?: object) => {
  const rootAnimation = createAnimation()
    .duration(600)
    .addElement(baseEl)
    .easing('cubic-bezier(0.32, 0.72, 0, 1)')

  const modalCloseButton = createAnimation()
    .addElement(document.querySelector('ion-button.done') as HTMLElement)
    .keyframes([
      { offset: 0, opacity: 0, transform: 'translate(-36px, -25px) scale(2)' },
      { offset: 1, opacity: 1, transform: 'translate(-22px, -51px) scale(1)' },
    ])

  const modalMoreButton = createAnimation()
    .addElement(document.querySelector('ion-icon.more') as HTMLElement)
    .keyframes([
      { offset: 0, opacity: 0, transform: 'translate(0px, 8px) scale(1.15)' },
      { offset: 1, opacity: 1, transform: 'translate(12px, -42px) scale(1)' },
    ])

  const homePageTitle = createAnimation()
    .addElement(document.querySelector('.header ion-title') as HTMLElement)
    .keyframes([
      { offset: 0, opacity: 1, transform: 'translate(0, 0) scale(1)' },
      { offset: 1, opacity: 0, transform: 'translate(0, -40px) scale(0.6)' },
    ])

  const homePageButton = createAnimation()
    .addElement(
      document.querySelector('.header ion-icon.add-to-wallet') as HTMLElement
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
  const allCards = Array.from(document.querySelectorAll('card-group'))
  let beforeCards: Element[] = []
  let afterCards: Element[] = []

  /**
   * TODO: See if you can find a way to do this without using a loop!
   */
  allCards.forEach((card) => {
    if (card === cardElement) {
      foundMainCard = true
    } else {
      if (foundMainCard) {
        afterCards.push(card)
      } else {
        beforeCards.push(card)
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
  presentingEl: HTMLElement,
  cardElement: HTMLElement
) => {
  const rootAnimation = createRootAnimation(baseEl, presentingEl, cardElement)
    .beforeAddClass('transaction-modal-hidden')
    .afterRemoveClass('transaction-modal-hidden')
    .fill('none')

  const transactionsList = createAnimation()
    .addElement(baseEl.querySelector('.transactions-list') as HTMLElement)
    .keyframes([
      { offset: 0, opacity: 0 },
      { offset: 1, opacity: 1 },
    ])

  const cardBBox = cardElement.getBoundingClientRect()
  const mainCard = createAnimation()
    .addElement(cardElement)
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
  presentingEl: HTMLElement,
  cardElement: HTMLElement
) => {
  const rootAnimation = createRootAnimation(baseEl, presentingEl, cardElement)
    .beforeAddWrite(() =>
      cardElement
        .querySelectorAll('.card-mask')
        .forEach((c) => c.classList.remove('card-mask'))
    )
    .beforeAddClass('transaction-modal-hidden')

  const cardBBox = cardElement.getBoundingClientRect()

  const allCards = Array.from(cardElement.querySelectorAll('card'))
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
    .onFinish(() => rootAnimation.destroy())

  const mainCardFinish = createAnimation()
    .addElement(cardElement)
    .keyframes([
      {
        offset: 0,
        transform: `translate(0, calc(-${
          cardBBox.top - 60 + secondaryCards.length * 10
        }px + var(--ion-safe-area-top) + ${totalCardOffset}px))`,
      },
      {
        offset: 1,
        transform: `translate(0, calc(-${
          cardBBox.top - 60 + secondaryCards.length * 10
        }px + var(--ion-safe-area-top)))`,
      },
    ])

  secondaryCards.forEach((card, i) => {
    const cardAnimation = createAnimation()
      .addElement(card)
      .keyframes([
        {
          offset: 0,
          transform: `translate(0, -${
            cardOffset * Math.abs(i - secondaryCards.length)
          }px)`,
        },
        {
          offset: 1,
          transform: `translate(${
            94 * Math.abs(i - secondaryCards.length)
          }vw, +${10 * Math.abs(i - secondaryCards.length)}px)`,
        },
      ])

    rootAnimationFinish.addAnimation(cardAnimation)
  })

  rootAnimationFinish.addAnimation([mainCardFinish])

  const mainCard = createAnimation()
    .addElement(cardElement)
    .keyframes([
      { offset: 0, transform: 'translate(0, 0)' },
      {
        offset: 1,
        transform: `translate(0, calc(-${
          cardBBox.top - 60
        }px + var(--ion-safe-area-top) + ${totalCardOffset}px))`,
      },
    ])
    .onFinish(() => rootAnimationFinish.play())

  secondaryCards.forEach((card, i) => {
    const cardAnimation = createAnimation()
      .addElement(card)
      .keyframes([
        { offset: 0, transform: 'translate(0, 0)' },
        {
          offset: 1,
          transform: `translate(0, -${
            cardOffset * Math.abs(i - secondaryCards.length)
          }px)`,
        },
      ])

    rootAnimation.addAnimation(cardAnimation)
  })

  return rootAnimation.addAnimation([mainCard])
}
