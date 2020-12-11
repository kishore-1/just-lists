import React, { useState, useEffect } from 'react';
import Button from '../UI/Button/Button';
import List from '../Board/List/List';
import { board, btn } from './Board.module.scss';

const Board = () => {
    const [boardData, setBoardData] = useState({ lists: [] });

    useEffect(() => {
        let boardData = localStorage.getItem('board');
        if (!boardData) {
            localStorage.setItem('board', JSON.stringify([{ id: 1, lists: [] }]))
        } else {
            setBoardData(JSON.parse(boardData)[0]);
        }
        return () => {
            setBoardData({});
        }
    }, [])

    const addList = () => {
        boardData.lists = boardData.lists || [];
        boardData.lists.push(`b_1_${boardData.lists.length + 1}`);
        let lists = JSON.parse(localStorage.getItem('lists')) || {};
        lists[`b_1_${boardData.lists.length}`] = { title: "", cards: [] };
        setData(lists);
    }
    const removeList = (listId) => {
        boardData.lists.splice(boardData.lists.indexOf(listId), 1);
        let listData = JSON.parse(localStorage.getItem('lists'));
        delete listData[listId];
        setData(listData);
    }
    const setData = (lists) => {
        localStorage.setItem('lists', JSON.stringify(lists));
        localStorage.setItem('board', JSON.stringify([boardData]));
        setBoardData({ ...boardData });
    }
    return (
        <>
            <div className={board}>
                {boardData.lists && boardData.lists.map(list => <List key={list} id={list} removeList={removeList} />)}
                {boardData.lists.length < 5 ?
                    <Button className={btn} onClick={() => addList()}>
                        Add list
                    </Button> : null
                }
            </div>
        </>
    )
}

export default Board;
