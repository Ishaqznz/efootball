import React from "react";
import "./Cards.css";
import { useEffect } from "react";
import api from '../../api';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Cards = () => {
    const [accounts, setAccounts] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccounts = async () => {
            const fetchedAccounts = await api.get("/getAccounts");
            console.log('fetched accounts: ', fetchedAccounts);
            setAccounts(fetchedAccounts.data.accountDatas);
        };
        fetchAccounts();
    }, []);

    const handleView = (e, card) => {
        console.log('card data: ', card);
        navigate(`account/${ card._id }`)
    }

    return (
        <>
            <div className="cards">

                {accounts.map((card, index) => {
                    return (
                        <>
                            {card.files[0].url.includes('image') && <button onClick={(e) => handleView(e, card)
                            }><img src={card.files[0].url} alt="" key={index} className="card" /></button>}
                            {card.files[0].url.includes('video') && <button onClick={(e) => handleView(e, card) }><video controls src={card.files[0].url} alt="" key={index} className="card" /></button>}
                        </>
                    )
                })}

            </div>
        </>
    );
};
 
export default Cards;






