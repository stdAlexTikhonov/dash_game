import { PLUS_ONE_BOMB, RESET_BOMBS, MINUS_ONE_BOMB } from "../actions/bombActions";

const init = 0

export const bombReducer = (state = init, action) => {
    switch (action.type) {
      case PLUS_ONE_BOMB: {
        return state + 1;
      }
      case MINUS_ONE_BOMB: {
        return state > 0 ? state - 1 : 0;
      }
      case RESET_BOMBS:
        return init;
      default:
        return state;
  }
}