const btn = document.querySelector('.input--button')
const divElemento = document.querySelector('.secao--resultados')
const input = document.querySelector('#input-busca')
const modalTitle = document.querySelector('.modal-title')
const modalBody = document.querySelector('.modal-body')
const secoesPrincipais = document.querySelector('main')

btn.addEventListener('click', async (e) => {
    secoesPrincipais.style.display = 'none'
    divElemento.innerHTML = ''
    
    const nome = input.value
    await acessaApi(nome)
})

async function acessaApi(nome) {

     await fetch('https://backend54.herokuapp.com/produtos', {
        method: "GET"
    }).then(res => res.json()).then(data => trabalhaApi(data, nome))
}

function trabalhaApi(data, nome) {
   
    const novoArray = data.filter((produto) => {

        const nomeProduto = produto.nome.toUpperCase()  
        return nomeProduto.includes(nome.toUpperCase()) ? produto : null
    })

    novoArray.length > 0 ? criaCard(novoArray) : criaTelaDeErro(nome)
}

function criaTelaDeErro(nome) {
    const titulo = document.createElement('h2')
    titulo.classList.add('titulo-erro')
    if (nome == 'oisamym') {
        titulo.textContent = 'bom dia linda me dá um beijinho'
    } else {
        titulo.textContent = 'Ops! Infelizmente não possuimos este produto.'
    }
    divElemento.appendChild(titulo)
}

function criaCard (arrayProdutos) {
    arrayProdutos.forEach(produto => {
        const divPrincipal = document.createElement('div')
        divPrincipal.classList.add('card-eco')
        const divImagem = document.createElement('div')
        divImagem.classList.add('card-img-eco')
        const img = document.createElement('img')
        img.src = produto.foto
        img.classList.add('card-img-top-eco')
        const divBody = document.createElement('div')
        divBody.classList.add('card-body-eco')
        const nomeProduto = document.createElement('h5')
        nomeProduto.classList.add('card-title-eco')
        nomeProduto.textContent = produto.nome
        const etiquetasProduto = document.createElement('p')
        etiquetasProduto.classList.add('card-text-eco')
        etiquetasProduto.textContent = produto.etiquetas
        const botaoProduto = document.createElement('a')
        botaoProduto.classList.add( 'button-produto-eco')
        botaoProduto.textContent = 'Ver mais'
        botaoProduto.setAttribute('data-bs-toggle', 'modal')
        botaoProduto.setAttribute('data-bs-target', '#exampleModal')
        escutadorModal(botaoProduto, produto)
        //
        divImagem.appendChild(img)
        divPrincipal.appendChild(divImagem)
        
        //

        divBody.appendChild(nomeProduto)
        divBody.appendChild(etiquetasProduto)
        divBody.appendChild(botaoProduto)

        // 

        divPrincipal.appendChild(divBody)
        // divGrid.appendChild(divPrincipal)
        divElemento.appendChild(divPrincipal)
        
    })

}

function escutadorModal (elemento, produto) {
    elemento.addEventListener('click', () => {
        populaModal(produto)
    })
}

function populaModal(produto) {
    modalBody.innerHTML = ''
    const titulo = produto.nome
    const informacoes = [produto.nomeEmpresa, produto.descricao, produto.valor]
    const referencias = ['Empresa: ', 'Descrição: ', 'Valor: R$ ']
    modalTitle.textContent = titulo
    const ul = document.createElement('ul')
    ul.classList.add('ul-eco')
    for (let i = 0; i < informacoes.length; i++) {
        const div = document.createElement('div')
        div.classList.add('div-eco')
        let span = document.createElement('span')
        span.classList.add('span-eco')
        let info = document.createElement('li')
        info.classList.add('li-eco')
        info.textContent = referencias[i] + informacoes[i]
        div.appendChild(span)
        div.appendChild(info)
        ul.appendChild(div)
    } 

    const icons = obtemIcones(produto.etiquetas.split(','))
    console.log(icons)
    modalBody.appendChild(ul)
    modalBody.appendChild(icons)
}

function obtemIcones (etiquetas){
    let icones = comparaEtiquetas(etiquetas)
    let iconesNovos = icones.map((el, i) => {
        if (!el) {
            return icones.splice(i, 1)
        } 
        return [el]
    })
    console.log(icones)
    console.log(iconesNovos)
    const mensagens = obtemMensagens(icones)
    const ul = document.createElement('ul')
    ul.classList.add('ul-icons')
    icones.forEach((el, i) => {
        console.log(el)
        const li = document.createElement('li')
        li.classList.add('li-icons')
        const img = document.createElement('img')
        img.classList.add('img-icons')
        img.src = `./assets/img/${el}`
        const span = document.createElement('span')
        span.classList.add('span-icons')
        span.textContent = mensagens[i]
        li.appendChild(img)
        li.appendChild(span)
        ul.appendChild(li)
    })

    return ul   
}

function comparaEtiquetas (array) {
    console.log(array)
    const imagens = ['animal.png', 'bio-degradavel.png', 'embalagem.png', 'sem-plastico.png', 'nacional.png', 'recycle.png', 'selo-verde.png']
    const regBio = /biodegrad/gi // bio-degradavel.png
    const regRecycle = /recicl/gi // recycle.png
    const regAnimal = /anima/gi // animal.png
    const regVeg = /vega?e?/gi // selo-verde.png
    const regPlan = /plan/gi // selo-verde.png
    const regNat = /natura/gi // selo-verde.png
    const regPlas = /pla?á?sti/gi // sem-plastico.png
    const regNaci = /naciona/gi // nacional.png
    const arrayFinal = array.map(el => {
        if (el.match(regRecycle)) {
            return 'recycle.svg'
        }
        if (el.match(regBio)) {
            return 'bio-degradavel.svg'
        }
        if (el.match(regAnimal)) {
            return 'animal.svg'
        }
        if (el.match(regVeg) || el.match(regPlan) || el.match(regNat)) {
            return 'selo-verde.svg'
        }
        if (el.match(regPlas)) {
            return 'sem-plastico.svg'
        }
        if (el.match(regNaci)) {
            return 'nacional.svg'
        }
        // return
    })
    return([... new Set(arrayFinal)])
}

function obtemMensagens(icones) {
    return icones.map(el => {
        switch (el) {
            case 'recycle.svg':
                return 'Este produto é reciclado'
            case 'bio-degradavel.svg':
                return 'Este produto é biodegradável'
            case 'animal.svg':
                return 'Este produto é de origem animal'
            case 'selo-verde.svg':
                return 'Este produto possui o selo verde'
            case 'sem-plastico.svg':
                return 'Este produto é livre de plásticos'
            case 'nacional.svg':
                return 'Este produto é de origem nacional.'
        }
    })

}
