import React, { useState, useEffect, useCallback } from 'react';
import CardSchoolInfomation from '../../Cards/CardSchoolInfomation';
import '../../../styles/ListRankingSchool.scss';
import { userService } from '../../../services/UserService';
const ListRankingSchool = () => {
    const [school, setSchool] = useState([]);
    function pushDataFromAPIData(listSchool) {
        // var result = [];
        // for (const i in listSchool) {
        //     var l = {
        //         "id": listSchool[i].id,
        //         "schoolName": listSchool[i].schoolName,
        //         "address": listSchool[i].address,
        //         "phoneNumber": listSchool[i].phoneNumber,
        //         "tuition": listSchool[i].tuition,
        //         "schoolType": listSchool[i].schoolType,
        //         "ward": listSchool[i].ward,
        //         "image": listSchool[i].image,
        //     }
        //     // console.log("l", l)
        //     result.push(l)
        // }
          listSchool.map((i) => {
            return {
                "rank": i.rank,
                "schoolId": i.schoolId,
                "schoolName": i.schoolName,
                "address": i.address,
                "phoneNumber": i.phoneNumber,
                "tuition": i.tuition,
                "schoolType": i.schoolType,
                "ward": i.ward,
                "image": i.image
            }
        })
        listSchool.sort((a,b) => (a.rank > b.rank) ? 1 : ((b.rank > a.rank) ? -1 : 0)); 
        return listSchool
    }
    const getRankingListfunc = useCallback(
        () => {
            userService.getRankingListSchool().then(
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
    return (
        <div className="container">
            <div className="ranking_title">
                <h1>XẾP HẠNG TUẦN NÀY</h1>
            </div>
            <CardSchoolInfomation data={school} />
        </div>
    );
};

export default ListRankingSchool;