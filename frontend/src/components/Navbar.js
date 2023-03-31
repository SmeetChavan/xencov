import { useNavigate } from "react-router-dom";
import { usePrice } from "../context/currentGoldContext";

function Navbar() {
    
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.clear();
        navigate("/");
    }

    const handleLogin = () => {
        navigate("/login");
    }

    const handleRegister = () => {
        navigate("/register");
    }

    const handleAddMoney = () => {
        navigate("/addmoney");
    }

    const data = usePrice();

    return (
        <>

            {(localStorage.getItem("authToken")) ?

                <nav className="fuddu">

                    <div className="leftt">Wallet : &#8377;{localStorage.getItem("wallet")}<span className="material-symbols-outlined hover:cursor-pointer" onClick={handleAddMoney}>add</span></div>
                    <div className="">Gold : {localStorage.getItem("gold")}gm</div>
                    <div className="rightt">Current Gold Price : &#8377;{data}/gm</div>

                    <button className="btn btn-danger" onClick={handleLogOut}>LogOut</button>

                </nav>

            :
            
                <nav className="fuddu">
                    <span className="lefttt hover:cursor-pointer" onClick={handleLogin}>Login</span>
                    <span className="righttt hover:cursor-pointer" onClick={handleRegister}>Register</span>
                </nav>
            }
        </>
    );

}

export default Navbar;