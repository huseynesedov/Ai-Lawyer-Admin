import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import images from '../../../Assets/Images/js/images';
import { Admin } from '../../../Api/admin.api';
import { notification } from 'antd';

const ApplicationsDetail = (refreshData) => {
    const location = useLocation(); // Get the location object
    const user = location.state; // Access the passed user data

  const openNotification = (type, message, description) => {
    notification[type]({
        message: message,
        description: description,
        placement: 'topRight',
        duration: 3,
    });
};
    const Aproved = () => {
        Admin.ApproveForm(user.id)
            .then(response => {
                openNotification('success', 'Uğurlu', 'İstifadəçi uğurla silindi.');
                refreshData(); // Kullanıcıları güncelle
            })
            .catch(error => {
                console.error("DeleteUser Error:", error);
            });
    };
    return (
        <div>
            <div className="container ms-5">
                <span className='fs-22 fw-600'>
                    İstifadəçi müraciyyəti
                </span>
                <div className="row mt-5">
                    <div className="TableTd d-flex align-items-center justify-content-between">
                        <div className="TableName">
                            <h5 className='name fs-14 d-flex'>
                                {user.fullName}
                                <div
                                    className="ActiveStatus"
                                    style={{ backgroundColor: user.isApproved ? "#56BA28" : "#FF1F25" }}
                                ></div>
                            </h5>
                        </div>
                        <div className="TableName">
                            <h5 className='name fs-14'>{user.subject}</h5>
                        </div>
                        <div className="TableName">
                            <h5 className='name fs-14'>{user.email}</h5>
                        </div>
                        <div className="TableName">
                            <h5 className='name fs-14'>{user.phoneNumber}</h5>
                        </div>
                        <div className="TableName backButton">
                            <Link to={"/Applications"}>
                                <button >
                                    Geri qayit
                                    <img className='ms-3' src={images.ArrowRight_White} alt="" />
                                </button>
                            </Link>

                        </div>
                    </div>


                </div>


                <div className="row mt-5 d-flex flex-column">
                    <h2 className='fs-24 fw-600'>Mesaj :</h2>
                    <div className='mt-3 ms-4'>
                        <span className='fs-20'>{user.message}</span>
                    </div>
                </div>
                <div className="mt-5">

                    <hr className='mt-5' />
                </div>
                <div className="d-flex mt-2 justify-content-end">
                    <button className='messageTick' onClick={Aproved}>
                        Oxundu
                        <img className='ms-2' src={images.tic} alt="" />
                    </button>
                </div>
            </div>




        </div>
    );
};

export default ApplicationsDetail;
