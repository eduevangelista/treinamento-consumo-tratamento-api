async function buscaEndereco(cep) {
    let mensagemErro = document.getElementById('erro')
    mensagemErro.innerHTML = ''
    try{
    let consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    let consultaCepConverter =  await consultaCep.json()
    if (consultaCepConverter.error){
        throw Error('CEP inexistente')
    }
    let cidade = document.getElementById('cidade')
    let logradouro = document.getElementById('endereco')
    let estado = document.getElementById('estado')

    cidade.value = consultaCepConverter.localidade
    logradouro.value = consultaCepConverter.logradouro
    estado.value = consultaCepConverter.uf

    console.log (consultaCepConverter)
    return consultaCepConverter
    }catch(error){
        console.log (error)
        mensagemErro.innerHTML = `<p>CEP INVÁLIDO</p>`
    }
}

let cep = document.querySelector('#cep')
cep.addEventListener('focusout', () => buscaEndereco(cep.value))





/*
Faz varias requisições 
let ceps = ['01001000', '02371010']
let conjuntoCeps = ceps.map( valores => buscaEndereco(valores))

Promise.all(conjuntoCeps).then(respostas => console.log(respostas))
*/


/*

1º forma 
let consultaCep = fetch('https://viacep.com.br/ws/02371010/json/').then(resposta => resposta.json())
.then(r => {
    if(r.erro ){
        throw Error('Esse cep nao existe')
    }else{
       console.log(r) 
    }
    
})
.catch(error => console.log(error))
.finally(mensagem => console.log('Processamento concluido'))
*/