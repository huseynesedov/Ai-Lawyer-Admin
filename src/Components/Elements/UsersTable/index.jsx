import React, { useEffect, useState } from 'react';
import images from '../../../Assets/Images/js/images';
import { Admin } from '../../../Api/admin.api';
import Modal from '../Modal/index';

const UsersTable = ({ searchQuery }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const usersPerPage = 8;

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await Admin.Users();
      console.log('Full API Response:', response);

      if (Array.isArray(response) && response.length > 0) {
        const processedUsers = response.map(user => ({
          ...user,
          isPremium: Boolean(user.isPremium),
          lockoutEnd: user.lockoutEnd ? new Date(user.lockoutEnd) : null,
        }));
        setUsers(processedUsers);
      } else {
        console.warn('No user data found in response');
        setUsers([]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  if (loading) return <p>Datalar Yüklenir...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {currentUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        currentUsers.map((user) => (
          <div className='TableMain d-flex align-items-center' key={user.id}>
            <div className="Name-Email d-flex flex-column">
              <h5 className='fs-14 name'>{user.userName || user.fullName}</h5>
              <h5 className='d-flex align-items-center tc-7E fs-14 mt-2'>
                {user.email}
                <div
                  className="ActiveStatus"
                  style={{ backgroundColor: user.emailConfirmed ? "#56BA28" : "#FF1F25" }}
                ></div>
              </h5>
            </div>
            <div className="Name-Email2 d-flex flex-column">
              <h5 className='fs-14 premium'>{user.isPremium ? 'Premium' : ''}</h5>
            </div>
            <div className="Name-Email3">
              {user.lockoutEnd && (
                <div className='bannedDiv'>
                  <h5 className='fs-14 banned'>Banned</h5>
                </div>
              )}
            </div>
            <div className="Name-Email4 d-flex flex-column">
              <h5 className='fs-14 date'>
                {user.lockoutEnd ? user.lockoutEnd.toLocaleString() : ''}
              </h5>
            </div>
            <div className="Name-Email5 d-flex flex-column">
              <div className='edit d-flex' onClick={() => handleEditClick(user)}>
                <h5 className='fs-10'>Düzəliş Et</h5>
                <img className='ms-1' src={images.editPen} alt="Edit" />
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
      <Modal isOpen={isModalOpen} onClose={closeModal} user={selectedUser} refreshData={fetchUsers} />
    </div>
  );
};

export default UsersTable;
