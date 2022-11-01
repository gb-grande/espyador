async function addPalavras(e) {
    e.preventDefault();
    let usuario = $('#user').val().trim();

    if (!usuario) {
        return;
    }
    
    if (usuario[0] == '@') usuario = usuario.substr(1);

    $('#res').text(`Palavras de ${usuario}:`);

    let palavras = await pegar_palavras(usuario);
    
    
    $('#res').append("<p id='words' class='words'></p>");

    Object.entries(palavras).forEach(([key,value]) => {
        $('.words').append($("<span></span>").css({
            "font-size": normalizar(palavras, value, 10, 100)
        }
        ).text(key).hover(function() {
            $('#vezes').text(`Repetida ${value} ${value > 1 ? 'vezes' : 'vez'}`);
        }, function () {
            $('#vezes').text("");
        }))
    })
    
}

// aqui faria a chamada para a api que criaremos.
async function pegar_palavras(user) {
    res = await fetch(`../palavras/${user}`);
    console.log(res)
    json = await res.json();
    
    return json;
}

function normalizar(palavras, tamanho, min, max) {
    const maior = palavras[Object.keys(palavras)[0]];
    let max = 0;
    let kmax;
    for(let key in palavras){
        if( palavras[key])
    }

    return Math.floor((tamanho / maior * (max - min)) + min);
}

window.onload = ()=>{
    let button = document.getElementById("submit");
    console.log(button);
    button.addEventListener("click", addPalavras);





}