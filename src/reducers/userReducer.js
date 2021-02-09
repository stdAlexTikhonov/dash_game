import { SET_SPACE_BAR, RESET_SPACE_BAR } from "../actions/userActions";

const init = false;

export const userReducer = (state = init, action) => {
    switch (action.type) {
      case SET_SPACE_BAR: {
        return true;
      }
      case RESET_SPACE_BAR: {
        return false;
      }
      default:
        return state;
  }
}