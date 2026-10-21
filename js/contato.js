// CALCULAR O VALOR TOTAL

const item = document.getElementById("item");
const quantidade = document.getElementById("quantidade");
const total = document.getElementById("total");

function calcularTotal() {

    let preco = 0;

    if (item.value == "Bolo de Kinder") {
        preco = 95;
    } else if (item.value == "Bolo de Morango") {
        preco = 85;
    } else if (item.value == "Bolo de Red Velvet") {
        preco = 110;
    } else if (item.value == "Bolo de Prestígio") {
        preco = 90;
    } else if (item.value == "Bolo Branco de Avelã") {
        preco = 105;
    } else if (item.value == "Bolo de Limão") {
        preco = 75;
    }

    total.value = (preco * Number(quantidade.value)).toFixed(2);
}

item.addEventListener("change", calcularTotal);
quantidade.addEventListener("input", calcularTotal);


// PREENCHER O ENDEREÇO PELO CEP

const cep = document.getElementById("cep");
const rua = document.getElementById("rua");
const bairro = document.getElementById("bairro");
const cidade = document.getElementById("cidade");
const estado = document.getElementById("estado");
const mensagemCep = document.getElementById("mensagem-cep");

cep.addEventListener("input", async function() {

    let numeroCep = cep.value.replace(/\D/g, "");

    mensagemCep.textContent = "";

    if (numeroCep.length == 8) {

        mensagemCep.textContent = "Buscando endereço...";

        try {

            const resposta = await fetch(
                `https://viacep.com.br/ws/${numeroCep}/json/`
            );

            const dados = await resposta.json();

            if (dados.erro) {

                mensagemCep.textContent = "CEP não encontrado.";

                rua.value = "";
                bairro.value = "";
                cidade.value = "";
                estado.value = "";

            } else {

                rua.value = dados.logradouro;
                bairro.value = dados.bairro;
                cidade.value = dados.localidade;
                estado.value = dados.estado;

                mensagemCep.textContent = "Endereço encontrado!";

            }

        } catch (erro) {

            mensagemCep.textContent =
                "Não foi possível consultar o CEP. Tente novamente.";

        }

    }

});