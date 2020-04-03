const express = require('express');
const bodyParser = require('body-parser');
const Web3 = require('web3');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());


var web3 = new Web3();
web3.setProvider(new Web3.providers.WebsocketProvider('ws://127.0.0.1:8546'));      
web3.eth.net.isListening()
.then(() => console.log('is connected'))
.catch(e => console.log('Wow. Something went wrong'));

app.get('/', (req, res) => {
    console.log('hello world');
    res.send('Hello World!');
  });

app.get('/create-wallet', (req, res) => {
    console.log('Creating wallet');
    var account  = web3.eth.accounts.create();
    console.log(account);
    res.json(account);
  });

app.get('/getBalance/:walletAddress', (req, res) => {
    console.log('get wallet\'s ballance:'+req.params.walletAddress);
    web3.eth.getBalance(req.params.walletAddress, (error, balance) => {
        console.log(balance);
        res.json(balance);
    });
  });

  // app.post('/transaction', (req, res) => {
  //   console.log('transaction');
  //   console.log(req.body);
  //   web3.eth.personal.sign("Hello world", req.body.address, req.body.password, (privateKey) => {
  //       console.log(web3.personal.listAccounts);
  //       web3.personal.unlockAccount(web3.personal.listAccounts[0],req.body.password, 15000);
  //       var destination  = req.body.destination;
  //       var amount = req.body.amount;
  //       var transaction = web3.eth.sendTransaction({
  //           from: privateKey,
  //           to: destination,
  //           value: amount
  //       });
  //       console.log(transaction);
  //       res.json(transaction);
  //   });  
  // });


const server = app.listen(7000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
  });