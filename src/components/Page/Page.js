import React, { useState, useEffect } from 'react';
import { ReactComponent as NoData } from '../../assets/svg/no-data.svg';
import Button from '../UI/Button/Button';
import List from './List/List';
import uuid from 'react-uuid';
import './style.scss';
import Toast from '../UI/Toast/Toast';

const Board = () => {
    const [boardData, setBoardData] = useState({ lists: [] });
    const [toast, setToast] = useState({ show: false, message: "" });

    useEffect(() => {
        let boardData = localStorage.getItem('board');

        if (!boardData) {
            localStorage.setItem('board', JSON.stringify([{ id: 1, lists: [] }]));
            return;
        }
        setBoardData(JSON.parse(boardData)[0]);

        return () => {
            setBoardData({});
        }
    }, [])

    const addList = () => {
        let lists = JSON.parse(localStorage.getItem('lists')) || {};
        if (boardData.lists && boardData.lists[boardData.lists.length - 1]
            && !lists[boardData.lists[boardData.lists.length - 1]].title
        ) {
            setToast({
                show: true,
                message: "Please add list title"
            });
            return;
        }
        let uid = uuid();
        boardData.lists.push(uid);
        lists[uid] = { title: "", cards: [] };
        setData(lists);
    }

    const removeList = (listId) => {
        let listData = JSON.parse(localStorage.getItem('lists'));

        delete listData[listId];
        boardData.lists.splice(boardData.lists.indexOf(listId), 1);
        setData(listData);
    }

    const setData = (lists) => {
        localStorage.setItem('lists', JSON.stringify(lists));
        localStorage.setItem('board', JSON.stringify([boardData]));
        setBoardData({ ...boardData });
    }

    return (
        <div className="page">
            <div className="page__title">
                JUST LISTS
            </div>
            {
                boardData.lists.length
                    ? (
                        <div className="board">
                            {
                                boardData.lists.map(list =>
                                    <List key={list} id={list} removeList={removeList} />
                                )
                            }
                        </div>
                    )
                    : (
                        <div className="empty-state">
                            <NoData className="empty-state__image" />
                            <div className="empty-state__content">
                                Oops, no list found.
                            </div>
                        </div>
                    )
            }
            <div className="page__btn">
                <Button onClick={() => addList()}>
                    Add list
                </Button>
            </div>
            {toast.show && (
                <Toast type="error" hideToast={setToast}>
                    {toast.message}
                </Toast>
            )}
        </div>

    )
}

export default Board;
