const celulas = document.querySelectorAll(".celulas")
const mensagens = document.querySelector("#mensagens")
const reiniciar = document.querySelector("#reiniciar")
const condiçoesVitoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let opçoes = ["", "", "", "", "", "", "", "", ""]
let jogadorAtual = "X"
let jogando = false

inicarJogo()

function inicarJogo(){
    jogando = true
    celulas.forEach(celula => celula.addEventListener("click", celulaSelecionada),
    reiniciar.addEventListener("click", reiniciarJogo),
    mensagens.textContent = "A partida começa com " + jogadorAtual
    )
}
function celulaSelecionada(){
    const celulaIndex = this.getAttribute("indexCelula")
    if (opçoes[celulaIndex] != "" || !jogando){
        return
    } 
    atualizarCelula(this, celulaIndex)
    checkarVencedor()
}
function atualizarCelula(celula, index){
    opçoes[index] = jogadorAtual
    celula.textContent = jogadorAtual
}
function mudarJogador(){
    jogadorAtual = (jogadorAtual == "X") ? "O" : "X"
    mensagens.textContent = jogadorAtual + " é a sua vez!"
}
function checkarVencedor(){
    let vencedor = false
    for (let i = 0; i <condiçoesVitoria.length; i++){
        const condição = condiçoesVitoria[i]
        const celulaA = opçoes[condição[0]]
        const celulaB = opçoes[condição[1]]
        const celulaC = opçoes[condição[2]]

        if (celulaA == "" || celulaB == "" || celulaC ==""){
            continue
        }
        if (celulaA == celulaB && celulaB == celulaC){
            vencedor = true
            break
        }
    }
    if(vencedor){
        mensagens.textContent = jogadorAtual + " venceu"
        jogando = false
    } 
    else if (!opçoes.includes("")){
        mensagens.textContent = "Empate"
        jogando = false
    } else {
        mudarJogador()
    }
}
function reiniciarJogo(){
    jogadorAtual = "X"
    opçoes = ["", "", "", "", "", "", "", "", ""]
    mensagens.textContent = "Vez do " + jogadorAtual
    celulas.forEach(celula => celula.textContent = "")
    jogando = true
}