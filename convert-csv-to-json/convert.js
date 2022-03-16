let csvToJson = require('convert-csv-to-json');

let  fileInputName  =  'preco-por-codigo-e-peso.csv';  
let  fileOutputName  =  'precoPorCodigo.json' ; 

// let json = csvToJson.getJsonFromCsv(fileInputName);

// for(let i=0; i<json.length;i++){
//     var fileInput = Object.assign({},json[i]['peso-maximo'], json[i]['peso-maximo'].replace(",","."));
// }

csvToJson.formatValueByType().getJsonFromCsv(fileInputName);

// csvToJson.parseSubArray().getJsonFromCsv('preco-por-codigo-e-peso.csv');

csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);



