import React from 'react';
import images from '../../../Assets/Images/js/images';
import { Form, Input, Button, notification } from 'antd';
import { Admin } from '../../../Api/admin.api';

const Modal = ({ isOpen, onClose, user, refreshData }) => {
    const [form4] = Form.useForm();

    if (!isOpen) return null;

    // Notification function
    const openNotification = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
            placement: 'topRight',
            duration: 3,
        });
    };

    const handleBan = () => {
        const { banTime } = form4.getFieldsValue();

        if (user.lockoutEnd > 0) {
            openNotification('warning', 'Qadağa Var', 'İstifadəçi artıq qadağan edilib.');
            return;
        }

        if (!banTime || isNaN(banTime) || banTime <= 0 || banTime > 60) {
            openNotification('error', 'Səhv', 'Qadağa müddətini düzgün daxil edin. 0-dan böyük və 60-dan kiçik olmalıdır.');
            return;
        }

        Admin.BanUser({ userId: user.id, banDurationInMinutes: banTime })
            .then((response) => {
                openNotification('success', 'Uğurlu', 'İstifadəçi uğurla qadağan edildi.');
                refreshData(); // Kullanıcıları güncelle
                onClose();
            }).catch(error => {
                console.error("DeleteUser Error:", error);
            });
    };

    const handleUnBan = () => {
        Admin.UnBanUser(user.id)
            .then(response => {
                openNotification('success', 'Uğurlu', 'İstifadəçi uğurla qadağadan çıxarıldı.');
                refreshData(); // Kullanıcıları güncelle
                onClose();
            }).catch(error => {
                console.error("DeleteUser Error:", error);
            });
    };

    const DeleteUser = () => {
        Admin.DeleteUser(user.id)
            .then(response => {
                openNotification('success', 'Uğurlu', 'İstifadəçi uğurla silindi.');
                refreshData(); // Kullanıcıları güncelle
                onClose();
            })
            .catch(error => {
                console.error("DeleteUser Error:", error);
            });
    };


    const handlePremium = () => {
        Admin.SetPremium(user.id)
            .then(response => {
                openNotification('success', 'Uğurlu', 'İstifadəçi uğurla Premium Hesab edildi.');
                refreshData(); // Kullanıcıları güncelle
                onClose();
            }).catch(error => {
                console.error("DeleteUser Error:", error);
            });
    };

    const unHandlePremium = () => {
        Admin.RemovePremium(user.id)
            .then(response => {
                openNotification('success', 'Uğurlu', 'İstifadəçinin Premium statusu silindi.');
                refreshData(); // Kullanıcıları güncelle
                onClose();
            }).catch(error => {
                console.error("DeleteUser Error:", error);
            });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className='d-flex justify-content-between'>
                    <h2 className='fs-18'>Düzəliş et</h2>
                    <button onClick={onClose}>
                        <img src={images.x} alt="Close" />
                    </button>
                </div>
                <hr />

                <div className="d-flex flex-column ms-2">
                    <Form
                        form={form4}
                        className='ms-4 d-flex align-items-center'
                        layout="vertical"
                        initialValues={{
                            banTime: user?.banTime,
                        }}
                    >
                        <Form.Item
                            label="Ban"
                            name="banTime"
                            style={{ width: "222px" }}
                            rules={[
                                { required: true, message: 'Ban vaxtını daxil edin!' },
                            ]}
                        >
                            <Input placeholder="Dəqiqə" />
                        </Form.Item>
                        <Button type="button" onClick={handleBan}>
                            <div className='banButton'>
                                Ban At
                            </div>
                        </Button>
                    </Form>
                    <div className='ms-4 mt-3 d-flex justify-content-between'>
                        {!user.isPremium && (
                            <button className='premiumButton' onClick={handlePremium}>
                                Premium Hesab et !
                            </button>
                        )}
                        {user.isPremium && (
                            <button className='unPremiumButton' onClick={unHandlePremium}>
                                Premium sil !
                            </button>
                        )}
                    </div>
                </div>

                <div className="DeleteUserConfirmUser mt-5">
                    <button onClick={DeleteUser}>
                        <div className="deleteUser">
                            Hesabı sil
                        </div>
                    </button>

                    {user?.lockoutEnd > 0 && (
                        <button onClick={handleUnBan}>
                            <div className="unBanButton">
                                <span>
                                    Ban Çıxart
                                </span>
                            </div>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;

