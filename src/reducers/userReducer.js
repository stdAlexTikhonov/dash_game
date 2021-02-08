import { TOGGLE_SPACE_BAR } from "../actions/userActions";

const init = false;

export const userReducer = (state = init, action) => {
    switch (action.type) {
      case TOGGLE_SPACE_BAR: {
        return !state;
      }
      default:
        return state;
  }
}