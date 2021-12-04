import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent, MouseEvent } from 'react';

import './Account.scss'

import { useAppDispatch, useAppSelector } from '../../Redux/Hooks/hooks';
import { fetchUpdateInfo, fetchGetUserData } from '../../Redux/Slice/accountSlice';


const Account = () => {
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [date, setDate] = useState<string>("");

    const dispatch = useAppDispatch();
    const { infoLogin, infoUpdate, userData, statusUpdateInfo, statusUserData } = useAppSelector(state => state.users)

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

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const infoUpdates = { userId: infoLogin.rows[0].user_id, name, surname, dateOfBirth: date };

        dispatch(fetchUpdateInfo(infoUpdates));

        console.log("udalo sie");
        console.log(infoUpdate);
        console.log('status: ', statusUpdateInfo);
    }

    const handleActive = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        console.log("udalo sie");
    }

    // const userDataF = () => {
    //     console.log(infoLogin.rows[0].user_id);
    //     dispatch(fetchGetUserData(infoLogin.rows[0].user_id));
    //     console.log(statusUserData, userData)
    // }

    useEffect(() => {
        console.log(infoLogin.rows[0].user_id);
        dispatch(fetchGetUserData(infoLogin.rows[0].user_id));
        console.log(statusUserData, userData)
    }, [])

    return (
        <section className="AccountSection">

            <h2 className='AcountTitle'> Hello name </h2>

            <button className="AccountActivateBtn" onClick={handleActive} >Activate</button>

            <form className='AccountForm' onSubmit={handleSubmit} method="submit">

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