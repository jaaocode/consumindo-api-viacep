const form = document.querySelector('.form');
const resultado = document.querySelector('.resultado');
const cepInput = document.querySelector('#cepDigitado');
const btn = document.querySelector('.submit-btn');

async function buscaCep() {
    const cep = cepInput.value.replace(/\D/g, '');

    if (cep.length !== 8) {
        resultado.innerHTML = 'CPF Inválido';
        resultado.classList.add('error');
        return;
    }

    try {
        const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        if (res.data.erro) {
            resultado.innerHTML = 'CEP não encontrado';
            return;
        }

        cepBuscado(res.data);

    } catch (err) {
        alert('Error', err);
        console.error(err);
    }
}

function cepBuscado(cep) {
    resultado.innerHTML = '';
    resultado.classList.remove('error');
    const ul = document.createElement('ul');

    const liCep = document.createElement('li');
    liCep.innerHTML = `<strong>CEP:</strong> ${cep.cep}`;
    ul.appendChild(liCep);

    const liLogradouro = document.createElement('li');
    liLogradouro.innerHTML = `<strong>Rua:</strong> ${cep.logradouro}`;
    ul.appendChild(liLogradouro);

    const liBairro = document.createElement('li');
    liBairro.innerHTML = `<strong>Bairro:</strong> ${cep.bairro}`;
    ul.appendChild(liBairro);

    const liLocalidade = document.createElement('li');
    liLocalidade.innerHTML = `<strong>Cidade:</strong> ${cep.localidade}`;
    ul.appendChild(liLocalidade);

    const liEstado = document.createElement('li');
    liEstado.innerHTML = `<strong>Estado:</strong> ${cep.estado}`;
    ul.appendChild(liEstado);

    const liDDD = document.createElement('li');
    liDDD.innerHTML = `<strong>DDD:</strong> ${cep.ddd}`;
    ul.appendChild(liDDD);

    resultado.appendChild(ul);

}

btn.addEventListener('click', e => {
    e.preventDefault();

    buscaCep();
    form.reset();
});

// shortcut key f
document.addEventListener('keypress', e => {
    if (e.key === 'f') {
        cepInput.focus();
    }
})
