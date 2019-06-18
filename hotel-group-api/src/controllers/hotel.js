const HotelService =  require('../services/hotel');

module.exports = {

    add: async (req, res) => {
        return res.status(500).json({prueba: "Hola"});
    },

    getAll: async (req, res) => {
        return res.json(new HotelService().getHotels())
    },

    removeAll: async (req, res) => {
        return res.status(500).json({prueba: "Hola"});
    },

    updateById: async (req, res) => {
        return res.status(500).json({prueba: "Hola"});
    },

    getById: async (req, res) => {
        return res.status(500).json({prueba: "Hola"});
    },
    
    deleteById: async (req, res) => {
        return res.status(500).json({prueba: "Hola"});
    }

}
