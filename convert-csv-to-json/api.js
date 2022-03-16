import readFile from 'fs/promises'


const  fileInputName  =  (await readFile ('preco-por-codigo-e-peso.csv')).toString()  
const sliptFile = fileInputName('\r\n');
const[header,...files] = sliptFile
const arr = []

for (const i of files) {
    const split = i.split(',')
    arr.push({
        pesomaximo: split[0],
        codigoregiao: split[1],
        preco: split[2]
    })
}

console.log(arr)