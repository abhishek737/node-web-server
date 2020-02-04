const express = require('express');
const request = require('request');
const baseUrl = "https://api.itbook.store/1.0";

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.get("/data", (req, res) => {
  const options = {
    url: baseUrl+'/new',
    path: '/get',
}
  request.get(options, (err, response, body) => {
    const data = JSON.parse(body);
    res.json({'data':data})
  })
})

app.get("/search/:book/:page?", (req, res) => {
  // res.send(req.params);
  const params = req.params;
  const url = params.page ? `${baseUrl}/search/${params.book}/${params.page}`:`${baseUrl}/search/${params.book}`
  console.log("url is", url);
    const options = {
    url: url,
    path: '/get',
    headers: {
        'Content-Security-Policy': "default-src 'https://creating-only-get-requests.abhishek737.repl.co/favicon.ico'",
        'Content-Type':"application/json"
    }
}
    request.get(options, (err, response, body) => {
    const data = JSON.parse(body);
    res.json({'result':data})
  }) 
})

app.listen(3000, () => {
  console.log('server started again');
});