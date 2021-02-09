import { PLUS_ONE_BOMB, RESET_BOMBS, PUT_BOMB, CLEAR_BOMB } from "../actions/bombActions";

const init = { quantity: 0, bomb: null }

export const bombReducer = (state = init, action) => {
    switch (action.type) {
      case PLUS_ONE_BOMB: {
        return {
          ...state,
          quantity: state.quantity + 1,
        }
      }
      case PUT_BOMB: {
        return {
          bomb: state.quantity > 0 ? action.bomb : null,
          quantity: state.quantity > 0 ? state.quantity - 1 : 0
        }
      }
      case RESET_BOMBS:
        return init;
      case CLEAR_BOMB:
        return {
          ...state,
          bomb: null,
        }
      default:
        return state;
  }
}