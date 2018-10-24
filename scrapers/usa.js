const helpers = require('../helpers')
const cheerio = require('cheerio');
const request = require('request')
const scrapers = require('./usa')
const fs = require('fs')
const json2csv = require('json2csv')
const chalk = require('chalk')
const xpath = require('xpath');
const parse5 = require('parse5');
const xmlser = require('xmlserializer');
const dom = require('xmldom').DOMParser;
var os = require("os");



var XPATH_AVAILABILITY = '//div[@id="availability"]'

/**
 *  Scrap https://www.rightsnet.org.uk/forums by pages
 *  
 * @param {*} url
 * @param {*} pageFirst 
 * @param {*} pageLast 
 * @param {*} subforum 
 * @param {*} output 
 * @param {*} fileName 
 */
exports.scrap = function (url, sku, output, fileName, callback) {


    request(url, (error, response, html) => {
        // var document = parse5.parse(html.toString()); 
        // const xhtml = xmlser.serializeToString(document);
        // const doc = new dom().parseFromString(xhtml);
        // const nodes = xpath.select(XPATH_AVAILABILITY, doc);
        // console.log(nodes);

        //console.log("url request: " + html)
        if (!error) {
            const $ = cheerio.load(html)

            let json = { url: "", availability: "", deliverymessage:"", address:"" };
            
            if ($('#delivery-message').length) {
                var deliverymessage =  $('#delivery-message').text()
                json.url = url
                json.availability = deliverymessage
                console.log("deliverymessage "+ deliverymessage)
            } else

            //B06XP3FSYK
            if ($('#availability').length) {
                var availability =  $('#availability').text()
                json.url = url
                json.availability = outOfStock
                console.log("availability " + availability)
            } else

            //B075B5QV4K
            if ($('#outOfStock').length) {
                var outOfStock =  $('#outOfStock').text()
                json.url = url
                json.availability = outOfStock
                console.log("outOfStock "+outOfStock)
            } else


            if ($('#glow-ingress-line2').length) {
                var address =  $('#glow-ingress-line2').text()
                json.url = url
                json.availability = address
                console.log("address: "+ address)
            }

            var availability = $('#availability').children().text().replace(/\s/g, "")
            var availabilityInsideBuyBox_feature_div = $('#availabilityInsideBuyBox_feature_div').children().first().children().first().children().first().text().replace(/\s/g, "")
            var availability_feature_div = $('#availability_feature_div').children().eq(1).children().eq(0).text().replace(/\s/g, "") //works for B06Y2LBJ7V
            //console.log(availability_feature_div)
            //console.log("availabilityInsideBuyBox_feature_div: " + availabilityInsideBuyBox_feature_div)

            // if (availability == "" || availability_feature_div == "" || outOfStock) {
            //     console.log("file writes" + os.EOL)
            //     //console.log(availability)
            //     //console.log(availabilityInsideBuyBox_feature_div)

            //     let json = { url: "", availability: "" };
            //     json.url = url
            //     json.availability = availability
            //     // output.write(url + os.EOL, (err) => {
            //     //     if (err) throw err;
            //     //     console.log('The file has been saved!');
            //     // });


            // } else {
            //     console.log(url + " availability " + availability + " --- " + sku)
            //     console.log(url + " availabilityInsideBuyBox_feature_div " + availabilityInsideBuyBox_feature_div + " --- " + sku)
            // }
            //var table2 = $('#availability_feature_div').children().first().children().first().text()
            //var table2 = $('#availability_feature_div').children("availability-brief").children("availability").text()

            //var availabilityInsideBuyBox_feature_div = $('#availabilityInsideBuyBox_feature_div').children().first().children().first().text().replace(/\s/g, "")
            //var deliveryMessage = $('#dpFastTrack_feature_div').children("#fast-track").children("#fast-track-message").text()
            var deliveryMessage = $().closest("#dpFastTrack_feature_div").find("#delivery-message")

            console.log("--------------------------------------")
            //console.log(url +  " --- " + sku )
            //console.log(url + " --- " + table + " --- " + sku)
            //console.log(url + " --- " + table +  table2 + table3 + " --- " + sku)

            //console.log("delivery message " + deliveryMessage)
            //console.log("--------------------------------------")

            return callback(json)
        }
    })
};

/**
 * Write search result to the file
 * @param {*} fileName 
 * @param {*} output 
 * @param {*} callback 
 */
function writeToFile(path, data, callback) {
    fs.writeFile(path, data, function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
}

