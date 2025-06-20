var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var portSchema = new Schema({
    titulo: String,
    imagem: String,
    categoria: String,
    conteudo: String,
    slug: String,
    autor: String,
    views: Number,
},{collection: 'ports'})

var Ports = mongoose.model('ports', portSchema);

module.exports = Ports;