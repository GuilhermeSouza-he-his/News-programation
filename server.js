const express = require('express');
const Path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const app = express()

const Ports = require('./ports.js');

mongoose.connect('mongodb+srv://root:gui2302200@cluster0.qmoslpv.mongodb.net/dankicode?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conectado com sucesso');
    }).catch((err) => {
        console.log(err.message);
    })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(Path.join(__dirname, 'public')));
app.set('views', Path.join(__dirname, '/pages'));

app.get('/', (req, res) => {
    const categoryColors = {
        "educação": "#4CAF50",
        "tecnologia": "#2196F3",
        "carreira": "#FF9800",
        "tutorial": "#9C27B0"
    };
    if (req.query.busca == null) {
        Ports.find({}).sort({ '_id': -1 }).limit(7).exec((err, ports) => {
            ports = ports.map((val) => {
                return {
                    titulo: val.titulo,
                    conteudo: val.conteudo,
                    descricaoCurta: val.conteudo.substr(0, 400),
                    imagem: val.imagem,
                    slug: val.slug,
                    categoria: val.categoria,
                }
            })

            Ports.find({}).sort({ 'views': -1 }).limit(6).exec(function (err, portsTop) {

                // console.log(posts[0]);

                portsTop = portsTop.map(function (val) {

                    return {
                        titulo: val.titulo,
                        conteudo: val.conteudo,
                        descricaoCurta: val.conteudo.substr(0, 150),
                        imagem: val.imagem,
                        slug: val.slug,
                        categoria: val.categoria,
                        views: val.views
                    }

                })

                res.render('index', { ports: ports, portsTop: portsTop, categoryColors: categoryColors });

            })
        })

    }
    else {
        Ports.find({ titulo: { $regex: req.query.busca, $options: "i" } }, (err, ports) => {
            console.log(ports)
            ports = ports.map(function (val) {

                return {
                    titulo: val.titulo,
                    conteudo: val.conteudo,
                    descricaoCurta: val.conteudo.substr(0, 140),
                    imagem: val.imagem,
                    slug: val.slug,
                    categoria: val.categoria,
                    views: val.views
                }

            })
            res.render('busca', { ports: ports, contagem: ports.length, categoryColors: categoryColors });
        })
    }
})

app.get('/:slug', (req, res) => {

    const categoryColors = {
        "educação": "#4CAF50",
        "tecnologia": "#2196F3",
        "carreira": "#FF9800",
        "tutorial": "#9C27B0"
    };

    Ports.findOneAndUpdate({ slug: req.params.slug }, { $inc: { views: 1 } }, { new: true }, (err, resposta) => {

        if (resposta != null) {
            Ports.find({}).sort({ 'views': -1 }).limit(3).exec(function (err, portsTop) {

                // console.log(posts[0]);

                portsTop = portsTop.map(function (val) {

                    return {
                        titulo: val.titulo,
                        conteudo: val.conteudo,
                        descricaoCurta: val.conteudo.substr(0, 140),
                        imagem: val.imagem,
                        slug: val.slug,
                        categoria: val.categoria,
                        views: val.views
                    }
                })

                res.render('single', { noticia: resposta, portsTop: portsTop, categoryColors: categoryColors });

            })
        }
        else {
            res.render('404', {});
        }


    })
})

app.listen(3000, () => {
    console.log('listening...')
})