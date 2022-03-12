import { HttpErrorResponse } from "@angular/common/http";
import * as fromCommentActions from "store/actions/comment.action";
import { User } from "./user.reducers";

export interface Comment {
  id?: number;
  content: string;
  from: number;
  suggestionId: number;
  user: User;
}

export interface State {
  loading: boolean;
  comments: Comment[];
  error: HttpErrorResponse,
}

const initialState: State = {
  loading: false,
  comments: [],
  error: null
}

export function commentReducer(state: State = initialState, action: fromCommentActions.CommentActionsTypes) {
  switch (action.type) {

    case fromCommentActions.FETCH_COMMENTS_START:
      return {
        ...state,
        loading: true
      }
    case fromCommentActions.FETCH_COMMENTS_SUCCEEDED:
      console.log(action.comments);

      return {
        ...state,
        loading: false,
        comments: action.comments
      }
    case fromCommentActions.FETCH_COMMENTS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return {
        ...state
      }
  }
}
