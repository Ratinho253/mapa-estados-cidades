'use strict'

const mapa = document.querySelector('svg')

const getEstados = (event) => {
    const estado = event.target.id.replace('BR-','')
    console.log(estado);
    // preecherDados(estado)
}

mapa.addEventListener('click', getEstados)

