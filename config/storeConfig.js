var storeId = '24';
var domain = 'https://ilab.csie.io';

//var domain = 'http://192.168.50.86:3024';

module.exports = {
    istore: {
        fcmServerKey: 'AIzaSyCa_MXHiw6SS9aqYYJ_VXmTm-_xNRFdl9g',
        istoreJwt:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE0OTUyNjMyMjcsImV4cCI6MTUyNjc5OTIyN30.IoFk47eFUTp6lfY_iO6slaubWz02LnL3_oqezZ5tOjo',
        istoreSecret:'apps2017'
    },

    store: {
        storeId: storeId,
        storeName: `Store ${storeId}`,
        storeDB: `mongodb://Apps${storeId}:a1234@ilab.csie.io:27017/Apps${storeId}`,
        storeSecret: `store${storeId}`,
        storePath: `/apps${storeId}/istore`,
        storeTopic: `/topics/store${storeId}`
    },

    line: {
        channelSecret: '6cdcbb477e3d9f673b4135e44bcfc3c0',
        channelAccessToken: 'RVjSrE/1HODqVk/m6CH9lYJ35IMzLnZSDx7oB7q7hO0s4Zb3Xt2g+TEuObmXvbDMqzwtEeAVcrHTOFkUtY+eHqBtYgPEKC7TR7ZnUmjgFA6i/Zx37/iorOg3l6DBQWNdPCWztLTyW7/pNtvvZqD/bAdB04t89/1O/w1cDnyilFU=',
        lineJwt: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoibGluZSIsImlhdCI6MTQ5NTE4MDE3OSwiZXhwIjoxNTAwMzY0MTc5fQ.D8njA7lMUnZ_Nj5tOEoK3JkwZWFu-IihanJxiYU1Yp4'
    },

    url: {
        lineIconUrl: `${domain}/apps${storeId}/istore/public/picture/2017Apps_icon.png`,
        lineUserUrl: `${domain}/apps${storeId}/istore/public/www/index.html#/user`,
        lineDepositUrl: `${domain}/apps${storeId}/istore/account/deposit`,
        lineBuyUrl: `${domain}/apps${storeId}/istore/account/buy`,
        lineProdutsUrl: `${domain}/apps${storeId}/istore/product`
    }
};