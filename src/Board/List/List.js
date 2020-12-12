import React, { useState, useEffect } from 'react';
import Card from '../../Board/List/Card/Card';
import Button from '../../UI/Button/Button';
import { list, listName, btn, noCardBtn } from './List.module.scss';
import uuid from 'react-uuid';

const List = (props) => {
    const [listData, setListData] = useState({ title: "", cards: [] });

    useEffect(() => {
        let lists = localStorage.getItem('lists');
        setListData(JSON.parse(lists)[props.id]);
        return () => {
            setListData({});
        }
    }, [props.id])

    const saveListName = (value) => {
        listData.title = value;
        setData();
    }

    const addCard = () => {
        listData.cards = listData.cards || [];
        let uid = uuid();
        listData.cards.push(uid);
        let cards = JSON.parse(localStorage.getItem('cards')) || {};
        cards[uid] = { title: "", comment: "" };
        localStorage.setItem('cards', JSON.stringify(cards));
        setData();
    }
    const removeCard = (cardId) => {
        listData.cards.splice(listData.cards.indexOf(cardId), 1);
        let cardData = JSON.parse(localStorage.getItem('cards'));
        delete cardData[cardId];
        localStorage.setItem('cards', JSON.stringify(cardData));
        setData();
    }
    const setData = () => {
        localStorage.setItem('lists', JSON.stringify({ ...JSON.parse(localStorage.getItem('lists')), [props.id]: listData }));
        setListData({ ...listData });
    }
    return (
        <div className={list}>
            <input className={listName} maxLength={12} placeholder="List name..." value={listData.title} onChange={(e) => saveListName(e.target.value)} />
            <i className="fa fa-minus-circle" onClick={() => props.removeList(props.id)}></i>
            {listData.cards.map((card) => <Card key={card} removeCard={removeCard} id={card} />)}
            <Button className={`${btn} ${listData.cards.length ? "" : noCardBtn}`} onClick={addCard}>
                Add Items
            </Button>
        </div>
    )
}

export default List;
