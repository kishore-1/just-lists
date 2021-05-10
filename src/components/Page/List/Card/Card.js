import React, { useEffect, useState } from 'react';
import './style.scss';
import Modal from '../../../UI/Modal/Modal';
import DropdownMenu from '../../../UI/DropdownMenu/DropdownMenu';
import Toast from '../../../UI/Toast/Toast';

const Card = (props) => {
    const [cardData, setCardData] = useState({ title: "", comment: "" });
    const [title, setTitle] = useState("");
    const [showCardMenu, setShowCardMenu] = useState(false);
    const [remove, setRemove] = useState(false);
    const [showCardDetails, setShowCardDetails] = useState(false);
    const [toast, setToast] = useState({ show: false, message: "" });

    useEffect(() => {
        let cards = localStorage.getItem('cards');
        setCardData(JSON.parse(cards)[props.id]);
        setTitle(cardData.title);
        return () => {
            setCardData({});
        }
    }, [props.id, cardData.title])

    const saveTitle = (title, e) => {
        e && e.preventDefault();
        if (!title) {
            if (!cardData.title) {
                setRemove(true);
                setTimeout(props.removeCard, 300, props.id);
                return;
            }
            setToast({
                show: true,
                type: 'warning',
                message: "Title cannot be empty"
            });
            setTitle(cardData.title)
            return;
        }

        cardData.title = title;
        setData();
    }
    const saveComments = (comment, event) => {
        cardData.comment = comment;
        setData();
    }
    const setData = () => {
        localStorage.setItem('cards', JSON.stringify({ ...JSON.parse(localStorage.getItem('cards')), [props.id]: cardData }));
        setCardData({ ...cardData });
    }
    const removeCard = () => {
        setRemove(true);
        setTimeout(props.removeCard, 300, props.id);
    }
    const cardOptions = [
        {
            menu: "edit",
            action: () => {
                setShowCardMenu(false);
                setShowCardDetails(true);
            }
        }, {
            menu: "delete",
            action: () => {
                setShowCardMenu(false);
                removeCard();
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
            <div className={"card " + (cardData.title ? "" : "card--placeholder ") + (remove ? "card--remove" : "")}>
                {cardData.title
                    ? (
                        <div className="card__inner">
                            <div className="card__title" onClick={() => setShowCardDetails(true)}>{cardData.title}</div>
                            <div>
                                <i
                                    className="fa fa-ellipsis-v card__delete"
                                    onClick={() => setShowCardMenu(true)}
                                ></i>
                                {
                                    showCardMenu
                                    && (
                                        <DropdownMenu options={cardOptions} hideDropdown={() => setShowCardMenu(false)} />
                                    )
                                }
                            </div>
                        </div>
                    )
                    : (
                        <form className="card__inner card__inner--input" onSubmit={() => saveTitle(title)}>
                            <input
                                autoFocus
                                type="search"
                                className="card__title"
                                placeholder="Title..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onBlur={() => saveTitle(title)}
                            />
                        </form>
                    )
                }
            </div>
            {
                showCardDetails && (
                    <Modal showModal={setShowCardDetails}>
                        <div className="modal-card">
                            <div className="modal-card__field">Title</div>
                            <input
                                className="modal-card__title"
                                placeholder="Title..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onBlur={(e) => saveTitle(e.target.value)}
                            />
                            <div className="modal-card__field">Description</div>
                            <textarea
                                rows="5"
                                className="modal-card__comment"
                                placeholder="Comment..."
                                value={cardData.comment}
                                onChange={
                                    (e) => saveComments(e.target.value, e)
                                }
                            />
                        </div>
                    </Modal>
                )
            }
        </>
    )
}

export default Card;
