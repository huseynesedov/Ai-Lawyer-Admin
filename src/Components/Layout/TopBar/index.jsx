import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Admin } from '../../../Api/admin.api';  // Admin dosyasının doğru yolunu buraya ekleyin
import images from '../../../Assets/Images/js/images';

function TopBar() {
    const token = localStorage.getItem('token');
    const [totalUserCount, setTotalUserCount] = useState(null);
    const [blockedCount, setBlockedCount] = useState(null);
    const [unapprovedCount, setUnapprovedCount] = useState(null); // Durumu güncelledik
    const [pendingAdvice, setPendingAdvice] = useState(null);
    let userName = '';

    if (token) {
        try {
            const decoded = jwtDecode(token);
            userName = decoded.UserName;
        } catch (error) {
            console.error('Token decode hatası:', error);
        }
    }

    useEffect(() => {
        const fetchUserCounts = async () => {
            try {
                const response = await Admin.UsersCount();
                if (response && typeof response.totalUserCount === 'number') {
                    setTotalUserCount(response.totalUserCount);
                } else {
                    console.error('Yanıt beklenen formatta değil:', response);
                }
            } catch (error) {
                console.error('API çağrısı sırasında bir hata oluştu:', error);
            }
        };

        const fetchBlockedCounts = async () => {
            try {
                const response = await Admin.BlockedUsersCount();
                if (response && typeof response.blockedUserCount === 'number') {
                    setBlockedCount(response.blockedUserCount);
                } else {
                    console.error('Yanıt beklenen formatta değil:', response);
                }
            } catch (error) {
                console.error('API çağrısı sırasında bir hata oluştu:', error);
            }
        };

        const fetchPendingAdvice = async () => {
            try {
                const response = await Admin.GetAllFormsCount();
                if (response && typeof response.totalForms === 'number') {
                    setPendingAdvice(response.totalForms);
                } else {
                    console.error('Yanıt beklenen formatta değil:', response);
                }
            } catch (error) {
                console.error('API çağrısı sırasında bir hata oluştu:', error);
            }
        };

        const fetchPendingUnapproved = async () => {
            try {
                const response = await Admin.UnAprovedFormsCount(); // Burayı güncelleyebilirsiniz
                if (response && typeof response.unapprovedFormsCount === 'number') { // Burayı güncelleyin
                    setUnapprovedCount(response.unapprovedFormsCount); // Burayı güncelledik
                } else {
                    console.error('Yanıt beklenen formatta değil:', response);
                }
            } catch (error) {
                console.error('API çağrısı sırasında bir hata oluştu:', error);
            }
        };

        fetchUserCounts();
        fetchBlockedCounts();
        fetchPendingAdvice();
        fetchPendingUnapproved();
    }, []);

    return (
        <div className="container TopBarMargin">
            <div className='d-flex align-items-center'>
                <span className='fs-24 fw-600'>Salam, {userName}</span>
                <img className='ms-1' src={images.hello} alt="hello" />
            </div>

            <div className="AdminCount">
                <div className="CountDetail">
                    <div className="CountBorder">
                        <div className="CountDetailImg">
                            <img src={images.UserAll} alt="total users" />
                        </div>
                        <div className='d-flex flex-column justify-content-around ms-3'>
                            <span className='spannn'>Ümumi istifadəçi sayı</span>
                            <span className='fs-12 fw-600'>
                                {totalUserCount !== null ? totalUserCount : 'Yükleniyor...'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="CountDetail">
                    <div className="CountBorder">
                        <div className="CountDetailImg">
                            <img src={images.UserTick} alt="applications" />
                        </div>
                        <div className='d-flex flex-column justify-content-around ms-3'>
                            <span className='spannn'>Müraciət sayı</span>
                            <span className='fs-12 fw-600'>{pendingAdvice !== null ? pendingAdvice : 'Yükleniyor...'}</span>
                        </div>
                    </div>
                </div>

                <div className="CountDetail">
                    <div className="CountBorder">
                        <div className="CountDetailImg">
                            <img src={images.Monitor} alt="pending advice" />
                        </div>
                        <div className='d-flex flex-column justify-content-around ms-3'>
                            <span className='spannn'>Məsləhət Gözləyən</span>
                            <span className='fs-12 fw-600'>{unapprovedCount !== null ? unapprovedCount : 'Yükleniyor...'}</span>
                        </div>
                    </div>
                </div>

                <div className="CountDetail">
                    <div className='d-flex'>
                        <div className="CountDetailImgBlock">
                            <img src={images.Block} alt="blocked users" />
                        </div>
                        <div className='d-flex flex-column justify-content-around ms-3'>
                            <span className='spannn'>Bloklanmış İstifadəçilər</span>
                            <span className='fs-12 fw-600'>{blockedCount !== null ? blockedCount : 'Yükleniyor...'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopBar;
