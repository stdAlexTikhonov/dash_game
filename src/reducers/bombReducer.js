import { PLUS_ONE_BOMB, RESET_BOMBS, PUT_BOMB } from "../actions/bombActions";

const init = { quantity: 0, bombs: [] }

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
          bombs: [
            ...state.bombs,
            action.bomb
          ],
          quantity: state.quantity > 0 ? state.quantity - 1 : 0
        }
      }
      case RESET_BOMBS:
        return init;
      default:
        return state;
  }
}