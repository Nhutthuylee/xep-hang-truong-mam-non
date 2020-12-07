/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import { adminService } from '../../../services/AdminService';
import CardTableComment from '../../Cards/CardTableComment';
import { toast } from "react-toastify";
import Swal from 'sweetalert2';

const CommentManager = () => {
    let { id, name } = useParams();
    const [comment, setComment] = useState([])

    function handleDelete(cmt) {
        console.log("id school", cmt.id)
        Swal.fire({
            title: "Bạn đang thực hiện xóa bình luận",
            text: "Bạn muốn xóa bình luận này đúng không?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy"
        }).then(
            result => {
                if (result.isConfirmed) {
                    adminService.deleteComment(cmt.id)
                        .then(
                            res => {
                                refetchData()
                                toast.success("Xóa comment thành công")
                            }
                        )
                }
            }
        )
    }
    const column = useMemo(
        () => [
            { Header: "ID", accessor: 'id' },
            { Header: "User name", accessor: 'username' },
            { Header: "Content", accessor: 'content' },
            {
                Header: 'Action',
                accessor: "role",
                disableFilters: true,
                Cell: ({ row }) => (
                    <div>
                        <button className="btn btn-danger" onClick={() => handleDelete(row.original)}>Xóa</button>
                    </div>
                )
            }
        ]
    )

    const getListCommentBySchoolId = useCallback((id) => {
        adminService.getAllCommentBySchoolId(id).then(
            listComt => {
                const cmts = listComt;
                setComment(cmts);
            }
        )
    }, [])
    useEffect(() => {
        getListCommentBySchoolId(id)
    }, []);

    const refetchData = useCallback(() => { getListCommentBySchoolId(id) }, [getListCommentBySchoolId, id])
    return (
        <div>
            <strong>Trang quản lý bình luận của {name}</strong>
            {comment === [] && <p>Chưa có bình luận nào thuộc về trường này</p>}
            {comment !== [] && <CardTableComment columns={column} data={comment} refetchData={refetchData} />}
        </div>
    );
};

export default CommentManager;