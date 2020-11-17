import axios from 'axios';
export const adminService = {
    getListCustomer,
    getListSchool,
    deleteCustomer
}
const API_URL = "http://localhost:8080";

function getListCustomer(index) {
    return axios({
        method: "POST",
        url: API_URL + "/api/admin/paginationUser",
        // headers: {
        //     "Authorization": 'Bearer ' + localStorage.getItem("token"),
        //     'Content-Type': 'application/json',
        // },
        data: {
            page: index,
            size: "50"
        }
    }).then(
        response => {
            const dt = response.data.data;
            console.log("ketqua", dt)
            const dataUser = response.data.data.responses
            let totalPage = response.data.data.totalPage
            return [dataUser, totalPage];
        }
    )
}

function getListSchool(index) {
    return axios({
        method: "POST",
        url: API_URL + "/api/public/paginateSchool",
        // headers: {
        //     "Authorization": 'Bearer ' + localStorage.getItem("token"),
        //     'Content-Type': 'application/json',
        // },
        data: {
            page: index,
            size: "10"
        }
    }).then(
        response => {
            // const dt = response.data.data;
            // console.log("ketqua", dt)
            const dataSchool = response.data.data.responses
            let totalPage = response.data.data.totalPage
            return [dataSchool, totalPage];
        }
    )
}

function deleteCustomer(id) {
    return axios({
        method: "DELETE",
        url: API_URL + "/api/admin/delete",
        headers: {
            "Authorization": 'Bearer ' + localStorage.getItem("token"),
            'Content-Type': 'application/json',
        },
        data: {
            id: id
        }
    })
}