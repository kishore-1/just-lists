import React, { useState, useEffect } from 'react';
import Card from './Card/Card';
import Button from '../../UI/Button/Button';
import Toast from '../../UI/Toast/Toast';
import DropdownMenu from '../../UI/DropdownMenu/DropdownMenu';
import './style.scss';
import uuid from 'react-uuid';

const List = (props) => {
    const [listData, setListData] = useState({ title: "", cards: [] });
    const [remove, setRemove] = useState(false);
    const [showListMenu, setShowListMenu] = useState(false);
    const [canEditList, setCanEditList] = useState(false);
    const [toast, setToast] = useState({ show: false, message: "" });
    const [title, setTitle] = useState("");

    useEffect(() => {
        let lists = localStorage.getItem('lists');
        setTitle(listData.title);
        setListData(JSON.parse(lists)[props.id]);
        return () => {
            setListData({});
        }
    }, [props.id, listData.title])

    const removeList = () => {
        setRemove(true);
        setTimeout(props.removeList, 300, props.id)
    }
    const saveListName = (value, e) => {
        e && e.preventDefault();
        setCanEditList(false);

        if (!value) {
            if (!listData.title) {
                setRemove(true);
                setTimeout(props.removeList, 300, props.id)
                return;
            }
            setToast({
                show: true,
                type: 'warning',
                message: "Title cannot be empty"
            });
            setTitle(listData.title)
            return;
        }
        listData.title = value;
        setData();
    }
    const addCard = () => {
        if (!listData.title) {
            setToast({
                show: true,
                type: 'warning',
                message: "Please add list title"
            });
            return;
        }
        let cards = JSON.parse(localStorage.getItem('cards')) || {};
        if ((cards[listData.cards[listData.cards.length - 1]]
            && !cards[listData.cards[listData.cards.length - 1]].title)
        ) {
            setToast({
                show: true,
                type: 'warning',
                message: "Please add card title"
            });
            return;
        }

        let uid = uuid();
        listData.cards.push(uid);
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
    const listOptions = [
        {
            menu: "edit",
            action: () => {
                setShowListMenu(false);
                setCanEditList(true);
            }
        }, {
            menu: "delete",
            action: () => {
                setShowListMenu(false);
                removeList();
            }
        }
    ]
    return (
        <>
            {toast.show && (
                <Toast type={toast.type} hideToast={setToast}>
                    {toast.message}
                </Toast>
            )}
            <div className={"list " + (remove ? "list--remove" : "")}>
                <div className="list__header">
                    {!listData.title || canEditList
                        ? (
                            <form className="list__inner" onSubmit={(e) => saveListName(title, e)}>
                                <input
                                    autoFocus
                                    type="search"
                                    className="list__title"
                                    maxLength={12}
                                    placeholder="List name..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    onBlur={() => saveListName(title)}
                                />
                            </form>
                        )
                        : (
                            <>
                                <div className="list__title">
                                    {listData.title}
                                </div>
                                <div className="list__option">
                                    <i
                                        className="fa fa-ellipsis-v list__delete"
                                        onClick={() => setShowListMenu(true)}
                                    >
                                    </i>
                                    {
                                        showListMenu
                                        && (
                                            <DropdownMenu options={listOptions} hideDropdown={() => setShowListMenu(false)} />
                                        )
                                    }
                                </div>
                            </>
                        )
                    }
                </div>
                {listData.cards.map((card) => <Card key={card} removeCard={removeCard} id={card} />)}
                {listData.title && (
                    <div className="list__btn">
                        <Button onClick={addCard}>
                            Add Items
                        </Button>
                    </div>
                )}

            </div>
        </>
    )
}

export default List;
