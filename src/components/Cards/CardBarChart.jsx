import React, { useState, useCallback, useEffect } from "react";
import CardStats from "./CardStats";
import { adminService } from "../../services/AdminService";
const CardBarChart = () => {
    const [user, setUser] = useState([]);
    const [school, setSchool] = useState([]);
    const getAllUserListfunc = useCallback(
        () => {
            adminService.getAllUser().then(
                (content) => {
                    const data = content;
                    setUser(data);
                }
            )
        }, []
    )
    const getAllSchoolListfunc = useCallback(
        () => {
            adminService.getAllSchool().then(
                (content) => {
                    const data = content;
                    setSchool(data);
                }
            )
        }, []
    )

    useEffect(() => {
        getAllSchoolListfunc();
        getAllUserListfunc();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h6 className="uppercase text-gray-500 mb-1 text-xs font-semibold">
                                Thống kê
              </h6>
                            <h2 className="text-gray-800 text-xl font-semibold">
                                Trong hệ thống hiện có
              </h2>
                        </div>
                    </div>
                </div>
                <div className="p-4 flex-auto">
                    {/* Chart */}
                    <div className="relative h-350-px">
                        <CardStats
                            statSubtitle="Người dùng"
                            statTitle={user}
                            statPercentColor="text-green-500"
                            statIconName="far fa-chart-bar"
                            statIconColor="bg-red-500"
                        />
                        <div className="mt-3">
                            <CardStats
                                statSubtitle="Số trường mầm non"
                                statTitle={school}
                                statPercentColor="text-green-500"
                                statIconName="fas fa-chart-pie"
                                statIconColor="bg-orange-500"
                            />
                        </div>
                    </div>



                </div>
            </div>
        </>
    );
}
export default CardBarChart;
