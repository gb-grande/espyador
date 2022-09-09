function legal(e) {
    e.preventDefault();
    var value = $('#user').val().trim();

    if (value) {
        if (value[0] != "@") value = "@" + value;
        
        $('#res').text(`Palavras de ${value}:`);

        const palavras = pegar_palavras(value);

        const maior = palavras[Object.keys(palavras)[0]];

        $('#res').append("<p id='words' class='words'></p>");

        Object.entries(palavras).forEach(([k,v]) => {
            $('.words').append($("<span></span>").css({
                "font-size": function() {
                    return normalizar(v, maior, 10, 100);
                }
            }
            ).text(k).hover(function() {
                $('#vezes').text(`Repetida ${v} ${v > 1 ? 'vezes' : 'vez'}`);
            }, function () {
                $('#vezes').text("");
            }))
        })
    }
}

// aqui faria a chamada para a api que criaremos.
function pegar_palavras(user) {
    return {'eu': 24, '<i>pe</i>': 14, 'me': 10,  'com': 9, 'mas': 5, 'tá': 5, 'minha': 5, 'ser': 4, 'meu': 4, 'hoje': 4, 'mesmo': 4,  'isso': 4, 'essa': 4, 'foi': 4, 'ele': 4, 'já': 1,  'an': 4,  'você': 3, 'aí': 3, 'cara': 3, 'gente': 3, 'dia': 3, 'parece': 3, 'quando': 3, 'nada': 3, 'mais': 3, 'num': 3, 'deixa': 3, 'vai': 3, 'escolhe': 2, 'fila': 2, 'pegar': 2, 'lá': 2, 'dentro': 2, 'alguma': 2, 'bom': 1}
}

function normalizar(tamanho, maior, min, max) {
    return Math.floor((tamanho / maior * (max - min)) + min);
}