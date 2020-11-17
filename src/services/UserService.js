import axios from 'axios';
export const userService = {
    callLoginApi,
    getRankingListSchool,
    getSchoolDetailInfo,
    getUserInfo
}
const API_URL = "http://localhost:8080";

function callLoginApi(email, password) {
    return axios({
        method: "POST",
        url: API_URL + "/signin",
        data: {
            email: email,
            password: password
        }
    }).then(

        response => {
            if (response.data.status === "SUCCESS") {
                const token_ = response.data.data.token
                localStorage.setItem("token", token_);
                localStorage.setItem("id", response.data.data.id)
                console.log(token_);
                let msg = response.data.status;
                return [response, msg];
            } else {
                let msg = response.data.status
                return [response, msg];
            }

        }
    ).catch(
        error => {
            let status = error.status;
            console.log("err",
                error)
            let msg = "";
            if (status === 401) {
                msg = "password wrong"
            } else if (status === 400) {
                msg = "email is incorrect or exist"
            } else {
                msg = "ERROR!!!!!!"
            }
            return [status, msg];
        }
    )
}

function getRankingListSchool() {
    return axios({
        method: "POST",
        url: API_URL + "/api/public/paginateSchool",
        data: {
            page: "1",
            size: "10"
        }
    }).then(
        response => {

            const dataSchool = response.data.data.responses
            let totalPage = response.data.data.totalPage
            return [dataSchool, totalPage];
        }
    )
}

function getSchoolDetailInfo(schoolName) {
    return axios({
        method: "POST",
        url: "http://localhost:8080/api/public/getShoolInfoByName",
        data: {
            name: schoolName
        }
    }).then(
        response => {
            const schooldetail = response.data.data
            return schooldetail;
        }
    )
}

function getUserInfo(id) {
    return axios({
        method: "POST",
        url: API_URL + "/api/public/getUserInfomation",
        data: {
            id: id
        }
    }).then(
        response => {
            const userInfo = response.data.data;
            return userInfo;
        }
    )
}