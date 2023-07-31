import React, { useState } from 'react';
import styles from './Reserve.module.css';

function Reserve({ modalContent }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOverlayClick = (event) => {
        if (event.target.className.includes(styles.overlay)) {
            setIsModalOpen(false);
        }
    };

    return (
        <div className={styles.container}>
            <button className={'restaurant__like'} onClick={() => setIsModalOpen(true)}>
                Забронировать
            </button>
            {isModalOpen && (
                <div className={styles.overlay} onClick={handleOverlayClick}>
                    <div className={styles.content}>
                        <div className={styles.telephone}>{modalContent}</div>
                        <button className={styles.close} onClick={() => setIsModalOpen(false)}>
                            Закрыть
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Reserve;
