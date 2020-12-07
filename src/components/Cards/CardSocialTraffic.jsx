import React, { useState, useCallback, useEffect } from "react";
import { adminService } from "../../services/AdminService";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import Axios from "axios";
// components

const CardSocialTraffic = () => {
    const [school, setSchool] = useState([]);
    function pushDataFromAPIData(listSchool) {
        listSchool.map((i) => {
            return {
                "rank": i.rank,
                "schoolId": i.schoolId,
                "schoolName": i.schoolName,
                "rate": i.rate
            }
        })
        listSchool.sort((a, b) => (a.rank > b.rank) ? 1 : ((b.rank > a.rank) ? -1 : 0));
        return listSchool
    }
    const getRankingListfunc = useCallback(
        () => {
            adminService.getListRanking().then(
                (content) => {
                    const data = content;
                    setSchool(pushDataFromAPIData(data));
                }
            )
        }, []
    )
    useEffect(() => {
        getRankingListfunc();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleClick() {
        Swal.fire({
            title: "Bạn đang thực hiện cập nhật xếp hạng trường mầm non",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Xác nhận",
            cancelButtonText: "Hủy"
        })
            .then(
                result => {
                    if (result.isConfirmed) {
                        Axios({
                            method: "GET",
                            url: "http://localhost:8080/api/admin/newRanking"
                        }
                        ).then(res => {
                            refetchData();
                            toast.info("Thực hiện cập nhật thành công")
                        })
                    }
                }
            )
    }

    const rank = school.map((n, i) => {
        return <>
            <tr key={i}>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                    {n.rank}
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {n.schoolName}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    <div className="flex items-center">
                        <span className="mr-2">{n.rate}</span>
                        <div className="relative w-full">
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                                <div
                                    style={{ width: (n.rate / 5) * 100 }}
                                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                                ></div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        </>
    })
    const refetchData = useCallback(() => getRankingListfunc(), [getRankingListfunc])
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="font-semibold text-base text-gray-800">
                                XẾP HẠNG CÁC TRƯỜNG
              </h3>
                        </div>
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                            <button
                                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleClick}
                            >
                                Cập nhật xếp hạng
                            </button>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    {/* Projects table */}
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead className="thead-light">
                            <tr>
                                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                                    Vị trí
                </th>
                                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                                    Trường
                </th>
                                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                                    Điểm
                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {rank}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default CardSocialTraffic;