import axios from 'axios';
export const adminService = {
    getListCustomer,
    getListSchool,
    deleteCustomer,
    updateCustomerInfo,
    getAllCommentBySchoolId,
    deleteComment,
    getListRanking,
    getAllUser,
    getAllSchool
}
const API_URL = "http://localhost:8080";

function getListCustomer(index) {
    return axios({
        method: "POST",
        url: API_URL + "/api/admin/paginationUser",
        headers: {
            "Authorization": 'Bearer ' + localStorage.getItem("token"),
            'Content-Type': 'application/json',
        },
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

function getAllUser() {
    return axios({
        method: "GET",
        url: API_URL + "/api/admin/all",
    }).then(
        response => {
            const user = response.data.data
            return user;
        }
    )
}

function getAllSchool() {
    return axios({
        method: "GET",
        url: API_URL + "/api/admin/getAllSchool",
    }).then(
        response => {
            const dataSchool = response.data.data
            return dataSchool;
        }
    )
}

function getListRanking() {
    return axios({
        method: "GET",
        url: API_URL + "/api/admin/getRanking",
    }).then(
        response => {
            const dataSchool = response.data.data
            return dataSchool;
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

function deleteComment(id) {
    return axios({
        method: "DELETE",
        url: API_URL + "/api/admin/deleteComment",
        data: {
            id: id
        }
    })
}

function updateCustomerInfo(id, name, email, address) {
    return axios({
        method: "PUT",
        url: API_URL + "/api/admin/update",
        headers: {
            "Authorization": 'Bearer ' + localStorage.getItem("token"),
            'Content-Type': 'application/json',
        },
        data: {
            "id": id,
            "name": name,
            "email": email,
            "address": address,
            "role": "USER"
        }
    }).then(
        res => {
            const newdata = res.data.data;
            return newdata;
        }
    )
}

function getAllCommentBySchoolId(schoolId) {
    return axios({
        method: "POST",
        url: API_URL + "/api/admin/getCommentBySchoolId",
        data: {
            schoolId: schoolId
        }
    }).then(
        res => {
            const listComtBySchoolId = res.data.data;
            return listComtBySchoolId;
        }
    )
}