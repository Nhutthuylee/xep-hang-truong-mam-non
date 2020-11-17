import React from "react";
import { useState, useEffect, useMemo, useCallback } from 'react';
import { adminService } from '../../../services/AdminService';
import CardTable from "../../Cards/CardTable.jsx";


const Tables = () => {

    const [customer, setCustomer] = useState([]);
    const [total, setTotal] = useState(1);
    const [index, setindex] = useState(1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const column = useMemo(
        () => [
            {
                Header: () => null,
                id: 'expander', // 'id' is required
                Cell: ({ row }) => (
                    <span {...row.getToggleRowExpandedProps()}>
                        {row.isExpanded ? '👇' : '👉'}
                    </span>
                ),
            },
            { Header: "User ID", accessor: 'id' },
            { Header: "User Name", accessor: 'name' },
            { Header: "Email", accessor: 'email' },
            { Header: "Address", accessor: 'address' },
            { Header: "Avatar", accessor: 'avatar' },
            // { Header: "Role Name", accessor: 'role' },
            // {
            //     Header: 'Action',
            //     accessor: "role",
            //     Cell: row => (
            //         <div>
            //             <button style={{ marginRight: "5px" }}> <i className="fa fa-pencil-square-o" aria-hidden="true"></i>Edit</button>
            //             <button onClick={()=>}> <i className="fa fa-trash-o" aria-hidden="true"></i>Delete</button>
            //         </div>
            //     )
            // }
        ]);


    function pushDataFromAPIData(listCustomer) {
        return listCustomer.map((i) => {
            return {
                "id": i.id,
                "name": i.name,
                "email": i.email,
                "address": i.address,
                "avatar": i.avatar
            }
        })
    }
    const getListCustomerfunc = useCallback((index) => {
        let next = index.toString()
        console.log("T vua moi lay trang ", next)
        adminService.getListCustomer(next).then(
            ([content, pages]) => {
                const data = content;
                // console.log("data", data)
                setCustomer(pushDataFromAPIData(data));
                var gettotal = pages;
                setTotal(gettotal);
            }
        )
    },[])
    useEffect(() => {

        getListCustomerfunc(1)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    useEffect(() => {
        getListCustomerfunc(index);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index])

    const refetchData = useCallback(() => getListCustomerfunc(index), [getListCustomerfunc, index])

    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <CardTable columns={column} data={customer} totalPage={total} refetchData={refetchData} />
                    <div>
                        <button
                            type="button"
                            style={{ marginRight: "5px" }}
                            className="btn btn-secondary"
                            onClick={() => setindex(index - 1)}
                            disabled={index === 1 ?? 'undefined'}
                        >Pre</button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setindex(index + 1)}
                            disabled={index === total ?? 'undefined'}
                        >Next</button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Tables;
