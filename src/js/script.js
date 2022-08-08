// seu código aqui

const vitrinePrincipalProdutos  = document.querySelector('ul')
vitrinePrincipalProdutos.className = 'oi'
const carrinho                  = document.querySelector('.carrinho')
const carrinhoCorpo             = document.querySelector('.carrinho__corpo')
const imgCarrinhoVazio          = document.querySelector('#bag')
const carrinhoCorpoVazio        = document.querySelector('.carrinho__corpo--vazio')
const carrinhoFooter            = document.querySelector('.carrinho__footer')
const carrinhoHeader            = document.querySelector('.carrinho__header')
const btnPesquisa = document.querySelector('.containerBuscaPorNome button')
const inputPesquisar = document.querySelector('.campoBuscaPorNome')
const secao         = document.querySelector('#botoesContainer')
const valorProdutos  = document.querySelector('.priceContainer')



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

    const tagLi               = document.createElement('li')
    const tagImg              = document.createElement('img')
    const tagH3               = document.createElement('h3')
    const tagSpan             = document.createElement('span')
    const tagDiv              = document.createElement('div')
    const tagBtnComprar       = document.createElement('button')
    const tagValor            = document.createElement('p')
    const tagNutrientes1      = document.createElement('p')
    const tagNutrientes2      = document.createElement('p')
    const tagNutrientes3      = document.createElement('p')
    const tagNutrientes4      = document.createElement('p')

    let arr = [tagNutrientes1,tagNutrientes2,tagNutrientes3,tagNutrientes4]

    tagDiv.append(tagValor,tagBtnComprar)
    tagLi.append(tagImg,tagH3,tagSpan,tagNutrientes1,tagNutrientes2,tagNutrientes3,tagNutrientes4,tagDiv)

    tagImg.src               = Element.img 
    tagImg.alt               = `imagem ${Element.nome}`
    tagH3.innerText          = Element.nome
    tagSpan.innerText        = Element.secao
    tagValor.innerText       = `R$ ${Element.preco}`.replace('.',',') 
    tagBtnComprar.innerText  = 'Comprar'
    tagBtnComprar.id         = Element.id
    tagNutrientes1.innerText = `1. ${Element.componentes[0]}`
    tagNutrientes2.innerText = `2. ${Element.componentes[1]}`
    tagNutrientes3.innerText = `3. ${Element.componentes[2]}`
    tagNutrientes4.innerText = `4. ${Element.componentes[3]}`
    
    
    
 
    return tagLi
}

function criarProdutoCarrinho(obj){

    let img            = obj.img
    let titulo         = obj.nome
    let preco          = obj.preco
    let secao          = obj.secao
    let precoFormatado = `R$ ${parseInt(preco)}`.replace('.',',')
    let id             = obj.id

    let tagDiv           = document.createElement('div')
    tagDiv.className     = 'carrinho__corpo--produto'

    tagDiv.innerHTML     = 
    `
        
            <div>
                <img src=${img} alt=${titulo}>
            </div>
            <main class = 'mainCarrinho'>
                <div class = 'mainCarrinho__descricao'>
                    <h2>${titulo}</h2>
                    <p>${secao}</p>
                    <h4>${precoFormatado}</h4>
                </div>
                <div>
                    <img src="./src/img/trash.png" alt='Lixeira' id='trash'>
                </div>
            </main>
        `
    
    return tagDiv


}

function listarNutrientes (){

    
    
}
        
listarProdutos (produtos,criarHtmlCard)

btnPesquisa.addEventListener('click',function(){

    let pesquisaUsuario = inputPesquisar.value
    let result          = pesquisar(pesquisaUsuario)
    let u               = pesquisarTag(pesquisaUsuario)

    if(result.length !== 0){

        listarProdutos(result,criarHtmlCard)
        alimentarTotais(result)
    }else if(u.length !== 0){
        listarProdutos(u,criarHtmlCard)
        alimentarTotais(u)
    }

})

vitrinePrincipalProdutos.addEventListener('click',adicionarNoCarrinho)

let quantidade = []

function adicionarNoCarrinho(event){

    let btn = event.target
    
    if(imgCarrinhoVazio.id == 'bag' && btn.innerText == 'Comprar'){

        carrinhoCorpoVazio.remove()
    }
    
    

    if(btn.innerText == 'Comprar'){

    
        let tagDiv = criarProdutoCarrinho(produtos[btn.id])    
        quantidade.push(produtos[btn.id]) 
        carrinhoCorpo.appendChild(tagDiv)
            criarTotaisQuantidade()
            
    }
    

    

}

function alimentarTotais(arr){

    let valorTotalProdutos = criarTotais(arr)
    let valorSomaTotal    = document.createElement('span')
    let preco   = arr.reduce((valorInicial,valorAtual) => valorInicial + parseInt(valorAtual.preco),0)

    valorTotalProdutos.appendChild(valorSomaTotal)
    valorSomaTotal.innerText = `R$ ${preco.toFixed(2)}`.replace('.',',')
}

function pesquisar(string){

    
    const result = produtos.filter(element => element.nome.toLowerCase() == string.trim().toLowerCase() || element.categoria.toLowerCase() == string.trim().toLowerCase())

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
        let preco   = result.reduce((valorInical,valorAtual) => valorInical+parseInt(valorAtual.preco),0)
        span.innerText = `R$ ${preco.toFixed(2)}`.replace('.',',')
    
    if(result.length !== 0){

        listarProdutos(result,criarHtmlCard)
    }

})

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
function criarTotaisQuantidade(){
    
    carrinhoFooter.innerHTML =''
    

    let qtds = quantidade.length
    let totalCart = quantidade.reduce((initialValue,currentValue) => initialValue + parseInt(currentValue.preco),0)

    let quantidadeProduto = document.createElement('div')
    quantidadeProduto.setAttribute('class','qtd')
    let total = document.createElement('div')
    total.setAttribute('class','valorTotal')

    quantidadeProduto.innerHTML = `<p>Quantidade:</p>
    <h3>${qtds}</h3>`
    total.innerHTML = `<p>Total:</p>
    <h3>R$`+ `${totalCart.toFixed(2)}`.replace('.',',')+`</h3>`

    carrinhoFooter.appendChild(quantidadeProduto)
    carrinhoFooter.appendChild(total)

    

}

carrinhoCorpo.addEventListener('click',removerTarefa)

function removerTarefa(event){

    
    
    let click  = event.target
    console.log(event.target)   
   

        if(click.id == 'trash'){
             quantidade.splice(0,1)
             click.closest('.carrinho__corpo--produto').remove()
             criarTotaisQuantidade()

        }
        if(quantidade.length == 0){
            
            carrinhoFooter.innerHTML = ''
            carrinhoCorpoVazio.innerHTML=''
            carrinhoCorpo.innerHTML = ` 
            <div class="carrinho__corpo--vazio">
                <img src="./src/img/shopping-bag.png" alt="" id="bag">
                <img src="./src/img/Por enquanto não temos produtos no carrinho.png" alt="">
            </div>
        `
        

        }
    
    

}