const cotacoesForm = document.querySelector('form');
const mainMessage = document.querySelector('h3');
const price = document.querySelector('#price');
const price_open = document.querySelector('#price_open');
const day_high = document.querySelector('#day_high');
const day_low = document.querySelector('#day_low');

cotacoesForm.addEventListener('submit', (event) => {
    mainMessage.innerText = 'buscando...';
    mainMessage.innerText = '';
    price.innerText = '';
    price_open.innerText = '';
    day_high.innerText = '';
    day_low.innerText = '';
    event.preventDefault();

    const ativo = document.querySelector('input').value;

    if (!ativo) {
        alert('Ativo deve ser informado!');
        return;
    }

    fetch(`/cotacoes?ativo=${ativo}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                mainMessage.innerText = `Alguma coisa deu errado`;
            } else {
                mainMessage.innerText = `Ativo: ${data.symbol}`;
                price.innerText = `Valor R$${data.price}`;
                price_open.innerText = `Valor abertura: R$${data.price_open}`;
                day_high.innerText = `Valor alta R$${data.day_high}`;
                day_low.innerText = `Valor baixa R$${data.day_low}`;
            }
        });
    });
});