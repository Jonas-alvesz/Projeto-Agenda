class Compromisso {
    constructor(compromisso, dia, mes, ano) {
        this.compromisso = compromisso;
        this.dia = dia;
        this.mes = mes;
        this.ano = ano;
    }

    validarDados() {
        // Verifica se algum dos campos está vazio
        if (!this.compromisso || !this.dia || !this.mes || !this.ano) {
            return false;
        }
        
        // Verifica se o valor do dia está dentro do intervalo permitido
        if (this.dia < 1 || this.dia > 31) {
            return false;
        }

        // Verifica se o mês está dentro do intervalo permitido
        if (this.mes < 1 || this.mes > 12) {
            return false;
        }

        // Verifica se o ano é um número positivo
        if (isNaN(this.ano) || this.ano <= 0) {
            return false;
        }

        // Se todas as verificações passaram
        return true;
    }
}

function VerCompromisso() {
    let c = document.getElementById('compromisso').value;
    let dia = parseInt(document.getElementById('dia').value);
    let mes = parseInt(document.getElementById('mes').value);
    let ano = parseInt(document.getElementById('ano').value);

    let compromisso = new Compromisso(c, dia, mes, ano);

    // Verifica a validade dos dados
    if (!compromisso.validarDados()) {
        alert('Por favor, preencha todos os campos corretamente.');
        return false; // Impede o envio do formulário se a validação falhar
    }

    // Permite o envio do formulário se a validação for bem-sucedida
    return true;
}
function expandirMenu() {
    let op=document.getElementById('container-op')
    op.classList.toggle('altura')
}