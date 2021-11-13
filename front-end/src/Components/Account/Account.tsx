import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import './Account.scss'


const Account = () => {
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [date, setDate] = useState<string>("");

    const TodayDate = new Date();

    const handleName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handleSurname = (e: ChangeEvent<HTMLInputElement>) => {
        setSurname(e.target.value)
    }

    const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value.trim())
    }

    return (
        <section className="AccountSection">
            <h2 className='AcountTitle'> Hello name </h2>
            <button className="AccountActivateBtn">Activate</button>
            <form className='AccountForm'>

                <label className="labelBefore">Name:</label>
                <input type="text" required placeholder="Name" onChange={handleName} value={name} />

                <label className="labelBefore">Surname:</label>
                <input type="text" required placeholder="Surname" onChange={handleSurname} value={surname} />

                <label className="labelBefore">Date of birth:</label>
                <input type="date" max={`${TodayDate.getFullYear()}-${TodayDate.getMonth() + 1}-${TodayDate.getDate()}`} onChange={handleDate} value={date} />

                <label >Type of account:</label>
                <input type="text" readOnly disabled />

                <label >Account status:</label>
                <input type="text" readOnly disabled />

                <button className="AccountSubmitBtn" type="submit">Save</button>
            </form>
        </section>
    )
}

export default Account;