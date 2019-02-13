const Rental = require('./models/rental');
class FakeDb {
    constructor(){
        this.rentals = [
            {
              title: "Cental Apartment",
              city: "New York",
              street: "Times Square",
              category: "house",
              image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
              bedrooms: 3,
              shared : false,
              description: "very nice apartment",
              dailyRate: 34,
              
            },
            {
              title: "Cental Apartment 2",
              city: "Banglore",
              street: "Kadubesanhalli",
              category: "apartment",
              image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
              bedrooms: 2,
              shared : true,
              description: "Wonderful apartment",
              dailyRate: 21
            },
            {
              title: "Cental Apartment 3",
              city: "Indore",
              street: "Bhavarkuan",
              category: "multi",
              image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
              bedrooms: 5,
              shared : false,
              description: "very nice apartment in center of the city",
              dailyRate: 53
            },
            {
              title: "Cental Apartment 4",
              city: "Delhi",
              street: "MG Road",
              category: "apartment",
              image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
              bedrooms: 6,
              shared : true,
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