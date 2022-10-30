import React, {useState} from 'react'
import styles from './styles.module.css';
import { calculate } from '../../modules/CalculateModule';

function CalculatorForm() {
    const [form, setForm] = useState({
        orderDate: "",
        fabricType: "",
        quantity: ""
    })

    const [errors, setErrors] = useState({
        orderDate: "",
        fabricType: "",
        quantity: ""
    })

    const [calculateMessage, setCalculateMessage] = useState("Please enter your order information to estimate shipping date")

    

    const changeInput = (event) => {
        if (event.target.name === "orderDate") {
            const currentDay = new Date();
            const selectedOrderDate = new Date(event.target.value)
            if (selectedOrderDate < currentDay) {
                setErrors({ ...errors, orderDate: "Order Date should be the current day or later, it can’t be a past date" })
            } else {
                setErrors({ ...errors, orderDate: "" })
            }
        }

        if (event.target.name === "quantity") {
            if (isNaN(+event.target.value)) {
                setErrors({ ...errors, quantity: "Quantity should be number" });
            } else if (!((+event.target.value) >= 1 && (+event.target.value) <= 100)) {
                setErrors({ ...errors, quantity: "Quantity should be between 1 and 100" });
            } else {
                setErrors({ ...errors, quantity: "" })
            }
        }

        if (event.target.name === "fabricType") {
            if (event.target.value !== "") {
                setErrors({ ...errors, fabricType: "" })
            }

        }

        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }


    const submitForm = (event) => {
        event.preventDefault();
        if (form.fabricType === "") {
            setErrors({ ...errors, fabricType: "Fabric type should be provide" });
        }
        if (form.orderDate === "") {
            setErrors({ ...errors, orderDate: "Order Date should be provide" });
        }
        if (form.quantity === "") {
            setErrors({ ...errors, quantity: "Quantity should be provide" });
        }


        if (errors.fabricType || errors.orderDate || errors.quantity || form.fabricType === "" || form.orderDate === "" || form.quantity === "") {
            alert("Please Fill All Information Correctly")
        } else {

            const shippingDate = calculate(form)
            setCalculateMessage(<span>Your Estimated Shipping Time Is <h3 className={styles.estimateDate}>{formatDate(shippingDate)}</h3></span>)
        }
    }


    function formatDate(date) {
        const day = date.toLocaleString('default', { day: '2-digit' });
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.toLocaleString('default', { year: 'numeric' });
        return day + ' ' + month + ' ' + year;
    }

    return (
        <React.Fragment>
            <form onSubmit={submitForm} >
                <div className={styles.formContainer}>

                    <div className={styles.formInputBox}>
                        <input name='orderDate' type='date' value={form.orderDate} onChange={changeInput} placeholder="Order Date" className={styles.formInput} />
                        {errors.orderDate ? (<div className={styles.errorMessage}>{errors.orderDate} </div>) : " "}
                    </div>
                    <div className={styles.formInputBox}>
                        <select name='fabricType' value={form.fabricType} onChange={changeInput} placeholder="Fabric Type" className={styles.formInput} >
                            <option hidden value="">&#8595;&#8593;  Fabric Type</option>
                            <option value="cotton">Cotton</option>
                            <option value="linen">Linen</option>
                        </select>
                        {errors.fabricType ? (<div className={styles.errorMessage}>{errors.fabricType} </div>) : " "}
                    </div>
                    {/* */}
                    <div className={styles.formInputBox} style={{ position: "relative" }}  >
                        <input name='quantity' value={form.quantity} onChange={changeInput} placeholder="quantity" className={styles.formInput} />
                        <span className={styles.icon}>i</span>
                        <span className={styles.iconMessage}>Shipping Dates May Vary Based on Quantity</span>
                        {errors.quantity ? (<div className={styles.errorMessage}>{errors.quantity} </div>) : " "}
                    </div>

                </div>
                <button type='submit' className={styles.btn}>Calculate</button>
            </form>

            <span className={styles.estimateMessage}>{calculateMessage}</span>

        </React.Fragment>
    )
}

export default React.memo(CalculatorForm);