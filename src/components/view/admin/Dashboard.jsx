import React from "react";

import CardLineChart from "../../Cards/CardLineChart.jsx";
import CardBarChart from "../../Cards/CardBarChart.jsx";
import CardPageVisits from "../../Cards/CardPageVisits.jsx";
import CardSocialTraffic from "../../Cards/CardSocialTraffic.jsx";

export default function Dashboard() {
    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                    <CardSocialTraffic />
                </div>
                <div className="w-full xl:w-4/12 px-4">
                    <CardBarChart />
                </div>
            </div>
        </>
    );
}
