import { useReducer } from 'react';

const initialState = {
    loading: false, error: null, data: []
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

    const sendRequest = (url, method, body) => {
        clear();

        dispatchHttp({ type: 'SEND' })
        console.log('Fetching ' + url + ' url');
        

        // setTimeout(() => {
            fetch(url, { method: method, body: body, headers: { 'Content-Type': 'application/json' } })
                .then(res => {
                    return res.json();
                }).then(data => {                    
                    dispatchHttp({ type: 'RESPONSE', data: data });
                }).catch(error => {
                    dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong! A more descriptive log has been saved on the server' });
                })
        // }, 1500);
    }

    return {
        loading: httpState.loading,
        data: httpState.data,
        error: httpState.error,
        sendRequest: sendRequest,
        clear: clear
    };
};

export default useHttp;