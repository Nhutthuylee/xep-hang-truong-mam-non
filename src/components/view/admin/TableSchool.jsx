import React from "react";
import { useState, useEffect, useMemo, useCallback } from 'react';
import { adminService } from '../../../services/AdminService';
import CardTableSchool from "../../Cards/CardTableSchool.jsx";


const TableSchool = () => {

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
            { Header: "ID", accessor: 'id' },
            { Header: "School Name", accessor: 'schoolName' },
            { Header: "Address", accessor: 'address' },
            // { Header: "Phone Number", accessor: 'phoneNumber' },
            { Header: "Tuition", accessor: 'tuition' },
        ]);


    function pushDataFromAPIData(listCustomer) {
        var result = [];
        for (const i in listCustomer) {
            var l = {
                "id": listCustomer[i].id,
                "schoolName": listCustomer[i].schoolName,
                "address": listCustomer[i].address,
                "phoneNumber": listCustomer[i].phoneNumber,
                "tuition": listCustomer[i].tuition,
                "schoolType": listCustomer[i].schoolType,
                "ward": listCustomer[i].ward,
                "image": listCustomer[i].image,
            }
            // console.log("l", l)
            result.push(l)
        }
        return result
    }
    const getListSchoolfunc = useCallback((index) => {
        let next = index.toString()
        console.log("dmm", next)
        adminService.getListSchool(next).then(
            ([content, pages]) => {
                const data = content;
                // console.log("data", data)
                setCustomer(pushDataFromAPIData(data));
                var gettotal = pages;
                setTotal(gettotal);
                // console.log("cai gi day", total);
            }
        )
    },[])
    useEffect(() => {

        getListSchoolfunc(1)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        getListSchoolfunc(index)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index])
    const refetchData = useCallback(() => { getListSchoolfunc(index) }, [getListSchoolfunc, index]);

    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <CardTableSchool columns={column} data={customer} totalPage={total} refetchData={refetchData} />
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
export default TableSchool;
