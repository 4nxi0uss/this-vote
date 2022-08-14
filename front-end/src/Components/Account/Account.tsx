import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';

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

    const { data: userData } = useGetUserDataQuery(isSuccess && Boolean(dataLogin?.rows[0]?.user_id) ? String(dataLogin?.rows[0]?.user_id) : skipToken)

    const betterDate = (date: string) => date?.slice(0, 10)

    const [changeUserAccountTypeError, setChangeUserAccountTypeError] = useState<string>('');

    const [formObj, setFormObj] = useState<{ name: string, surname: string, date: string, typeOfAccount: string }>({ name: '', surname: '', date: '', typeOfAccount: '' });
    const [timeObj, setTimeObj] = useState<{ info: boolean, error: boolean }>({ info: false, error: false })
    const [changedTypeObj, setChangedTypeObj] = useState<{ email: string, type: string }>({ email: '', type: 'User' })

    const TodayDate = new Date();

    const handleSendChangeUserPersonalData = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const infoUpdates = { userId: String(dataLogin?.rows[0]?.user_id), name: formObj.name, surname: formObj.surname, dateOfBirth: formObj.date };

        updateUserInfo(infoUpdates)
            .unwrap()
            .then(() => {
                setTimeObj(state => ({ ...state, info: true }))
                setTimeout(() => {
                    setTimeObj(state => ({ ...state, info: false }))
                }, 3000)
            })
            .catch((res) => {
                setChangeUserAccountTypeError(res.data.message)
                setTimeObj(state => ({ ...state, error: true }))
                setTimeout(() => {
                    setTimeObj(state => ({ ...state, error: false }))
                        ; setChangeUserAccountTypeError('')
                }, 3000)
            })
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const userTypeOption = () => {
        return Object.entries(userAcountType).map((el) => <option key={el[0]} value={el[0]}>{el[1]}</option>)
    }

    const handleSendChangedType = () => {

        if (isNaN(Number(changedTypeObj.type))) return;

        changeUserAccountType({ typeAccount: Number(changedTypeObj.type), email: changedTypeObj.email })
            .unwrap()
            .then(
                () => {
                    setTimeObj(state => ({ ...state, info: true }))
                    setTimeout(() => {
                        setTimeObj(state => ({ ...state, info: false }))
                    }, 3000)
                }
            )
            .catch((res) => {
                setChangeUserAccountTypeError(res.data.message)
                setTimeObj(state => ({ ...state, error: true }))
                setTimeout(() => {
                    setTimeObj(state => ({ ...state, error: false })); setChangeUserAccountTypeError('')
                }, 3000)
            })
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleChangeForm = (e: any) => {
        setFormObj(state => ({
            ...state, [e.target.name]: e.target.value,
        }))
    }

    const messageCondition = () => {
        if ((!isLoad || !isLoadAccountType) && timeObj.info) { return true } else { return false }
    }

    const errorCondition = () => {
        if ((isErr || isError) && timeObj.error) {
            return true
        } else {
            return false
        }
    }

    useMemo(() => {
        Boolean(userData?.data[0]?.name) && setFormObj({ name: userData?.data[0]?.name ?? '', surname: userData?.data[0]?.surname ?? '', date: betterDate(userData?.data[0]?.date_of_birth ?? ''), typeOfAccount: userData?.data[0].type_of_account ?? '' })
        // eslint-disable-next-line
    }, [userData])

    return (
        <section className={b()}>

            <h2 className={b('title')}> Hello {formObj.name} </h2>

            {messageCondition() && <h4 className={b('info', { message: true })}>{(!isLoad && dataUpdate?.message) || (!isLoadAccountType && dataAccountType?.message)}</h4>}

            {errorCondition() && <h4 className={b('info', { warning: true })}>{changeUserAccountTypeError}</h4>}

            <form className={b('form')} onSubmit={handleSendChangeUserPersonalData} method="submit">

                <label htmlFor='name' >Name:</label>
                <input name='name' id='name' type="text" required placeholder="Name" onChange={handleChangeForm} value={formObj.name ?? 'John'} />

                <label htmlFor='surname'>Surname:</label>
                <input name='surname' id='surname' type="text" required placeholder="Surname" onChange={handleChangeForm} value={formObj.surname ?? 'Doe'} />

                <label htmlFor='date' >Date of birth:</label>
                <input name='date' id='date' type="date" max={TodayDate.toLocaleDateString('fr-ca')} onChange={handleChangeForm} value={formObj.date ?? '1234-11-22'} />

                <label className={b('of-label')} htmlFor='type' >Type of account:</label>
                <input name='' type="text" id='type' readOnly disabled value={userAcountType[formObj.typeOfAccount ?? 'User']} />

                <button className={b('form__submit-btn')} type="submit">Save</button>

            </form>

            {userAcountType[formObj.typeOfAccount] === 'Admin' && < div className={b('change-type-account')}>
                <h2 className={b('change-type-account__title')}>Change typ of user account</h2>

                <label className={b('of-label')} htmlFor='email'>User email</label>
                <input type="text" value={changedTypeObj.email} id='email' onChange={(e) => { setChangedTypeObj(state => ({ ...state, email: e.target.value })) }} />

                <label className={b('of-label')} htmlFor='userType'>User type</label>
                <select value={changedTypeObj.type} id='userType' onChange={(e) => { setChangedTypeObj(state => ({ ...state, type: e.target.value })) }}>
                    {userTypeOption()}
                </select>

                <button className={b('change-type-account__submit-btn')} onClick={handleSendChangedType}>Save</button>
            </div>}

        </section >
    )
}

export default Account;