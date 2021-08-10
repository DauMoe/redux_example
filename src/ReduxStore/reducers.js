export const counterReducers = (initState = 0, action) => {
    switch (action.type) {
        case "INCREMENT":
            return initState+1;
        case "DECREMENT":
            return initState-1;
        default:
            return initState;
    }
}