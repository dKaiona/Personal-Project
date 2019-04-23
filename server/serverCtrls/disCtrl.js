module.exports = {
    newItem: async (req, res) => {
        const {itemName, itemCount, itemSpecs, file} = req.body
        const db = req.app.get('db')
        const ItemArr = await db.find_by_itemName([itemName])
        if (ItemArr[0]) {
            return res.status(200).send({message: 'Item already exists'})
    }
    let newItemArr = await db.create_item(itemName, itemCount, itemSpecs, file)
   res.status(200).send(newItemArr)
    
},

getItems: async (req, res) => {
    const db = await req.app.get('db')
    db.get_items()
    .then(items => res.status(200).send(items))
    .catch(err => {
        res.status(500).send(err, 'item get failed in DisCtrl')
    })
},

getDrivers: async (req, res) => {
    const db = await req.app.get('db')
    db.get_drivers()
    .then(drivers => res.status(200).send(drivers))
    .catch(err => {
        res.status(500).send(err, 'driver get failed in DisCtrl')
    })
},

getCust: async (req, res) => {
    const db = await req.app.get('db')
    db.get_cust()
    .then(cust => res.status(200).send(cust))
    .catch(err => {
        res.status(500).send(err, 'cust get failed in DisCtrl')
    })
},

deleteItem: async (req, res) => {
    let {id} = req.params
    const db = await req.app.get('db')
    db.delete_item(id)
    .then(items => res.status(200).send(items))
    .catch(err => {
        res.status(500).send(err, 'delete item failed in DisCtrl')
    })
},

deleteDriver: async (req, res) => {
    let {id} = req.params
    const db = await req.app.get('db')
    db.delete_driver(id)
    .then(drivers => res.status(200).send(drivers))
    .catch(err => {
        res.status(500).send(err, 'delete driver failed in DisCtrl')
    })
},

deleteCust: async (req, res) => {
    let {id} = req.params
    const db = await req.app.get('db')
    db.delete_cust(id)
    .then(cust => res.status(200).send(cust))
    .catch(err => res.status(500).send(err, 'delete cust failed in DisCtrl'))
},

updateCust : async (req, res) => {
    let {id} = req.params
    const db = await req.app.get('db')
    db.update_cust(id)
    .then(cust => res.status(200).send(cust))
    .catch(err => res.status(500).send(err, 'update cust failed in DisCtrl'))
}

}     


