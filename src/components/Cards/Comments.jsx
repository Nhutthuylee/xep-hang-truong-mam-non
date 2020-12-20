import React, { useEffect, useState, useCallback } from 'react';
import CardComment from './CardComment';
import { userService } from '../../services/UserService';
import Axios from 'axios';
const Comments = (props) => {

    const { schoolId } = props;
    const [data, setData] = useState([]);
    const [input, setInput] = useState({
        content: ''
    })
    const { content } = input;
    const getComentDatafunc = useCallback((schoolid) => {


        userService.getAllCommentForSchool(schoolid).then(
            (res) => {
                setData(res)
            }
        )
    }, [])
    useEffect(() => {
        getComentDatafunc(schoolId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    function handleChange(e) {
        const { name, value } = e.target;
        setInput(input => ({ ...input, [name]: value }));
    }
    const handleSubmitComment = (e) => {
        e.preventDefault();
        if (content) {
            Axios({
                method: "POST",
                url: "http://localhost:8080/createComment",
                headers: {
                    "Authorization": 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json',
                },
                data: {
                    userId: localStorage.getItem('id'),
                    schoolId: schoolId,
                    content: content
                }
            }).then(
                response => {
                    // const listcmt = response.data.data;
                    // console.log("cmt sau khi bình luận", listcmt);
                    setInput({
                        content: ""
                    });
                    refetchComment();
                }
            )
        }
    }
    const refetchComment = useCallback(() => { getComentDatafunc(schoolId) }, [getComentDatafunc, schoolId]);
    return (
        <>
            {localStorage.getItem('token') &&
                <form onSubmit={handleSubmitComment}>
                    <div className="form-group">
                        <textarea
                            className="form-control"
                            placeholder="Your Comment"
                            name="content"
                            value={input.content}
                            onChange={handleChange}
                            rows="3"
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" disabled={""} className="btn btn-primary">
                            Comment ➤
                    </button>
                    </div>
                </form>}
            {!localStorage.getItem('token') && <p>ĐĂNG NHẬP ĐỂ BÌNH LUẬN TRAO ĐỔI</p>}

            <CardComment data={data} />
        </>
    );
};

export default Comments;