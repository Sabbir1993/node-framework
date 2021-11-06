let User = require('../models/User')

class TestController {
    static index = async (req, res) => {
        let users = await new User().all()
        res.send(users)
    }

    static create = async (req, res) => {

    }

    static store = async (req, res) => {

    }

    static view = async (req, res) => {

    }

    static edit = async (req, res) => {

    }

    static update = async (req, res) => {

    }

    static delete = async (req, res) => {

    }
}
module.exports = TestController
