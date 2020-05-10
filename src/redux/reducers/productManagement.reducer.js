import productManagementActions from '../constants/productManagement.constants';

const INITIAL_STATE = {
    seller: ''
}

export function seller(state = INITIAL_STATE, action) {
    switch(action.type) {
        case productManagementActions.SELLER_SELECTED:
            return { ...state, seller:action.selectedSeller };
        default:
            return state;
    }
}