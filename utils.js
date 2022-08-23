import faker from "faker";
faker.locale = "es";

export const generateUser = () => {
    return {
        name : faker.name.findName(),
        email: faker.internet.email(),
        website: faker.internet.url(),
        profile_pic : faker.image.avatar(),
    }
}