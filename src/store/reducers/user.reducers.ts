import { Action, createReducer, on } from "@ngrx/store";
import { UserActions } from "store/actions/user.actions";

export interface User {
  id?: number;
  image: string;
  name: string;
  username: string;
}

export interface State {
  currentUser: User;
}

const initialState: State = {
  currentUser: null
}

export const _userReducer = createReducer(
  initialState,
  on(UserActions.FetchUserStart, (state) => {
    return {
      ...state,
    }
  }),
  on(UserActions.FetchUserSucceeded, (state, { userId }) => {
    const currentUser = [
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
    ].find(u => {
      const randomIndex = userId;

      if (randomIndex <= 0) {
        return u.id === 1
      }
      return u.id === randomIndex
    });

    return {
      ...state,
      currentUser: currentUser
    }
  }),
)

export function userReducer(state: State | undefined, action: Action) {
  return _userReducer(state, action);
}
