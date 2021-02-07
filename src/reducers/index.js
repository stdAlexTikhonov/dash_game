import { settingsReducer } from "./settingsReducer";
import { scoreReducer } from "./scoreReducer";
import { bombReducer } from "./bombReducer";

export const appReducer = (state = {}, action) => {
    return {
        settings: settingsReducer(state.settings, action),
        score: scoreReducer(state.score, action),
        bombs: bombReducer(state.bombs, action)
    }
}