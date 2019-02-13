import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from './rental.model';
@Injectable()


export class RentalService{

 private rentals : Rental[] = [
    {
      id: "1",
      title: "Cental Apartment",
      city: "New York",
      street: "Times Square",
      category: "apartment",
      image: "https://via.placeholder.com/350X250",
      bedrooms: 3,
      description: "very nice apartment",
      dailyRate: 34,
      shared: false,
      createdAt: "24/12/2017"
    },
    {
      id: "2",
      title: "Cental Apartment 2",
      city: "Banglore",
      street: "Kadubesanhalli",
      category: "apartment",
      image: "https://via.placeholder.com/350X250",
      bedrooms: 2,
      description: "Wonderful apartment",
      dailyRate: 21,
      shared: false,
      createdAt: "21/12/2017"
    },
    {
      id: "3",
      title: "Cental Apartment 3",
      city: "Indore",
      street: "Bhavarkuan",
      category: "Multi",
      image: "https://via.placeholder.com/350X250",
      bedrooms: 5,
      description: "A big multi flat",
      dailyRate: 53,
      shared: true,
      createdAt: "31/03/2015"
    },
    {
      id: "4",
      title: "Cental Apartment 4",
      city: "Delhi",
      street: "MG Road",
      category: "apartment",
      image: "https://via.placeholder.com/350X250",
      bedrooms: 6,
      description: "Good apartment",
      dailyRate: 20,
      shared: false,
      createdAt: "23/12/2017"
    }
    
  ];

  public getRentalById(renalId:string): Observable<Rental> {

    return new Observable<Rental>( (observer)=> 
    {
        setTimeout( () =>{
            const foundRental = this.rentals.find( (rental) => {
                return rental.id == renalId;
            });
              
            observer.next(foundRental);    
        },500);
        
    })
  
  }

  public getRentals  (): Observable<Rental[]> { 
    /*  const rentalObservable : Observable<Rental[]> = new Observable( (observer) => { 
          setTimeout( () => { 
             observer.next(this.rentals);
          },1000)

          setTimeout( () => {
            observer.error('I AM ERROR');
          },2000)

          setTimeout( () => {
            observer.complete();
          },3000)
    })
    return rentalObservable;
  }*/
  return new Observable( (observer) => { 
      setTimeout( () => { 
         observer.next(this.rentals);
      },1000)
    });
  };
}