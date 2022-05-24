import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent, FormEvent, MouseEvent } from 'react';

import style from './Account.module.scss'
import block from 'bem-css-modules'

import { useAppDispatch, useAppSelector } from '../../Redux/Hooks/hooks';
import { fetchUpdateInfo } from '../../Redux/Slice/userUpdateSlice';
import { fetchGetUserData } from '../../Redux/Slice/GetUserDataSlice';

const b = block(style);

const Account = () => {

    const { infoLogin } = useAppSelector(state => state.usersLogin)
    const { userData } = useAppSelector(state => state.userData)
    const { statusUpdateInfo } = useAppSelector(state => state.userUpdate)

    const betterDate = (date: string) => date.slice(0, 10)

    const [name, setName] = useState<string>(userData.data[0].name);
    const [surname, setSurname] = useState<string>(userData.data[0].surname);
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
        } catch (error) {
            console.warn(error)
        }

        console.log("udalo sie");
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
        setName(userData.data[0].name)
        setSurname(userData.data[0].surname)
        setDate(betterDate(userData.data[0].date_of_birth))
        setAccountStatus(userData.data[0].active)
        setTypeOfAccount(userData.data[0].type_of_account)
    }, [userData])

    return (
        <section className={b()}>

            <h2 className={b('title')}> Hello {name} </h2>

            <button disabled={accountStatus === 1 ? true : false} className={b('activate-btn')} onClick={handleActive}> Activate</button>

            <form className={b('form')} onSubmit={handleSubmit} method="submit">

                <label >Name:</label>
                <input type="text" required placeholder="Name" onChange={handleName} value={name} />

                <label >Surname:</label>
                <input type="text" required placeholder="Surname" onChange={handleSurname} value={surname} />

                <label >Date of birth:</label>
                <input type="date" max={`${TodayDate.getFullYear()}-${TodayDate.getMonth() + 1}-${TodayDate.getDate()}`} onChange={handleDate} value={date} />

                <label >Type of account:</label>
                <input type="text" readOnly disabled value={typeOfAccount} />

                <label >Account status:</label>
                <input type="text" readOnly disabled value={accountStatus} />

                <button className={b('submit-btn')} type="submit">Save</button>
            </form>
        </section>
    )
}

export default Account;