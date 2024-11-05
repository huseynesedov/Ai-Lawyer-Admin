import React, { useState } from 'react';
import images from '../../../Assets/Images/js/images';
import UsersTable from '../../Elements/UsersTable';

function Users() {
    const [searchQuery, setSearchQuery] = useState(''); // State to hold the search input
    

    return (
        <>
            <div className="container" style={{ marginTop: "60px" }}>
                <div className="MainHomeTitle d-flex justify-content-between align-items-center">
                    <span className='fs-22 fw-600'>
                        Bütün Istifadəcilər
                    </span>

                  

                    <div className="Search">
                        <input
                            type="text"
                            placeholder='Axtarış...'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
                        />
                        <img src={images.SearcgGlass_gray} alt="" />
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="TableTd d-flex justify-content-between">
                        <div className="TableName">
                            <h5 className='tc-B5 fs-14'>Istifadeçi</h5>
                        </div>
                        <div className="TableName">
                            <h5 className='tc-B5 fs-14'>Premium</h5>
                        </div>
                        <div className="TableName">
                            <h5 className='tc-B5 fs-14'>Ban</h5>
                        </div>
                        <div className="TableName">
                            <h5 className='tc-B5 fs-14'>Ban-Date</h5>
                        </div>
                        <div className="TableName">
                        </div>
                    </div>

                    <UsersTable searchQuery={searchQuery} />

                </div>
            </div>
        </>
    );
}

export default Users;
