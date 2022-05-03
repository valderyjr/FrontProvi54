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
    // const nomeEmpresa = produto.nomeEmpresa
    // const descricao = produto.descricao
    // const valor = produto.valor
    // const etiquetas = produto.etiquetas
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
    modalBody.appendChild(ul)
    // let arrayFilhos = []
    // let filho = pai.childNodes
    // for (let i = 0; i < 6; i++) {
    //     arrayFilhos.push(filho[i])
    // }

    // const titulo = arrayFilhos[0]
    // modalTitle.textContent = titulo.data
    // arrayFilhos.splice(0, 1)

    // arrayFilhos.forEach((filho, i) => {
    //     if (filho.tagName == 'IMG') {
    //         criaImagemModal(filho)
    //         arrayFilhos.splice(0, 1)
    //     }
    // })
    // criaInfoModal(filho[5])
}


function criaImagemModal(elemento) {
    const imgModal = document.createElement('img')
    imgModal.src = elemento.src
    imgModal.classList.add('img-modal')
    modalBody.appendChild(imgModal)
}
