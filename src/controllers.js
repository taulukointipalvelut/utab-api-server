let handlers = require('./controllers/handlers.js')

class CON {
    constructor(dict) {
        let tournaments_handler = new handlers.DBTournamentsHandler(dict)
        let styles_handler = new handlers.DBStylesHandler(dict)
        let users_handler = new handlers.DBUsersHandler(dict)
        this.tournaments = tournaments_handler.tournaments
        this.styles = styles_handler.styles
        this.users = users_handler.users
        this.close = function () {
            tournaments_handler.close()
            styles_handler.close()
        }
    }
}

exports.CON = CON
