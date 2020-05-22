import { useReducer } from 'react';

const initialState = {
    loading: false, error: null, data: { result: [], statusCode: 0, message: '' }
};

const httpReducer = (currentState, action) => {
    switch (action.type) {
        case 'SEND':
            return { ...initialState, loading: true };
        case 'RESPONSE':
            return { ...currentState, loading: false, data: action.data };
        case 'ERROR':
            return { loading: false, error: action.errorMessage };
        case 'CLEAR': {
            console.log('Cleared...');

            return initialState;
        }
        default:
            throw new Error('Invalid http type option!');
    }
}

const useHttp = () => {
    const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

    const clear = () => dispatchHttp({ type: 'CLEAR' });
    const sendRequest = async (url, method, body) => {
        clear();
        dispatchHttp({ type: 'SEND' })

        try {
            let response = await fetch(url, { method: method, body: body, headers: { 'Content-Type': 'application/json' } });
            let result = await response.json();
            let data = { result: result, statusCode: response.status, message: result.message }
            dispatchHttp({ type: 'RESPONSE', data: data });
        } catch(error) {
            dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong! A more descriptive log has been saved on the server' });
        }
    }

    const sendPromisableRequest = async (url, method, body) => {
        let response = await fetch(url, { method: method, body: body, headers: { 'Content-Type': 'application/json' } });
        let result = await response.json();
        return { result: result, statusCode: response.status, message: result.message };
    }

    return {
        loading: httpState.loading,
        data: httpState.data,
        error: httpState.error,
        sendRequest: sendRequest,
        sendPromisableRequest: sendPromisableRequest,
        clear: clear
    };
};

export default useHttp;