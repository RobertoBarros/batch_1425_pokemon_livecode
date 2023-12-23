import Mustache from "mustachejs";

const cardTemplate = document.getElementById('cardTemplate').innerHTML
const cardContainer = document.getElementById('cardsContainer')
const infoTemplate = document.getElementById('infoTemplate').innerHTML
const infoContainer = document.getElementById('infoContainer')


const url = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'

fetch(url)
  .then(response => response.json())
  .then((data) => {

    data.results.forEach((result) => {
      const detailUrl = result.url
      fetch(detailUrl)
      .then(response => response.json())
      .then((data) => {

        const info = {
          image: data.sprites.front_shiny,
          name: data.name,
          types: data.types.map((a_type) => { return a_type.type.name }).join(", ")
        }

        const output = Mustache.render(cardTemplate, info)
        cardContainer.insertAdjacentHTML('beforeend', output)

        document.getElementById(data.name).addEventListener('click', (event) => {
          event.preventDefault()
          const name = event.currentTarget.dataset.name
          const url = `https://pokeapi.co/api/v2/pokemon/${name}`
          fetch(url)
            .then(result => result.json())
            .then((data) => {

              const info = {
                image: data.sprites.front_default,
                name: data.name,
                abilities: data.abilities.map((an_ability) => { return an_ability.ability.name }).join(", ")
              }

              const output = Mustache.render(infoTemplate, info)
              infoContainer.innerHTML = output

            })


        })


      })

    })



  })
