var initialState = [];
export default function adminReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_LIST_CUSTOMER':
            // console.log(...action.data)
            return {...state, ...action.data };
        default:
            return state;
    }
}