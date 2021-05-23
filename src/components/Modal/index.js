import cn from 'classnames';
import { useRef } from 'react';
import s from './style.module.css';

const Modal = ({ isOpen, title, onCloseModal, children}) => {
    const modalEl = useRef();

    const handleCloseModal = () => {
        onCloseModal && onCloseModal(false);
    }
    const handleClickRoot = (event) => {
        if (!modalEl.current.contains(event.target)) {
            handleCloseModal();
        }
    }
    return (
        <div
            className={cn(s.root, { [s.open]: isOpen })}
            onClick={handleClickRoot}
        >
            <div
                ref={modalEl}
                className={s.modal}
            >
                <div className={s.head}>
                    {title}
                    <span
                        className={s.btnClose}
                       
                        onClick={handleCloseModal}
                    > <i title='Закрыть' className="fa fa-close"></i></span>
                </div>
                <div className={s.content}>
                {children}
                </div>
            </div>
        </div>
    )
}

export default Modal;