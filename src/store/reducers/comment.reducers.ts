import { HttpErrorResponse } from "@angular/common/http";
import * as fromCommentActions from "store/actions/comment.action";
import { User } from "./user.reducers";

export interface AppMessage {
  id?: number;
  content: string;
  from: number;
  commentId?: number;
  main: boolean;
  replyingTo?: string;
  suggestionId: number;
  replies?: AppMessage[];
  user: User;
}

export interface State {
  loading: boolean;
  comments: AppMessage[];
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
    case fromCommentActions.POST_COMMENT_START:
      return {
        ...state,
        loading: true
      }
    case fromCommentActions.POST_COMMENT_SUCCEEDED:
      return {
        ...state,
        loading: false,
        comments: action.comments
      }
    case fromCommentActions.POST_COMMENT_FAILED:
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
