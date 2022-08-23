import faker from "faker"
faker.locale = 'es';
const {name, internet, random} = faker;
import {writeFile} from 'fs';

let data ="NOMBRE;APELLIDO;EMAIL;TRABAJO;LUGAR"

for(let i = 0; i < 100; i++){
    data+= name.firstName()+
            ";"+ name.lastName()+
            ";"+ internet.email()+
            ";"+ name.jobTitle()+
            ";"+ random.locale()+
            "\n"
}
writeFile('./papa.csv',data, err=>{
    if(err) return console.log(err);
    console.log('Listo el Pollo')
}
)