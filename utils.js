import faker from "faker";
faker.locale = "es";

export const generateUser = () => {
    return {
        name : faker.name.findName(),
        price: faker.price.price(),
        product: faker.product(),
        picture : faker.image.picture(),
    }
}

export default generateUser