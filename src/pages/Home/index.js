import React from 'react';
import styles from './styles.module.css';
import CalculatorForm from '../../components/CalculatorForm'
function Home() {
    

    return (
        <div style={{ height: "100%", width: "100%", margin: "0", backgroundColor:"red"}}>
            <div className={styles.content}>
                <div className={styles.container}>
                    
                    <h1 className={styles.title}>The Company</h1>
                    <h2 className={styles.calculateTitle}>Shipping Time Calculator</h2>
                    <CalculatorForm/>


                </div>
            </div>
            <div className={styles.gradient}>

            </div>
        </div>
    )
}

export default Home;