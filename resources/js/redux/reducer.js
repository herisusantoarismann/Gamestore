const initialState = {
    games: [],
    user: {},
    order: "",
};

// const counter = (state = initialState.counter, action) => {
//     switch (action.type) {
//         case "Increment":
//             return state + action.nm;
//         case "Decrement":
//             return state - action.nm;
//         default:
//             return state;
//     }
// };

const user = (state = initialState.user, action) => {
    switch (action.type) {
        case "ADD_USER":
            state = action.user;
            return state;
        case "DELETE_USER":
            state = "";
            return state;
        default:
            return state;
    }
};

const games = (state = initialState.games, action) => {
    switch (action.type) {
        case "ADD_GAMES":
            state = state.slice();
            state = [...state, action.games];
            return state;
        case "DELETE_GAMES":
            let stateTemp = "";
            for (let i = 0; i < state.length; i++) {
                if (state[i].game_id == action.idx) {
                    stateTemp = state.filter(
                        (item) => item.game_id != action.idx
                    );
                }
            }
            return stateTemp;
        case "DELETE_ALL_GAMES":
            state = "";
            return state;
        default:
            return state;
    }
};

const order = (state = initialState.order, action) => {
    switch (action.type) {
        case "ADD_ORDER":
            state = action.id;
            return state;
        default:
            return state;
    }
};

export { user, games, order };
