/**
 * Scrap www.rightsnet.org.uk forums
 */

const express = require('express');
const router = express.Router();
const scrapers = require('../scrapers/usa')
const helpers = require('../helpers')
const fileInput = "./files/Inventory+Report+09-13-2018.txt";
const fileOutput = "./files/Inventory+Missing+ASIN.txt";
var fs = require('fs');
var readline = require("readline");



// `onload` as listen
/**
 *  Scrap amazon
 * 
 *  GET: /check
 */
router.get('/check', async (req, res, next) => {

  let fileName = "availability" //store + "-" + date;
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // var reader = readline.createInterface({
  //   input: fs.createReadStream(fileInput),
  //   output: fs.createWriteStream(fileOutput),
  //   terminal: false
  // });

  // reader.on("line", function (line) {
  //   var url = "https://www.amazon.com/dp/" + line.split('\t')[1]
  //   var sku = line.split('\t')[0]
  //   //console.log("Line:", line.split('\t')[1]);
  //   scrapers.scrap(url, sku, reader.output, fileName, (d) => {
  //     res.json(d)
  //   });
  // });

   var url = "https://www.amazon.com/dp/" + "B06Y2L7KXM"
  scrapers.scrap(url, "B075B5QV4K", {}, fileName, (d) => {
    res.json(d)
  });

});

module.exports = router;


