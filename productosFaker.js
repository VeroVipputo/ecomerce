import faker from "faker"
faker.locale = 'es';
const {name, commerce, image} = faker;
import {writeFile} from 'fs';

let data ="PRODUCTO;PRECIO;IMAGEN"

for(let i = 0; i < 5; i++){
    data+=  ";"+ commerce.product() +
            ";"+ commerce.price()+
            ";"+ image.abstract()+
            "\n"
}
writeFile('./productos-test.csv',data, err=>{
    if(err) return console.log(err);
    console.log('Listo el Pollo')
}
)
