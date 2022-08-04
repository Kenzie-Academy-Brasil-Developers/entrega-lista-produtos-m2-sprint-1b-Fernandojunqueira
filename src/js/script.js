// seu código aqui

const vitrinePrincipalProdutos  = document.querySelector('ul')
const btnPesquisa = document.querySelector('.containerBuscaPorNome button')
const inputPesquisar = document.querySelector('.campoBuscaPorNome')
const secao         = document.querySelector('#botoesContainer')
const valorProdutos  = document.querySelector('.priceContainer')
console.log(valorProdutos)


function listarProdutos (array,callback){

    vitrinePrincipalProdutos.innerHTML = ''
    let arrayDeProdutos = []
    
    array.forEach(Element => {
        
        let card = callback(Element)
        vitrinePrincipalProdutos.appendChild(card)
    })
    // for(let i = 0; i < array.length; i++){

    //     let card = callback(array[i])
    //     vitrinePrincipalProdutos.appendChild(card)
    // }
    
    return arrayDeProdutos
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

btnPesquisa.addEventListener('click',function(){

    let pesquisaUsuario = inputPesquisar.value
    let result          = pesquisar(pesquisaUsuario)

    if(result.length !== 0){

        listarProdutos(result,criarHtmlCard)
    }

    let valorTotalProdutos = criarTotais(result)
    let valorSomaTotal    = document.createElement('span')
    let preco   = result.reduce((valorInical,valorAtual) => valorInical+valorAtual.preco,0)

    valorTotalProdutos.appendChild(valorSomaTotal)
    valorSomaTotal.innerText = `R$ ${preco.toFixed(2)}`.replace('.',',')
    


})

function pesquisar(string){

    
    const result = produtos.filter(element => element.nome.toLowerCase() == string.trim().toLowerCase())

    inputPesquisar.value = ''
    return result
}

secao.addEventListener('click',function(event){

    vitrinePrincipalProdutos.innerHTML = ''
    
    let tag    = event.target.innerText
    let result = pesquisarTag(tag)
    
        let valorTotalProdutos = criarTotais(result)
        let span    = document.createElement('span')
        let ver     = valorTotalProdutos.appendChild(span)
        let preco   = result.reduce((valorInical,valorAtual) => valorInical+valorAtual.preco,0)
        span.innerText = `R$ ${preco.toFixed(2)}`.replace('.',',')
    
    if(result.length !== 0){

        listarProdutos(result,criarHtmlCard)
    }

})

// function pesquisarTag(string){
    
//     if(string == 'Todos Produtos'){
//         return produtos
//     }

//     const resultado = produtos.filter(element => element.secao == string)
//     console.log(resultado)
    
//     return resultado
// }
function pesquisarTag(string){
    
    if(string == 'Todos Produtos'){
        return produtos
    }

    const resultado = produtos.filter(element => {
        let arr = element.secao.toLowerCase().split('')
        let arrComparação = string.toLowerCase().split('')

        return arrComparação.some(element => element[0] == arr[0]) 
    })
    
    return resultado
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
