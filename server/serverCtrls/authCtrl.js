const bcrypt = require('bcryptjs')

module.exports ={
    register: async (req, res) => {
        const {lastName, handle, phoneNumber, password, isDispatcher } = req.body
        const db = req.app.get('db')
        const accountArr = await db.find_acc_by_username([handle])
        if (accountArr[0]) {
            return res.status(200).send({message: 'Handle already in use'})
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        let newAccArr = await db.create_user_acc([lastName, handle, phoneNumber, hash, isDispatcher])
        req.session.user = {handle: newAccArr[0].user_handle, id: newAccArr[0].user_id}
        res.status(200).send({
            message: 'logged in',
            userData: req.session.user,
            isLoggedIn: true
        })
    },
    login: async(req, res) => {
        const {handle, password} = req.body
        
        const db = req.app.get('db')
        const accountArr = await db.find_acc_by_username([handle])
        if (accountArr=== 0) {
            return res.status(200).send({message: 'Account not Found'})
        }
        const result = bcrypt.compareSync(password, accountArr[0].user_hash)
        if (!result) {
            return res.status(401).send({message:'Incorrect Password'})
        }
        req.session.user = {handle: accountArr[0].user_handle, id: accountArr[0].user_id, isDispatcher: accountArr[0].is_dispatcher}
        res.status(200).send({
            message:'Logged In',
            loggedIn: true,
            user: req.session.user
        })
    }
}