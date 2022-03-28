import { HttpErrorResponse } from "@angular/common/http";
import { Action, createReducer, on } from "@ngrx/store";
import { CommentActions } from "store/actions/comment.action";
import { User } from "./user.reducers";

export interface AppMessage {
  id?: number;
  content: string;
  from: number;
  mainId?: number;
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


export const _commentReducer = createReducer(
  initialState,
  on(CommentActions.FetchCommentsStart, (state) => {
    return {
      ...state,
      loading: true
    }
  }),
  on(CommentActions.FetchCommentsSucceeded, (state, { comments }) => {
    return {
      ...state,
      loading: false,
      comments: comments
    }
  }),
  on(CommentActions.FetchCommentsFailed, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error: error
    }
  }),
  on(CommentActions.PostCommentStart, (state) => {
    return {
      ...state,
      loading: true
    }
  }),
  on(CommentActions.PostCommentSucceeded, (state, { comments }) => {
    return {
      ...state,
      loading: false,
      comments: comments
    }
  }),
  on(CommentActions.PostCommentFailed, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error: error
    }
  }),
  on(CommentActions.PostReplyStart, (state) => {
    return {
      ...state,
      loading: true
    }
  }),
  on(CommentActions.PostReplySucceeded, (state, { comments }) => {
    return {
      ...state,
      loading: false,
      comments: comments
    }
  }),
  on(CommentActions.PostReplyFailed, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error: error
    }
  }),
)

export function commentReducer(state: State | undefined, action: Action) {
  return _commentReducer(state, action);
}

/* export function commentReducer(state: State = initialState, action: fromCommentActions.CommentActionsTypes) {

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
    case fromCommentActions.POST_REPLY_START:
      return {
        ...state,
        loading: true
      }
    case fromCommentActions.POST_REPLY_SUCCEEDED:
      return {
        ...state,
        loading: false,
        comments: action.comments
      }
    case fromCommentActions.POST_REPLY_FAILED:
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
 */
