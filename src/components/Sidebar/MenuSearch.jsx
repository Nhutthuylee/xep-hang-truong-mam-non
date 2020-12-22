import React from 'react';
import { Link } from "react-router-dom";
const MenuSearch = () => {
    const [collapseShow, setCollapseShow] = React.useState("hidden");
    return (
        <>
            <nav className="w-100 h-100 mb-0 md:block md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden bg-white flex flex-wrap items-center justify-between md:w-64 z-10 py-4">
                <div className="md:flex-col md:items-stretch md:min-h-full md:flex-no-wrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
                    {/* Toggler */}
                    <button
                        className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                        type="button"
                        onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
                    >
                        <i className="fas fa-bars"></i>
                    </button>

                    {/* Collapse */}
                    <div
                        className={
                            "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
                            collapseShow
                        }
                    >
                        {/* Collapse header */}

                        {/* Form */}
                        <form className="mt-6 mb-4 md:hidden">
                            <div className="mb-3 pt-0">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="px-3 py-2 h-12 border border-solid  border-gray-600 placeholder-gray-400 text-gray-700 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                                />
                            </div>
                        </form>

                        {/* Divider */}

                        {/* Heading */}
                        <h2 className="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline px-4" style={{ fontSize: "30px" }}>
                            Có thể bạn muốn tìm
            </h2>
                        {/* Navigation */}

                        <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                            <li className="items-center">
                                <Link
                                    className={
                                        " px-4 text-xs uppercase py-3 font-bold block " +
                                        (window.location.href.indexOf("/truong-tai-phuong-hoa-minh") !== -1
                                            ? "text-blue-500 hover:text-blue-600"
                                            : "text-gray-800 hover:text-gray-600")
                                    }
                                    style={{ textDecoration: "none" }}
                                    to="/truong-tai-phuong-hoa-minh"
                                >

                                    Các trường tại phường Hòa Minh
                </Link>
                            </li>
                            <hr className="my-4 md:min-w-full" />
                            <li className="items-center">
                                <Link
                                    className={
                                        " px-4 text-xs uppercase py-3 font-bold block " +
                                        (window.location.href.indexOf("/truong-tai-phuong-hoa-khanh-nam") !== -1
                                            ? "text-blue-500 hover:text-blue-600"
                                            : "text-gray-800 hover:text-gray-600")
                                    }
                                    style={{ textDecoration: "none" }}
                                    to="/truong-tai-phuong-hoa-khanh-nam"
                                >

                                    Các trường tại Phường Hòa Khánh Nam
                </Link>
                            </li>
                            <hr className="my-4 md:min-w-full" />
                            <li className="items-center">
                                <Link
                                    className={
                                        " px-4 text-xs uppercase py-3 font-bold block " +
                                        (window.location.href.indexOf("/truong-tai-phuong-hoa-khanh-bac") !== -1
                                            ? "text-blue-500 hover:text-blue-600"
                                            : "text-gray-800 hover:text-gray-600")
                                    }
                                    style={{ textDecoration: "none" }}
                                    to="/truong-tai-phuong-hoa-khanh-bac"
                                >

                                    Các trường tại phường Hòa Khánh Bắc
                </Link>
                            </li>
                            <hr className="my-4 md:min-w-full" />
                            <li className="items-center">
                                <Link
                                    className={
                                        " px-4 text-xs uppercase py-3 font-bold block " +
                                        (window.location.href.indexOf("/truong-tai-phuong-hoa-hiep-nam") !== -1
                                            ? "text-blue-500 hover:text-blue-600"
                                            : "text-gray-800 hover:text-gray-600")
                                    }
                                    style={{ textDecoration: "none" }}
                                    to="/truong-tai-phuong-hoa-hiep-nam"
                                >

                                    Các Trường tại phường Hòa Hiệp Nam
                </Link>
                            </li>
                            <hr className="my-4 md:min-w-full" />
                            <li className="items-center">
                                <Link
                                    className={
                                        " px-4 text-xs uppercase py-3 font-bold block " +
                                        (window.location.href.indexOf("/truong-tai-phuong-hoa-hiep-bac") !== -1
                                            ? "text-blue-500 hover:text-blue-600"
                                            : "text-gray-800 hover:text-gray-600")
                                    }
                                    style={{ textDecoration: "none" }}
                                    to="/truong-tai-phuong-hoa-hiep-bac"
                                >

                                    Các Trường tại phường Hòa Hiệp Bắc
                </Link>
                            </li>
                        </ul>

                        {/* Divider */}
                        <hr className="my-4 md:min-w-full" />

                    </div>
                </div>
            </nav>
        </>
    );
};

export default MenuSearch;