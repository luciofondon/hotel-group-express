const hotelController = require('../controllers/hotel')

module.exports = (app) => {

	app.route('/hotels')
		.post(hotelController.add)
        .get(hotelController.getAll)
        .delete(hotelController.removeAll)

	app.route('/hotels/:id')
		.put(hotelController.updateById)
		.get(hotelController.getById)
        .delete(hotelController.deleteById)
}