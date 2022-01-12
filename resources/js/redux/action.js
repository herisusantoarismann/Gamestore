export const increment = (number) => {
    return {
        type: "Increment",
        nm: number,
    };
};

export const decrement = (number) => {
    return {
        type: "Decrement",
        nm: number,
    };
};

export const addGames = (games) => {
    return {
        type: "ADD_GAMES",
        games: games,
    };
};

export const deleteGames = (idx) => {
    return {
        type: "DELETE_GAMES",
        idx: idx,
    };
};

export const deleteAllGames = () => {
    return {
        type: "DELETE_ALL_GAMES",
    };
};

export const addUser = (user) => {
    return {
        type: "ADD_USER",
        user: user,
    };
};

export const deleteUser = () => {
    return {
        type: "DELETE_USER",
    };
};

export const Order = (id) => {
    return {
        type: "ADD_ORDER",
        id: id,
    };
};
