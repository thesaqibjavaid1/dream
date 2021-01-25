import {ADD_TO_CART, REMOVE_FROM_CART} from "../actions/types";

const initialState = [];

export default function (state = initialState, action: any) {
    const {type, payload} = action;
    console.log("payload", payload);

    switch (type) {
        case ADD_TO_CART:
            return [...state, payload]

        case REMOVE_FROM_CART:
            // @ts-ignore
            return state.filter(item => item.id !== payload.id)

    }
    return state;

}
