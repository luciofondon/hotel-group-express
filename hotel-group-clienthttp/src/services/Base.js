'use strict'

const axios = require('axios');

class BaseService {
    constructor(endpoint) {
      this.endpoint = endpoint;
    }
  
    async getData(filter) {
        let url = filter ? this.endpoint + filter : this.endpoint
        const response = await axios.get(url);
        return response.data
    }
    
    async addData(data) {
        const response = await axios.post(this.endpoint, data);
        return response.data
    }

    async removeData(id) {
        const response = await axios.delete(this.endpoint, data);
        return response.data
    }

    async updateData(id, data) {
        const response = await axios.put(this.endpoint, data);
        return response.data
    }
}
    
module.exports = BaseService;