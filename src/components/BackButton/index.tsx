import React from 'react'
import { useNavigate } from 'react-router-dom'

import pikachuPointer from 'assets/images/pikachu-point.png'

import styles from './BackButton.module.scss'

const BackButton = () => {
    const navigate = useNavigate()

    return (
        <div className={styles.back} onClick={() => navigate('/')}>
            <img src={pikachuPointer} alt="back" />
            <span>Back</span>
        </div>
    )
}

export default React.memo(BackButton)
