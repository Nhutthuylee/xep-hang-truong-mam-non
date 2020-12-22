import Axios from "axios";
import React, { memo, useState } from "react";
import { toast } from "react-toastify";

// components

const CardProfile = (props) => {
    const { data } = props
    const id = localStorage.getItem('id');
    const [image, setimage] = useState()
    function handleUpdateAvatar(e) {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("file", image)
        Axios({
            method: "POST",
            url: "http://localhost:8080/updateAvatar",
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json',
            },
            data: formData
        }).then(
            res => {
                props.refetchData();
                toast.success("Đổi ảnh đại diện thành công")
            }
        )

    }
    return (
        <>
            {console.log("avatar", data)}
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16 h-350-px">
                <div className="px-6">
                    <div className="flex flex-wrap justify-center mb-10">
                        <div className="w-full flex justify-center">
                            <div className="relative">
                                <img
                                    alt="..."
                                    src={data.avatar}
                                    className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                                />
                            </div>

                        </div>

                    </div>
                    <div className="w-full text-center mt-24">
                        <div className="relative">
                            <button type="button" data-toggle="modal" className="btn mt-3" data-target="#updateAvatar">Đổi ảnh đại diện</button>
                            <div className="modal fade" id="updateAvatar" tabIndex={-1} role="dialog" aria-labelledby="updateAvatarTitle" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="updateAvatarTitle">Đổi ảnh đại diện</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <form name="form" >
                                                <div className="form-group">
                                                    <img src={data.avatar} alt="avatar"></img>
                                                </div>
                                                <div className="form-group">
                                                    <label >image</label>
                                                    <input type="file" className="form-control" name="Image" onChange={(e) => setimage(e.target.files[0])} />

                                                </div>


                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary" onClick={handleUpdateAvatar}>Send</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full text-center mt-2">
                        <h3 className="text-xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                            {data.name}
                        </h3>
                        <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                            <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                            {data.address}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default memo(CardProfile);