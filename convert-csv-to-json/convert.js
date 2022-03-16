let csvToJson = require('convert-csv-to-json');

let  fileInputName  =  'preco-por-codigo-e-peso.csv';  
let  fileOutputName  =  'myOutputFile.json' ; 

let json = csvToJson.getJsonFromCsv(fileInputName);

for(let i=0; i<json.length;i++){
    json[i].values = json[i].values.replace(",",".");

}

csvToJson.formatValueByType().getJsonFromCsv(fileInputName);

csvToJson.parseSubArray().getJsonFromCsv('preco-por-codigo-e-peso.csv');

csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);



