var axios = require('axios');

var status = {
	list: async (req) => {
		try {
		    let res = await axios.get('https://qiaker.cn/api?c=photos&page=' + req)
		    let images = res.data.photos
		    return images
		 } catch (error) {
		    console.error(error);
		 }
	},
	detail: async (req) => {
		try {
		    let res = await axios.get('https://qiaker.cn/api?c=photos')
		    let images = res.data.photos
			let result = images.find(element => element.id === req.id);
		    return result
		 } catch (error) {
		    console.error(error);
		 }
	},
}

module.exports = status;
