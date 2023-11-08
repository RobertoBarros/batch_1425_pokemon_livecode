import Mustache from "mustachejs";

const cardTemplate = document.getElementById('cardTemplate').innerHTML
const cardContainer = document.getElementById('cardsContainer')


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
      })
    })

  })
