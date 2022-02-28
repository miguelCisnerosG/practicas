const nums = document.querySelectorAll('.nums span')
const counter = document.querySelector('.counter')
const finalMessage = document.querySelector('.final')
const replay = document.querySelector('#replay')

// En cuanto se cargue la pagina va a ejecutar esta funcion y lo mismo dentro de esta se va a mandar a llamar a otras
runAnimation()

function resetDOM() {
  counter.classList.remove('hide')
  finalMessage.classList.remove('show')

  nums.forEach((num) => {
    num.classList.value = ''
  })

  nums[0].classList.add('in')
}

// mira esta es una declaracion sencilla de funcion si la decaras como una funcion flecha es lo mismo
function runAnimation() {
  nums.forEach((num, idx) => {
    const nextToLast = nums.length - 1

    num.addEventListener('animationend', (e) => {
      if (e.animationName === 'goIn' && idx !== nextToLast) {
        num.classList.remove('in')
        num.classList.add('out')
      } else if (e.animationName === 'goOut' && num.nextElementSibling) {
        num.nextElementSibling.classList.add('in')
      } else {
        counter.classList.add('hide')
        finalMessage.classList.add('show')
      }
    })
  })
}

// de esta manera agregamos eventos al documento. A la pagina pues
// Todo esto de manipulacion del DOM lo vamos a ver en el curso de javascript en el navegador
// pero de todos modos yo te voy a explicar tu tranqui
replay.addEventListener('click', () => {
  resetDOM()
  runAnimation()
})
