const express = require('express')
const path = require('path')
const bp = require("body-parser");
const qr = require("qrcode");
const { Console } = require('console');
const PORT = process.env.PORT || 5000
const app = express();
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/scan", (req, res) => {
    //const url = req.body.url;

    // If the input is null return "Empty Data" error
  //  if (url.length === 0) res.send("Empty Data!");
    
    // Let us convert the input stored in the url and return it as a representation of the QR Code image contained in the Data URI(Uniform Resource Identifier)
    // It shall be returned as a png image format
    // In case of an error, it will save the error inside the "err" variable and display it
    let str = 'bitcoin:';
    str += req.body.address;
    console.log(req.body)
    console.log(req.body.amount)
    console.log(req.body.amount)
    let  blankString =  req.body.amount;
    if (blankString != null && blankString.length != 0) {
        str += '?amount=';
        str += req.body.amount;
    }
    
    console.log(str)
    qr.toDataURL(str, (err, src) => {
        if (err) res.send("Error occured");
      
        // Let us return the QR code image as our response and set it to be the source used in the webpage
        res.render("scan", { src });
    });
});

app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))