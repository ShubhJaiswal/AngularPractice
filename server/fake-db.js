const Rental = require('./models/rental');
class FakeDb {
    constructor(){
        this.rentals = [
            {
              title: "Cental Apartment",
              city: "New York",
              street: "Times Square",
              category: "apartment",
              image: "https://via.placeholder.com/350X250",
              bedrooms: 3,
              description: "very nice apartment",
              dailyRate: 34
            },
            {
              title: "Cental Apartment 2",
              city: "Banglore",
              street: "Kadubesanhalli",
              category: "apartment",
              image: "https://via.placeholder.com/350X250",
              bedrooms: 2,
              description: "Wonderful apartment",
              dailyRate: 21
            },
            {
              title: "Cental Apartment 3",
              city: "Indore",
              street: "Bhavarkuan",
              category: "Multi",
              image: "https://via.placeholder.com/350X250",
              bedrooms: 5,
              description: "A big multi flat",
              dailyRate: 53
            },
            {
              title: "Cental Apartment 4",
              city: "Delhi",
              street: "MG Road",
              category: "apartment",
              image: "https://via.placeholder.com/350X250",
              bedrooms: 6,
              description: "Good apartment",
              dailyRate: 20
            }
          ]; 
    }


    async cleanDb (){
        await Rental.remove({});
    }
    pushRentalsToDb (){
        this.rentals.forEach( (rental) => {
            const newRental = new Rental(rental);

            newRental.save();
        })
    }

    seedDb(){
        this.cleanDb();
        this.pushRentalsToDb();
    }
}

module.exports = FakeDb;