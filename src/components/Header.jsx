import React from 'react';
import '../styles/Header.scss'
import Autocomplete from './Autocomplete/Autocomplete';
const Header = () => {
    return (
        <>
            <div className="header">
                <div className="welcome">
                    <h2>Chào mừng bạn đến với DNKID</h2>
                </div>
                <div className="searchForm">
                    <div className="input-group md-form form-sm form-2">
                        <Autocomplete
                            options={[
                                "Trường mầm non Hoa Sen Xanh - Kinh Dương Vương",
                                "Trường mầm non Hoa Sữa - Hoàng Văn Thái",
                                "Trường mầm non Sen Vàng - Âu Cơ",
                                "Trường mầm non Chất Lượng Cao DBC - Âu Cơ",
                                "Trường Mầm non Sanh Xuân - Ngô Chân Lưu",
                                "Trường mầm non Táo Đỏ - Âu Cơ",
                                "Trường mầm non Sao Mai - Đào Nguyên Phố",
                                "Trường mầm non CLC Nhân Đức - Đồng Khởi",
                                "Trường mầm non Đôrêmon - Hồ Tùng Mậu",
                                "Trường mầm non Tiểu My - Nguyễn Lương Bằng",
                                "Trường mầm non Hoa Bé Ngoan - Tống Duy Tân",
                                "Trường mầm non Hoa Anh Đào - Ngô Thì Nhậm",
                                "Trường Mầm non 1-6 - Liên Chiểu",
                                "Trường mầm non Sơn Ca - Khu dân cư Thanh Vinh",
                                "Trường mầm non Nốt Nhạc Xanh - Lạc Long Quân, Hòa Khánh Bắc",
                                "Trường mẫu giáo Họa Mi - Hòa Khánh Bắc, Liên Chiểu",
                                "Trường mầm non Tường Vy - Ngô Văn Sở",
                                "Trường mầm non Hướng Dương",
                            ]} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;