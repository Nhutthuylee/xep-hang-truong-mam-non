import { adminService } from "../services/AdminService";

export const adminAction = {
    fetchListCustomer
}

function fetchListCustomer() {
    return dispatch => {
        adminService.getListCustomer()
            .then(
                ([content, msg]) => {
                    const listCust = content;
                    // console.log(msg)
                        // console.log("cust", content)
                    dispatch(returnListCustomer(listCust))
                }
            )
    }
}
export function returnListCustomer(listCust) {
    return {
        type: 'GET_LIST_CUSTOMER',
        data: listCust
    }
}