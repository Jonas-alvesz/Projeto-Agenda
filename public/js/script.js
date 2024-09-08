class Compromisso {
    constructor(compromisso, dia, mes, ano) {
        this.compromisso = compromisso;
        this.dia = dia;
        this.mes = mes;
        this.ano = ano;
    }

    validarDados() {
        
        if (!this.compromisso || !this.dia || !this.mes || !this.ano) {
            return false;
        }
        
        
        if (this.dia < 1 || this.dia > 31) {
            return false;
        }

        
        if (this.mes < 1 || this.mes > 12) {
            return false;
        }

       
        if (isNaN(this.ano) || this.ano <= 0) {
            return false;
        }

       
        return true;
    }
}

function VerCompromisso() {
    let c = document.getElementById('compromisso').value;
    let dia = parseInt(document.getElementById('dia').value);
    let mes = parseInt(document.getElementById('mes').value);
    let ano = parseInt(document.getElementById('ano').value);

    let compromisso = new Compromisso(c, dia, mes, ano);

 
    if (!compromisso.validarDados()) {
        alert('Por favor, preencha todos os campos corretamente.');
        return false;
    }

    
    return true;
}
function expandirMenu() {
    let op=document.getElementById('container-op')
    op.classList.toggle('altura')
}
