import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of} from 'rxjs';
import { AppState } from 'store/reducers';
import { User } from 'store/reducers/user.reducers';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private store: Store<AppState>) { }

  getUser(): Observable<User> {
    let randomIndex = Math.floor(Math.random() * 11) - 1;
    randomIndex = randomIndex > 0 ? randomIndex : 0;
    const user = [
      {
        "id": 1,
        "image": "./assets/user-images/image-zena.jpg",
        "name": "Zena Kelley",
        "username": "velvetround"
      },
      {
        "id": 2,
        "image": "./assets/user-images/image-suzanne.jpg",
        "name": "Suzanne Chang",
        "username": "upbeat1811"
      },
      {
        "id": 3,
        "image": "./assets/user-images/image-thomas.jpg",
        "name": "Thomas Hood",
        "username": "brawnybrave"
      },
      {
        "id": 4,
        "image": "./assets/user-images/image-elijah.jpg",
        "name": "Elijah Moss",
        "username": "hexagon.bestagon"
      },
      {
        "id": 5,
        "image": "./assets/user-images/image-james.jpg",
        "name": "James Skinner",
        "username": "hummingbird1"
      },
      {
        "id": 6,
        "image": "./assets/user-images/image-anne.jpg",
        "name": "Anne Valentine",
        "username": "annev1990"
      },
      {
        "id": 7,
        "image": "./assets/user-images/image-ryan.jpg",
        "name": "Ryan Welles",
        "username": "voyager.344"
      },
      {
        "id": 8,
        "image": "./assets/user-images/image-george.jpg",
        "name": "George Partridge",
        "username": "soccerviewer8"
      },
      {
        "id": 9,
        "image": "./assets/user-images/image-roxanne.jpg",
        "name": "Roxanne Travis",
        "username": "peppersprime32"
      },
      {
        "id": 10,
        "image": "./assets/user-images/image-victoria.jpg",
        "name": "Victoria Mejia",
        "username": "arlen_the_marlin"
      },
      {
        "id": 11,
        "image": "./assets/user-images/image-jackson.jpg",
        "name": "Jackson Barker",
        "username": "countryspirit"
      }
    ];
    return of(user[randomIndex]);
  }
}
