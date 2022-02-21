import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent, FormEvent, MouseEvent } from 'react';

import './Account.scss'

import { useAppDispatch, useAppSelector } from '../../Redux/Hooks/hooks';
import { fetchUpdateInfo, fetchGetUserData } from '../../Redux/Slice/accountSlice';

const Account = () => {
    const { infoLogin, infoUpdate, userData, statusUpdateInfo } = useAppSelector(state => state.users)

    const betterDate = (date: string) => date.slice(0, 10)

    const [name, setName] = useState<string>(userData.data[0].Name);
    const [surname, setSurname] = useState<string>(userData.data[0].Surname);
    const [date, setDate] = useState<string>(betterDate(userData.data[0].date_of_birth));
    const [typeOfAccount, setTypeOfAccount] = useState<number>(userData.data[0].type_of_account);
    const [accountStatus, setAccountStatus] = useState<number>(userData.data[0].active);

    const dispatch = useAppDispatch();

    const TodayDate = new Date();

    const handleName = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setName(e.target.value)
    }

    const handleSurname = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setSurname(e.target.value)
    }

    const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setDate(e.target.value.trim())
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const infoUpdates = { userId: infoLogin.rows[0].user_id, name, surname, dateOfBirth: date };
        try {
            dispatch<any>(fetchUpdateInfo(infoUpdates));
            console.log(46, infoUpdate);
        } catch (error) {
            console.warn(error)
        }

        console.log("udalo sie");
        console.log(52, infoUpdate);
        console.log('status: ', statusUpdateInfo);
    }

    const handleActive = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        fetch('http://localhost:3022/users/active', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: infoLogin.rows[0].user_id,
            })
        }).then(res => res.json()).then(data => console.table(data))

        console.log("udalo sie");
    }

    useEffect(() => {
        dispatch<any>(fetchGetUserData(infoLogin.rows[0].user_id));
    }, [])

    useMemo(() => {
        setName(userData.data[0].Name)
        setSurname(userData.data[0].Surname)
        setDate(betterDate(userData.data[0].date_of_birth))
        setAccountStatus(userData.data[0].active)
        setTypeOfAccount(userData.data[0].type_of_account)
    }, [userData])

    return (
        <section className="AccountSection">

            <h2 className='AcountTitle'> Hello {name} </h2>

            <button disabled={accountStatus === 1 ? true : false} className="AccountActivateBtn" onClick={handleActive} >Activate</button>

            <form className='AccountForm' onSubmit={handleSubmit} method="submit">

                <label className="labelBefore">Name:</label>
                <input type="text" required placeholder="Name" onChange={handleName} value={name} />

                <label className="labelBefore">Surname:</label>
                <input type="text" required placeholder="Surname" onChange={handleSurname} value={surname} />

                <label className="labelBefore">Date of birth:</label>
                <input type="date" max={`${TodayDate.getFullYear()}-${TodayDate.getMonth() + 1}-${TodayDate.getDate()}`} onChange={handleDate} value={date} />

                <label >Type of account:</label>
                <input type="text" readOnly disabled value={typeOfAccount} />

                <label >Account status:</label>
                <input type="text" readOnly disabled value={accountStatus} />

                <button className="AccountSubmitBtn" type="submit">Save</button>
            </form>
        </section>
    )
}

export default Account;