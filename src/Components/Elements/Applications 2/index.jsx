import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import images from '../../../Assets/Images/js/images';
import { Admin } from '../../../Api/admin.api';
import Modal from '../Modal/index'; // Import your modal component

const ApplicationsTable = ({ searchQuery }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 9;

    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await Admin.GetAllForms();
                if (Array.isArray(response) && response.length > 0) {
                    const processedUsers = response.map(user => ({
                        ...user,
                    }));
                    setUsers(processedUsers);
                } else {
                    setUsers([]);
                }
            }
            finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user =>
        (user.userName || user.fullName || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - 2 && i <= currentPage + 2)
            ) {
                pageNumbers.push(
                    <button
                        key={i}
                        onClick={() => goToPage(i)}
                        className={i === currentPage ? 'active' : ''}
                    >
                        {i}
                    </button>
                );
            } else if (
                i === currentPage - 3 ||
                i === currentPage + 3
            ) {
                pageNumbers.push(<span key={i}>...</span>);
            }
        }
        return pageNumbers;
    };

    const handleEditClick = (user) => {
        navigate(`/ApplicationsDetail/${user.id}`, { state: user });
    };

    if (loading) return <>Datalar Yüklenir...</>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            {currentUsers.length === 0 ? (
                <p>Data yoxdur!!</p>
            ) : (
                currentUsers.map((user) => (
                    <div className='TableMain d-flex align-items-center' key={user.id}>
                        <div className="Name-Email">
                            <h5 className='fs-14 name d-flex'>{user.fullName}
                                <div
                                    className="ActiveStatus"
                                    style={{ backgroundColor: user.isApproved ? "#56BA28" : "#FF1F25" }}
                                ></div>
                            </h5>
                        </div>
                        <div className="Name-Email2 ms-2 d-flex flex-column">
                            <h5 className='fs-14 date'>{user.subject}</h5>
                        </div>
                        <div className="Name-Email3">
                            <h5 className='fs-14 date'>{user.email}</h5>
                        </div>
                        <div className="Name-Email4 ms-2 d-flex flex-column">
                            <h5 className='fs-14 date'> {user.phoneNumber}</h5>
                        </div>
                        <div className="Name-Email5 d-flex flex-column">
                            <div className='edit d-flex' onClick={() => handleEditClick(user)}>
                                <h5 className='fs-10'>Bax</h5>
                            </div>
                        </div>
                    </div>
                ))
            )}
            <div className='d-flex justify-content-end'>
                <div className="pagination my-5">
                    <button onClick={prevPage} disabled={currentPage === 1}>
                        <img src={images.ArrowLeft2} alt="" />
                    </button>
                    {renderPageNumbers()}
                    <button onClick={nextPage} disabled={currentPage === totalPages}>
                        <img src={images.ArrowRight2} alt="" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApplicationsTable;
