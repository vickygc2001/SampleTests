const axios = require('axios').default;

function getId() {
    const headers =  {
        'X-CMC_PRO_API_KEY' : '55468196-5c3d-46b1-8dbd-e4363265afdb'
    };

    axios({
        method: 'get',
        headers: headers,
        url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map',
        params: {
            listing_status: 'active',
            symbol: 'GBP',
        }
    })
    .then(res => console.log(res.data))
    .catch(err => console.log(error));

}   

getId();

//Output : 
    // id: 3541,
    //       name: 'Guatemalan Quetzal',
    //       symbol: 'GTQ',


    //   id: 2791,
    //   name: 'Pound Sterling',
    //   symbol: 'GBP',
