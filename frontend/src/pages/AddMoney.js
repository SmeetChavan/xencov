import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddMoney() {

    const navigate = useNavigate();

    const [quan , setQuan] = useState();

    const handleAdd = async () => {

        let wallet = localStorage.getItem("wallet");
        let gold = localStorage.getItem("gold");
        let email = localStorage.getItem("email");

        wallet = parseInt(wallet) + parseInt(quan);

        let runningBalance = {
            wallet : wallet,
            gold : gold,
            goldPrice : 5000
        };

        const response = await fetch("/api/user" , {
            method: "PATCH",
            headers: {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({email , runningBalance})
        })

        if(response.ok){
            alert("Money added successfully!");
            localStorage.setItem("wallet" , wallet);
            navigate("/");
        }
        else{
            alert("Failed to add money");
        }

    }
    
    return (
        <>
            <div className="asd">
                <input 
                    type="number"
                    placeholder="Add money"
                    id="quan"
                    value={quan}
                    onChange={(e) => {setQuan(e.target.value)}}
                />
                <div className="d-flex">
                    <button className="btn btn-primary w-100 mt-1 p-0" onClick={handleAdd}>Add</button>
                </div>
            </div>
        </>
    );
}

export default AddMoney;