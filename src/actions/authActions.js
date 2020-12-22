import { userService } from '../services/UserService';
import
history from '../history';
export const login = ((email, password) => {

    function setLoginPending(isLoginPending) {
        return {
            type: 'SET_LOGIN_PENDING',
            isLoginPending
        };
    }

    function setLoginSuccess(isLoginSuccess) {
        return {
            type: 'SET_LOGIN_SUCCESS',
            isLoginSuccess
        };
    }

    function setLoginError(loginError) {
        return {
            type: 'SET_LOGIN_ERROR',
            loginError
        }
    }

    function returnUserInfo(data) {
        return {
            type: 'GET_USER_DATA',
            data
        }
    }
    return dispatch => {
        dispatch(setLoginPending(true));
        userService.callLoginApi(email, password).then(
            ([content, msg]) => {
                var st = content.data
                if (st.status === 'SUCCESS') {
                    if (st.data.role === 'ADMIN') {
                        dispatch(setLoginSuccess(true))
                        dispatch(returnUserInfo(st.data))
                        history.push("/admin")
                    } else {
                        dispatch(setLoginSuccess(true))
                        dispatch(returnUserInfo(st.data))
                        history.goBack();
                    }

                } else if (st.status === 'FAILED') {
                    dispatch(setLoginError(msg))
                }

            }
        )

    }
});
export const logout = () => {

    function logOut(isLoginSuccess) {
        return {
            type: 'LOG_OUT',
            isLoginSuccess
        }
    }
    return dispatch => {
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        localStorage.removeItem('role')
        dispatch(logOut(false))
        history.push("/")
    }
}
export const getUserInfo = (id) => {
    function getInfo(info) {
        return {
            type: 'GET_USER_INFOMATION',
            info
        }
    }
    return dispatch => {
        userService.getUserInfo(id).then(
            (userInfomation) => {
                const data = userInfomation;
                dispatch(getInfo(data))
            })
    }

}