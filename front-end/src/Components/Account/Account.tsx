import { useMemo, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import style from './Account.module.scss'
import block from 'bem-css-modules'

import { useGetUserDataQuery, useUpdateUserInfoMutation, useUserLoginMutation } from '../../Redux/Services/UserApi';

import { userAcountType } from '../../Types/Types';

const b = block(style);

const Account = () => {
    // eslint-disable-next-line
    const [loginApi, { data: dataLogin, isLoading }] = useUserLoginMutation({
        fixedCacheKey: "login"
    });

    const [updateUserInfo, { isError, error }] = useUpdateUserInfoMutation();

    const { data: userData, isError: isUserDataError, error: userDataError } = useGetUserDataQuery(!isLoading && dataLogin?.rows[0]?.user_id)

    isError && console.warn(error)
    isUserDataError && console.warn(userDataError)

    const betterDate = (date: string) => date?.slice(0, 10)

    const [name, setName] = useState<string>(userData?.data[0]?.name);
    const [surname, setSurname] = useState<string>(userData?.data[0]?.surname);
    const [date, setDate] = useState<string>(betterDate(userData?.data[0]?.date_of_birth));
    const [typeOfAccount, setTypeOfAccount] = useState<number>(userData?.data[0]?.type_of_account);

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

        const infoUpdates = { userId: dataLogin?.rows[0]?.user_id, name, surname, dateOfBirth: date };

        try {
            updateUserInfo(infoUpdates)
        } catch (error) {
            console.warn(error)
        }
    }

    useMemo(() => {
        setName(userData?.data[0]?.name)
        setSurname(userData?.data[0]?.surname)
        setDate(betterDate(userData?.data[0]?.date_of_birth))
        setTypeOfAccount(userData?.data[0]?.type_of_account)
        // eslint-disable-next-line
    }, [userData])

    return (
        <section className={b()}>

            <h2 className={b('title')}> Hello {name} </h2>

            <form className={b('form')} onSubmit={handleSubmit} method="submit">

                <label >Name:</label>
                <input type="text" required placeholder="Name" onChange={handleName} value={name ?? 'John'} />

                <label >Surname:</label>
                <input type="text" required placeholder="Surname" onChange={handleSurname} value={surname ?? 'Doe'} />

                <label >Date of birth:</label>
                <input type="date" max={`${TodayDate.getFullYear()}-${TodayDate.getMonth() + 1}-${TodayDate.getDate()}`} onChange={handleDate} value={date ?? '1234-11-22'} />

                <label className={b('of-label')}>Type of account:</label>
                <input type="text" readOnly disabled value={userAcountType[typeOfAccount ?? 0]} />

                <button className={b('form__submit-btn')} type="submit">Save</button>
            </form>
        </section>
    )
}

export default Account;