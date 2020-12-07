const initState = {
    isLoginSuccess: false,
    isLoginPending: false,
    loginError: null,
    data: 'khach',
};

export const login = (state = initState, action) => {
    switch (action.type) {
        case 'SET_LOGIN_PENDING':

            return {...state,
                ...action.isLoginPending
            };
        case 'SET_LOGIN_SUCCESS':
            return {...state,
                ...action.isLoginSuccess
            };
        case 'SET_LOGIN_ERROR':
            return {...state,
                ...action.loginError
            };
        case 'LOG_OUT':
            return {...state,
                ...action.isLoginSuccess
            };
        case 'GET_USER_DATA':
            return {...state,
                ...action.data
            };
        case 'GET_USER_INFOMATION':
            return {
                ...state,
                ...action.info
            }
        default:
            return state
    }

}