const weather = true;

const date = () => {
 if (weather) {
        const dateDetails = {
            name: 'Sparks Steakhouse',
            location: "46th Street",
            table: 5
        };
        return Promise.resolve(dateDetails);
    } else {
        return Promise.reject('Bad weather so no date');
    }   
};

date().then ((ddetails) => {
    console.log(ddetails);
}).catch ((error) => {
    console.log(error);
})