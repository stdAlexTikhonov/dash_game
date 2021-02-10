import { ACTIVATE_COMPUTER, RESET_ACTIVATION } from "../actions/computerActions";

const init = false;

export const computerReducer = (state = init, action) => {
    switch (action.type) {
      case ACTIVATE_COMPUTER: {
        return true;
      }
      case RESET_ACTIVATION: {
        return false;
      }
      default:
        return state;
  }
}