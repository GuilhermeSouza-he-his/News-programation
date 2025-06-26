const Ports = require('../models/ports');

exports.home = (req, res) => {
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

    
    
}

exports.viewPost = (req, res) => {
    const categoryColors = {
        "educação": "#4CAF50",
        "tecnologia": "#2196F3",
        "carreira": "#FF9800",
        "tutorial": "#9C27B0"
    };

    Ports.findOneAndUpdate({ slug: req.params.slug }, { $inc: { views: 1 } }, { new: true }, (err, resposta) => {

        if (resposta != null) {
            Ports.find({}).sort({ 'views': -1 }).limit(3).exec(function (err, portsTop) {

                // console.loga(posts[0]);

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
}