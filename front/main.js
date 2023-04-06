async function addPalavras(e) {
    e.preventDefault();
    let usuario = $('#user').val().trim();

    if (!usuario) {
        return;
    }
    
    if (usuario[0] == '@') usuario = usuario.substr(1);

    $('#res').text(`Palavras de ${usuario}:`);
    $('#res').append('<div class="loader"></div>');
    
    let palavras = await pegar_palavras(usuario);
    
    if (!palavras) {
        $("#res").text('')
        return;
    }
    

    $('#res').text(`Palavras de ${usuario}:`);
    $('#res').append("<p id='words' class='words'></p>");
    const sorta = Object.keys(palavras).sort(function(a,b){return palavras[b]-palavras[a]})


    sorta.forEach((key) => {
        value = palavras[key];
        $('.words').append($("<span></span>").css({
            "font-size": normalizar(palavras, sorta, value, 20, 50)
        }).text(key).click(() => {
            $('#vezes').text(`Repetida ${palavras[key]} ${palavras[key] > 1 ? 'vezes' : 'vez'}`);
        }));
    })
    
}

// aqui faria a chamada para a api que criaremos.
async function pegar_palavras(user) {
    res = await fetch(`../palavras/${user}`);
    console.log(res)
    json = await res.json();
    
    return json;
}

function normalizar(palavras, sortado, tamanho, min, max) {
    const maior = palavras[sortado[0]];
    return Math.floor((tamanho / maior * (max - min)) + min);
}

window.onload = ()=>{
    let button = document.getElementById("submit");
    console.log(button);
    button.addEventListener("click", addPalavras);
}