import productManagementActions from '../constants/productManagement.constants';

const INITIAL_STATE = {
    selectedSeller: ''
}

export function productManagement(state = INITIAL_STATE, action) {
    switch (action.type) {
        case productManagementActions.SELLER_SELECTED:
            return { ...state, selectedSeller: action.selectedSeller };
        case productManagementActions.SELLER_UNSELECTED:
            return INITIAL_STATE;
        default:
            return state;
    }
}