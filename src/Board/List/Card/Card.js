import React, { useEffect, useState } from 'react';
import { title, comment, card } from './Card.module.scss';

const Card = (props) => {
    const [cardData, setCardData] = useState({ title: "", comment: "" });

    useEffect(() => {
        let cards = localStorage.getItem('cards');
        setCardData(JSON.parse(cards)[props.id]);
        return () => {
            setCardData({});
        } 
    }, [props.id])

    const saveTitle = (title) => {
        cardData.title = title;
        setData();
    }
    const saveComments = (comment) => {
        cardData.comment = comment;
        setData();
    }
    const setData = () => {
        localStorage.setItem('cards', JSON.stringify({ ...JSON.parse(localStorage.getItem('cards')), [props.id]: cardData }));
        setCardData({...cardData});
    }
    return (
        <div className={card}>
            <input className={title} maxLength={15} placeholder="Title..." value={cardData.title} onChange={(e) => saveTitle(e.target.value)} />
            <i className="fa fa-minus-circle" onClick={() => props.removeCard(props.id)}></i>
            <textarea className={comment} placeholder="Comment..."  value={cardData.comment} onChange={(e) => saveComments(e.target.value)} />
        </div>
    )
}

export default Card;
