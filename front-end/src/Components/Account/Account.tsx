import { useMemo, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import style from './Account.module.scss'
import block from 'bem-css-modules'

import { useChangeUserAccountTypeMutation, useGetUserDataQuery, useUpdateUserInfoMutation, useUserLoginMutation } from '../../Redux/Services/UserApi';

import { userAcountType } from '../../Types/Types';
import { skipToken } from '@reduxjs/toolkit/dist/query';

const b = block(style);

const Account = () => {

    // eslint-disable-next-line
    const [loginApi, { data: dataLogin, isSuccess }] = useUserLoginMutation({
        fixedCacheKey: "login"
    });

    const [updateUserInfo, { data: dataUpdate, isLoading: isLoad, isError }] = useUpdateUserInfoMutation();
    const [changeUserAccountType, { data: dataAccountType, isLoading: isLoadAccountType, isError: isErr, }] = useChangeUserAccountTypeMutation();

    const { data: userData } = useGetUserDataQuery(isSuccess ? String(dataLogin?.rows[0]?.user_id) : skipToken)

    const betterDate = (date: string) => date?.slice(0, 10)

    const [name, setName] = useState<string>(String(userData?.data[0]?.name));
    const [surname, setSurname] = useState<string>(String(userData?.data[0]?.surname));
    const [date, setDate] = useState(betterDate(String(userData?.data[0].date_of_birth)));
    const [typeOfAccount, setTypeOfAccount] = useState(userData?.data[0]?.type_of_account);
    const [timeing, setTiming] = useState<boolean>(false);
    const [timeingErr, setTimingErr] = useState<boolean>(false);
    const [changedType, setChangedType] = useState<number>(0);
    const [userEmail, setUserEmail] = useState<string>('');
    const [changeUserAccountTypeError, setChangeUserAccountTypeError] = useState<string>('');

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

    const handleChangeUserPersonalData = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const infoUpdates = { userId: String(dataLogin?.rows[0]?.user_id), name, surname, dateOfBirth: date };

        updateUserInfo(infoUpdates)
            .unwrap()
            .then(() => {
                setTiming(true)
                setTimeout(() => { setTiming(false) }, 3000)
            })
            .catch((res) => {
                setChangeUserAccountTypeError(res.data.message)
                setTimingErr(true)
                setTimeout(() => { setTimingErr(false); setChangeUserAccountTypeError('') }, 3000)
            })
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const userTypeOption = () => {
        return Object.entries(userAcountType).map((el) => <option key={el[0]} value={el[0]}>{el[1]}</option>)
    }

    const handleCheangedType = () => {
        if (isNaN(Number(changedType))) return null
        changeUserAccountType({ typeAccount: Number(changedType), email: userEmail })
            .unwrap()
            .then(
                () => {
                    setTiming(true)
                    setTimeout(() => { setTiming(false) }, 3000)
                }
            )
            .catch((res) => {
                setChangeUserAccountTypeError(res.data.message)
                setTimingErr(true)
                setTimeout(() => { setTimingErr(false); setChangeUserAccountTypeError('') }, 3000)
            })
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    useMemo(() => {
        setName(String(userData?.data[0]?.name))
        setSurname(String(userData?.data[0]?.surname))
        setDate(betterDate(String(userData?.data[0]?.date_of_birth)))
        setTypeOfAccount(userData?.data[0]?.type_of_account)
        // eslint-disable-next-line
    }, [userData])

    return (
        <section className={b()}>

            <h2 className={b('title')}> Hello {name} </h2>

            {(!isLoad || !isLoadAccountType) && timeing && <h4 className={b('info', { message: true })}>{(!isLoad && dataUpdate?.message) || (!isLoadAccountType && dataAccountType?.message)}</h4>}
            {(isErr || isError) && timeingErr && <h4 className={b('info', { warning: true })}>{changeUserAccountTypeError}</h4>}

            <form className={b('form')} onSubmit={handleChangeUserPersonalData} method="submit">

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

            {userAcountType[Number(typeOfAccount)] === 'Admin' && < div className={b('change-type-account')}>
                <h2 className={b('change-type-account__title')}>Change typ of user account</h2>
                <label className={b('of-label')}>User email</label>
                <input type="text" value={userEmail} onChange={(e) => { setUserEmail(e.target.value) }} />
                <label className={b('of-label')}>User type</label>
                <select value={changedType} onChange={(e) => { setChangedType(Number(e.target.value)) }}>
                    {userTypeOption()}
                </select>
                <button className={b('change-type-account__submit-btn')} onClick={handleCheangedType}>Save</button>
            </div>}

        </section >
    )
}

export default Account;