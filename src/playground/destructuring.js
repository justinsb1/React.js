// OBJECT DESTRUCTURING

const person = {
    name: 'Andrew',
    age: 26,
    location: {
        city: 'Philadelphia',
        temp: 92
    }
};

// const name = person.name;
// const age = person.age;
// Anonymous is a default value if there is no name given
// const { name = 'Anonymous' , age } = person;

// console.log(`${name} is ${age}.`);

// const { temp: temperature , city } = person.location;

// if(city && temperature) {
//     console.log(`It's ${temperature} in ${city}.`);
// }

// == CHALLENGE ===

// const book = {
//     title: 'The Alchemist' ,
//     author: 'Santiago Smith' ,
//     publisher: {
//         name: 'Penguin'
//     }
// };

// ====================

// const { name: publisherName = 'Self-Published' } = book.publisher;

// console.log(publisherName); // Penguin, Self-Published

// ARRAY DESTRUCTURING

// const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];

// // matches up by poistion
// const [street, city, state = 'New York', zip] = address;

// console.log(`You are in ${city} ${state}.`);

// ================== CHALLENGE =========

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];

const [ coffeeName, smallPrice, mediumPrice, largePrice ] = item;

console.log(`A medium ${coffeeName} cost ${mediumPrice}`);

// ======================================


