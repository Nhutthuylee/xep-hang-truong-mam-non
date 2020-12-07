import axios from 'axios';
export const userService = {
    callLoginApi,
    getRankingListSchool,
    getSchoolDetailInfo,
    getUserInfo,
    signUp,
    getAllCommentForSchool,
    getSchoolByWardId
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
                let msg = response.data.message;
                return [response, msg];
            } else {
                let msg = response.data.message
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
        method: "GET",
        url: API_URL + "/api/public/getRankingList",
    }).then(
        response => {

            const dataSchool = response.data.data
            return dataSchool;
        }
    )
}

function getSchoolDetailInfo(schoolName) {
    return axios({
        method: "POST",
        url: API_URL + "/api/public/getShoolInfoByName",
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
            // console.log("data 111", userInfo)
            return userInfo;
        }
    )
}

function signUp(name, email, password) {
    return axios({
        method: "POST",
        url: API_URL + "/signup",
        data: {
            email: email,
            password: password,
            username: name
        }
    })
}

function getAllCommentForSchool(id) {
    return axios({
        method: "POST",
        url: API_URL + "/api/public/getAllCommentForSchool",
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            "schoolId": id
        }
    }).then(
        CommentData => {
            const kqua = CommentData.data.data;
            return kqua;
        }

    )
}

function getSchoolByWardId(id) {
    return axios({
        method: "POST",
        url: API_URL + "/api/public/getSchoolByWardId",
        data: {
            "id": id
        }
    }).then(
        res => {
            const listSchool = res.data.data
            return listSchool;
        }
    )
}