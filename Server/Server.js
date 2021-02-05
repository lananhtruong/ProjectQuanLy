const express = require('express');
//console.log("server start!")
const app = express();
//app.use(cors(corsOptions));
const cors = require('cors')

const bodyParser = require('body-parser'); //thêm

var corsOptions = {
	origin: 'http://localhost:4200',
	//domain được phép gọi request mà server chấp nhận (vd: request đến từ http://localhost:4200  được server cho phép), 
	//giả sử node server là http://localhost:8000
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
};	
	
app.listen(8000, () => {
	console.log('Server started!');
});
app.use(cors(corsOptions));

app.use(bodyParser.json()); //thêm
//bổ sung phần dòng khai báo sử dụng bodyParser cho app

app.route('/api/items').get((req, res) => {
    console.log('items');
      res.send([{ name: 'Check dress', id:'id1', color:'Black White', size:'S,M' }, { name: 'Oscar', id:'id2', color:'Pink', size:'XS,M' }]
      );
  });


  app.route('/api/insert').post((req, res) => {
		 
	console.log('insert Account');//đc in ra khi thấy url /api/insert
	console.log('account info:'+req.body);//in ra ndung phía client gửi về, in bên phía server
		res.send(201, req.body);
});


app.route('/api/item').post((req, res) => {
	console.log('insert item');
	console.log('item info:'+req.body);
		res.send(202, req.body);
});