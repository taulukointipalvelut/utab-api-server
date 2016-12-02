var md5 = require('blueimp-md5')
var async = require('async')

function create_hash(seed) {
    return parseInt(md5(seed).slice(0, 12), 16)
}

function find_tournament(list, id) {
    return list.filter(e => e.id === parseInt(id))[0].handler
}

function get_node(tournaments, tournament_id, keys) {
    let t = find_tournament(tournaments, tournament_id)
    return get_property(t, keys)
}

function get_property(object, keys) {//TESTED//
    if (keys.length !== 0) {
        return get_property(object[keys[0]], keys.slice(1))
    } else {
        return object
    }
}

function get_id(path) {
    let parsed_path = path.split('/')
    let e = path[path.length-1] === '/' ? parsed_path[parsed_path.length-2] : parsed_path[parsed_path.length-1]
    let e2 = parseInt(e)
    return Number.isNaN(e2) ? null : e2
}

var syncadd = async.queue(function(dict, callback) {
    dict.list.push(dict.e)
    callback()
}, 1)
syncadd.drain = function () {}
/*
var list = [1, 32, 3]

for (let i = 0; i < 20; i++) {
    let j = i
    setTimeout((i)=>syncadd.push({list: list, e: j}), 0)
}
*/
exports.syncadd = syncadd
exports.get_node = get_node
exports.create_hash = create_hash
exports.find_tournament = find_tournament
exports.get_id = get_id
