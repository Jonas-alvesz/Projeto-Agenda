const express = require('express');
const app = express();
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'dados',
    password: '4865',
    port: '5432'
});

async function RetornarTamanho() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT COUNT(*) AS total FROM info');
        return parseInt(res.rows[0].total, 10);
    } catch (err) {
        console.error('Erro ao buscar dados:', err.stack);
        throw err;
    } finally {
        client.release();
    }
}

async function adicionar(compromisso, dia, mes, ano) {
    const client = await pool.connect();
    try {
        await client.query(
            'INSERT INTO info (compromisso, dia, mes, ano) VALUES ($1, $2, $3, $4)',
            [compromisso, dia, mes, ano]
        );
    } catch (err) {
        console.error('Erro ao adicionar dados:', err.stack);
        throw err;
    } finally {
        client.release();
    }
}

async function deletar(compromisso) {
    const client = await pool.connect();
    try {
        await client.query(
            'DELETE FROM info WHERE compromisso = $1',
            [compromisso]
        );
    } catch (err) {
        console.error('Erro ao deletar dados:', err.stack);
        throw err;
    } finally {
        client.release();
    }
}

async function BuscarTodos(compromisso='', dia='', mes='', ano='') {
    const client = await pool.connect();
    try {
       let res = await client.query('SELECT * FROM info');
        res=res.rows
        if (compromisso !='') {
        res=res.filter(valor=>valor.compromisso == compromisso)
    }
        if (dia !='') {
        res=res.filter(valor=>valor.dia == dia)
    }
        if (mes !='') {
        res=res.filter(valor=>valor.mes == mes)
    }
        if (ano !='') {
        res=res.filter(valor=>valor.compromisso == ano)
    }

        return res;
    } catch (err) {
        console.error('Erro ao buscar dados:', err.stack);
        throw err;
    } finally {
        client.release();
    }
}
let compromisso=String()
let dia=String()
let mes=String()
let ano=String()

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/add', async (req, res) => {
    try {
        const info = {
            compromisso: req.body.compromisso,
            dia: req.body.dia,
            mes: req.body.mes,
            ano: req.body.ano
        };

        await adicionar(info.compromisso, info.dia, info.mes, info.ano);

        res.redirect('/exibir');
    } catch (err) {
        console.error('Erro ao adicionar compromisso:', err.stack);
        res.status(500).send('Erro ao adicionar compromisso');
    }
});

app.get('/exibir', async (req, res) => {
    try {
        const dados = await BuscarTodos(compromisso,dia,mes,ano);
        res.render('exibir', { dados });
    } catch (err) {
        console.error('Erro ao buscar compromissos:', err.stack);
        res.status(500).send('Erro ao buscar compromissos');
    }
});

app.post('/filtrar',(req,res)=>{
   let objFiltro={
        compromisso: req.body.compromisso,
        dia: req.body.dia,
        mes: req.body.mes,
        ano: req.body.ano
   }
   compromisso=objFiltro.compromisso
   dia=objFiltro.dia
   mes=objFiltro.mes
   ano=objFiltro.ano
   res.redirect('/exibir')
})

app.post('/delete', async (req, res) => {
    try {
        const c = req.body.compromisso;
        await deletar(c);
        compromisso=''
        dia=''
        mes=''
        ano=''
        res.redirect('/exibir');
    } catch (err) {
        console.error('Erro ao deletar compromisso:', err.stack);
        res.status(500).send('Erro ao deletar compromisso');
    }
});

app.listen(3000, () => {
    console.log('http://localhost:3000');
});
