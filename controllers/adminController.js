const Ports = require('../models/ports');
const fs = require('fs');
const path = require('path');

const users = [{ login: 'guilherme', senha: '123456' }];

exports.login = (req, res) => {
    users.map((val) => {
            if (val.login == req.body.login && val.senha == req.body.senha) {
                req.session.login = 'guilherme'
            }
        })
    
        res.redirect('/admin/login')
}

exports.showLogin = (req, res) => {
    if (req.session.login == null) {
        res.render('admin-login')
    } else {
        Ports.find({}).sort({ '_id': -1 }).limit(7).exec((err, ports) => {
            ports = ports.map((val) => {
                return {
                    id: val._id,
                    titulo: val.titulo,
                    conteudo: val.conteudo,
                    descricaoCurta: val.conteudo.substr(0, 400),
                    imagem: val.imagem,
                    slug: val.slug,
                    categoria: val.categoria,
                }
            })
            res.render('admin-panel', { ports: ports })
        })
    }
}

exports.createPost = (req, res) => {
    let formato = req.files.arquivo.name.split('.')
    var imagem = ''

    if(formato[formato.length - 1] == "jpg"){
        imagem = new Date().getTime()+'.jpg'
        req.files.arquivo.mv(__dirname+'/public/'+imagem)
    }else{
        fs.unlinkSync(req.files.arquivo.tempFilePath)
    }
    Ports.create({
        titulo: req.body.titulo_noticia,
        imagem: 'http://localhost:3000/public/'+imagem,
        categoria: String,
        conteudo: req.body.noticia,
        slug: req.body.slug,
        autor: 'admin',
        views: 0,
    })
    res.send('cadastrado com sucesso!')
}

exports.deletePost = (req, res) => {
    Ports.deleteOne({ _id: req.params.id }).then(() => {
        res.redirect('/admin/login')
    })
}