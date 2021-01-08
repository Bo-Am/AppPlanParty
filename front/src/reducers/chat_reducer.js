import { SEND_MESSAGE } from "../actions/types";
import { INIT_ROOM } from "../actions/types";
const inState = {
  room: null,
  users: [],
  messages: [],
};

export function chatReducer(state = inState, action) {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, { message: action.payload.message, user: action.payload.user}],
      };
      case 'initmsg':
      return {
        ...state,
        messages: [...action.payload]
      };
    case 'clean':
      return {
        ...state,
        messages: [],
      };
    case INIT_ROOM:
      return { ...state, room: action.payload.room, 
      };

    default:
      return state;
  }
}
