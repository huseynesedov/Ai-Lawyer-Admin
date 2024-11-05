import { Link, useLocation } from "react-router-dom";
import images from "../../../Assets/Images/js/images";
import { useState } from "react";
import { useAuth } from "../../../AuthContext";

function LeftBar() {
    const location = useLocation();
    const [selectedLink, setSelectedLink] = useState(location.pathname);

    const handleLinkClick = (path) => {
        setSelectedLink(path);
    };

    const { logout } = useAuth();

    return (
        <>
            <div className="col d-flex h-100">
                
                <div className="leftbar d-flex flex-column">
                    <div>
                        <img src={images.Logo} alt="" />
                    </div>

                    <div className="h-100 mt-5">
                        <Link to={"/"} onClick={() => handleLinkClick("/")}>
                            <div className={`UserPage ${selectedLink === "/" ? "Selectd" : ""}`}>
                                <div>
                                    <img src={images.User} alt="" />
                                    <span className="tc-91 ms-2">Istifadəçilər</span>
                                </div>
                                <img src={images.ArrowRight} alt="" />
                            </div>
                        </Link>

                        <Link to={"/Applications"} onClick={() => handleLinkClick("/Applications")}>
                            <div className={`UserPage mt-4 ${selectedLink === "/Applications" ? "Selectd" : ""}`}>
                                <div>
                                    <img src={images.Mail} alt="" />
                                    <span className="tc-91 ms-2">Muracietler</span>
                                </div>
                                <img src={images.ArrowRight} alt="" />
                            </div>
                        </Link>
                    </div>

                    <div className="d-flex justify-content-center">
                        <button onClick={logout}>
                            <span className="tc-91">Çıxış et</span>
                            <img className="ms-2" src={images.Exit} alt="" />
                        </button>
                    </div>
                </div>

            </div>
        </>
    );
}

export default LeftBar;
