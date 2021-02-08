import { settingsReducer } from "./settingsReducer";
import { scoreReducer } from "./scoreReducer";
import { bombReducer } from "./bombReducer";
import { userReducer } from "./userReducer";

export const appReducer = (state = {}, action) => {
    return {
        settings: settingsReducer(state.settings, action),
        score: scoreReducer(state.score, action),
        bombs: bombReducer(state.bombs, action),
        space_bar: userReducer(state.space_bar, action),
    }
}