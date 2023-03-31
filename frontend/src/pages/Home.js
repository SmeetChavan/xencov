import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePrice } from "../context/currentGoldContext";

function Home() {

    const navigate = useNavigate();

    const [quan , setQuan] = useState('');
    const [netFundAdded , setNetFundAdded] = useState(0);
    const [currentFund , setCurrentFund] = useState(0);
    const [netGrowthOrLoss , setNetGrowthOrLoss] = useState(0);
    const [gainOrLossPercentage , setGainOrLossPercentage] = useState(0);

    const data = usePrice();

    let userId = localStorage.getItem("id");

    const handleBuy = async () => {

        let wallet = localStorage.getItem("wallet");
        let gold = localStorage.getItem("gold");
        let email = localStorage.getItem("email");

        if(parseInt(quan) * data > wallet){
            return alert("Insufficient funds!");
        }

        let amount = parseInt(quan) * data;

        wallet = wallet - amount;
        gold = parseInt(gold) + parseInt(quan);

        localStorage.setItem("wallet" , wallet);
        localStorage.setItem("gold" , gold);

        let runningBalance = {
            wallet : wallet,
            gold : gold,
            goldPrice : data
        };

        // Updating the values in User collection
        const response = await fetch('/api/user' , {
            method: "PATCH",
            headers:{
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({email , runningBalance})
        })
        if(response.ok){
            setQuan('');
        }
        else{
            return alert('Failed to update the database');
        }

        const goldSend = {
            userId : userId,
            quan : quan,
            amount : amount,
            type : 'CREDIT',
            status : 'SUCCESS',
            runningBalance : amount
        }

        const response1 = await fetch('/api/gold' , {
            method: "POST",
            headers:{
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(goldSend)
        })
        const json1 = await response1.json();
        const {goldTransac_id} = json1;

        if(!response1.ok){
            return alert("Failed to update database (gold)");
        }

        const walletSend = {
            userId : userId,
            amount : amount,
            type : 'DEBIT',
            status : 'SUCCESS',
            runningBalance : amount,
            goldTransac_id : goldTransac_id
        }

        const response2 = await fetch('/api/wallet' , {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(walletSend)
        })
        const json2 = response2.json();

        if(response2.ok){
            navigate("/");
        }
        else{
            return alert("Failed to update database (wallet)");
        }
    }

    const handleSell = async () => {

        let gold = localStorage.getItem("gold");
        let wallet = localStorage.getItem("wallet");
        let email = localStorage.getItem("email");

        let amount = parseInt(quan) * data;

        if(parseInt(quan) > parseInt(gold)){
            return alert("Not enough gold");
        }

        // Handling gold transaction
        const goldSend = {
            userId : userId,
            quan : quan,
            amount : amount,
            type : 'DEBIT',
            status : 'SUCCESS',
            runningBalance : amount
        }
        const response1 = await fetch('/api/gold' , {
            method: "POST",
            headers:{
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(goldSend)
        })
        const json1 = await response1.json();
        const {goldTransac_id} = json1;

        if(!response1.ok){
            return alert("Failed to update database (gold)");
        }

        // Handling wallet transaction
        const walletSend = {
            userId : userId,
            amount : amount,
            type : 'CREDIT',
            status : 'SUCCESS',
            runningBalance : amount,
            goldTransac_id : goldTransac_id
        }

        const response2 = await fetch('/api/wallet' , {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(walletSend)
        })
        const json2 = response2.json();

        if(!response2.ok){
            return alert("Failed to update database (wallet)");
        }

        // Calculating Answer
        const response3 = await fetch('/api/cal' , {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({userId})
        })
        const json3 = await response3.json();
        console.log(json3);

        if(!response3.ok){
            return alert("Failed to calculate parameters");
        }

        setCurrentFund(json3.currentFund);
        setNetFundAdded(json3.netFundAdded);
        setNetGrowthOrLoss(json3.netGrowthOrLoss);
        setGainOrLossPercentage(json3.gainOrLossPercentage);



        let new_wallet = parseInt(wallet) + amount;
        gold = parseInt(gold) - parseInt(quan);

        let runningBalance = {
            wallet : new_wallet,
            gold : gold,
            goldPrice : data
        };

        // Updating user fields in Database
        const response = await fetch('/api/user', {
            method: "PATCH",
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({email , runningBalance})
        });
        if(response.ok){

            localStorage.setItem("wallet" , new_wallet);
            localStorage.setItem("gold" , gold);
        }
        else{
            return alert("Failed to sell");
        }

        navigate("/");
    }

    return(
        <>
            <div className="asd">

                <h3 className="fs-3 text-center font-bold mb-16">Hii {localStorage.getItem("firstName")}!!</h3>

                {(localStorage.getItem("authToken")) ?
                <>
                    <input 
                        type="text" 
                        placeholder="Quantity"
                        id="quan"
                        value={quan}
                        onChange={(e) => {setQuan(e.target.value)}}
                    />

                    <div className="d-flex justify-between mt-1">
                        <button className="btn btn-success w-24" onClick={handleBuy}>Buy</button>
                        <button className="btn btn-danger w-24" onClick={handleSell}>Sell</button>
                    </div>

                    <div className="font-extrabold mt-7">

                        <h3>Net Fund Added : {netFundAdded}</h3>
                        <h3>Current Fund : {currentFund}</h3>
                        <h3>Net Growth/Loss : {netGrowthOrLoss}</h3>
                        <h3>Percentage Growth/Loss : {gainOrLossPercentage}</h3>

                    </div>


                </>
                :
                <div className="fs-2 font-bold">Please login</div>
                }

            </div>
        </>
    );
}

export default Home;