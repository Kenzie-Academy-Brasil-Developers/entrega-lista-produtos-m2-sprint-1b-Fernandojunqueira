// seu código aqui

const tagUl  = document.querySelector('ul')
const Button = document.querySelector('.containerBuscaPorNome button')
const inputPesquisar = document.querySelector('.campoBuscaPorNome')
const botoes         = document.querySelector('#botoesContainer')
const valorProdutos  = document.querySelector('.priceContainer')
console.log(valorProdutos)


function listarProdutos (array,callback){

    tagUl.innerHTML = ''
    let newArray = []

    for(let i = 0; i < array.length; i++){

        let card = callback(array[i])
        tagUl.appendChild(card)
    }
    
    return newArray
}

function criarHtmlCard(Element){

    const tagLi   = document.createElement('li')
    const tagImg  = document.createElement('img')
    const tagH3   = document.createElement('h3')
    const tagSpan = document.createElement('span')
    const tagP    = document.createElement('p')

    tagLi.appendChild(tagImg)
    tagLi.appendChild(tagH3)
    tagLi.appendChild(tagSpan)
    tagLi.appendChild(tagP)

    tagImg.src        = Element.img 
    tagImg.alt        = `imagem ${Element.nome}`
    tagH3.innerText   = Element.nome
    tagSpan.innerText = Element.categoria
    tagP.innerText    = `R$ ${Element.preco.toFixed(2)}`.replace('.',',') 


    return tagLi
}
        
listarProdutos (produtos,criarHtmlCard)

Button.addEventListener('click',function(){

    let pesquisaUsuario = inputPesquisar.value
    let result          = pesquisar(pesquisaUsuario)

    if(result.length !== 0){

        listarProdutos(result,criarHtmlCard)
    }

    let section = criarTotais(result)
    let span    = document.createElement('span')
    let ver     = section.appendChild(span)
    let preco   = result.reduce((valorInical,valorAtual) => valorInical+valorAtual.preco,0)
    span.innerText = `R$ ${preco.toFixed(2)}`.replace('.',',')
    


})

function pesquisar(string){

    let resultadoBusca = []
    
    for( let i = 0; i < produtos.length; i++){

        if(string.trim().toLowerCase() == produtos[i].nome.toLowerCase() && string.trim().toLowerCase() !== ''){
            
            resultadoBusca.push(produtos[i])
            inputPesquisar.value = ''
        }
    }
    inputPesquisar.value = ''
    return resultadoBusca
}

botoes.addEventListener('click',function(event){

    tagUl.innerHTML = ''
    
    let tag    = event.target.innerText
    let result = pesquisarTag(tag)
    console.log(result)
    // if(tag == 'Todos Produtos'){
    //     listarProdutos(produtos,criarHtmlCard)
    //     let span    = document.createElement('span')
    //     span.innerText = ''
    //     let section = criarTotais(result)
        
    //     let ver     = section.appendChild(span)
    //     let preco   = produtos.reduce((valorInical,valorAtual) => valorInical+valorAtual.preco,0)
    //     span.innerText = `R$ ${preco.toFixed(2)}`.replace('.',',')
        
    // }

    
         let section = criarTotais(result)
        let span    = document.createElement('span')
        let ver     = section.appendChild(span)
        let preco   = result.reduce((valorInical,valorAtual) => valorInical+valorAtual.preco,0)
        span.innerText = `R$ ${preco.toFixed(2)}`.replace('.',',')
    
    
    
    

    if(result.length !== 0){

        listarProdutos(result,criarHtmlCard)
    }

})

function pesquisarTag(string){
    let resultadoBusca = []
    
    if(string == 'Todos Produtos'){
        return produtos
    }
    for( let i = 0; i < produtos.length; i++){

        if(produtos[i].secao === string){
            
            resultadoBusca.push(produtos[i])
            
        }
    }
    
    return resultadoBusca
}

function criarTotais(array){

    valorProdutos.innerHTML = ''
    let priceContainer = document.createElement('div')

    priceContainer.innerHTML = `  
    
        <img src="./src/img/alert-circle.png" alt="exclamação de alerta">
        <p>Valor total dos produtos da sessão selecionada</p>
    
    `

    valorProdutos.appendChild(priceContainer)
    return valorProdutos
}
