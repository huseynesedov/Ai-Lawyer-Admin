
import LeftBar from "../Leftbar";
import TopBar from "../TopBar";

const Layout = (props) => {
    return (
        <>
            <div className="d-flex response" style={{height:"154vh"}}>
                <LeftBar />
                <div className="d-flex flex-column mx-5">
                    <TopBar />
                    {props.children}
                </div>
            </div>


        </>
    );
}

export default Layout;