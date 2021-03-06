"use strict";
// adj -> square : filter_by_conflict, filter_by_past, filter_by_institution
// square -> adj : filter_by_bubble, filter_by_strength, filter_by_attendance
var math = require('../../general/math.js')
var sys = require('../sys.js')
var loggers = require('../../general/loggers.js')
var tools = require('../../general/tools.js')
var sortings = require('../../general/sortings.js')

function filter_by_strength(square, a, b, {teams: teams, results, config: config, r: r}) {
    let preev_weights = config.preev_weights
    var a_ev = sortings.evaluate_adjudicator(a, results, preev_weights)
    var b_ev = sortings.evaluate_adjudicator(b, results, preev_weights)
    return Math.sign(b_ev - a_ev)
}

////////////////////////////////////////////////////////////////////////
function filter_by_bubble(square, a, b, {teams: teams, results, config: config, r: r}) {
    let preev_weights = config.preev_weights
    var a_ev = sortings.evaluate_adjudicator(a, results, preev_weights)
    var b_ev = sortings.evaluate_adjudicator(b, results, preev_weights)

    undefined

    return 0
}

function filter_by_num_experienced(square, a, b, {teams: teams, results, config: config, r: r}) {
    var a_num_experienced = results[a.id].num_experienced
    var b_num_experienced = results[b.id].num_experienced
    return Math.sign(a_num_experienced - b_num_experienced)
}

function filter_by_num_experienced_chair(square, a, b, {teams: teams, results, config: config, r: r}) {
    var a_num_experienced_chair = results[a.id].num_experienced_chair
    var b_num_experienced_chair = results[b.id].num_experienced_chair
    return Math.sign(a_num_experienced_chair - b_num_experienced_chair)
}

function filter_by_past(square, a, b, {teams: teams, results, config: config, r: r}) {
    var a_watched = math.count_common([square.teams.gov, square.teams.opp], results[a.id].judged_teams)
    var b_watched = math.count_common([square.teams.gov, square.teams.opp], results[b.id].judged_teams)
    return Math.sign(a_watched - b_watched)
}

function filter_by_institution(square, a, b, {teams: teams, results, config: config, r: r}) {
    var square_institutions = Array.prototype.concat.apply([], [square.teams.gov, square.teams.opp].map(t => tools.find_and_access_detail(teams, t, r).institutions))
    var a_institutions = tools.access_detail(a, r).institutions
    var b_institutions = tools.access_detail(b, r).institutions
    var a_conflict = math.count_common(square_institutions, a_institutions)
    var b_conflict = math.count_common(square_institutions, b_institutions)
    return Math.sign(a_conflict - b_conflict)
}

function filter_by_conflict(square, a, b, {teams: teams, results, config: config, r: r}) {
    var a_conflict = math.count_common([square.teams.gov, square.teams.opp], tools.access_detail(a, r).conflicts)
    var b_conflict = math.count_common([square.teams.gov, square.teams.opp], tools.access_detail(b, r).conflicts)
    return Math.sign(a_conflict - b_conflict)
}

exports.filter_by_strength = filter_by_strength
exports.filter_by_past = filter_by_past
exports.filter_by_institution = filter_by_institution
exports.filter_by_bubble = filter_by_bubble
exports.filter_by_num_experienced_chair = filter_by_num_experienced_chair
exports.filter_by_num_experienced = filter_by_num_experienced
exports.filter_by_conflict = filter_by_conflict
