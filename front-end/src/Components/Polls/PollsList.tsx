import { useEffect, useState } from 'react';
import type { MouseEvent } from "react";

import { useSearchParams } from 'react-router-dom';

import style from './PollsList.module.scss';
import block from 'bem-css-modules';

import Poll from './subcomponent/Poll/Poll';
import Loader from '../Loader/Loader';
import AddPoll from './subcomponent/AddPoll/AddPoll';
import Pagination from '../Pagination/Pagination';

import { ObjectPushType, optionListType, PollType } from '../../Types/Types';

import { useGetPollsQuery } from '../../Redux/Services/PollApi';
import { useUserLoginMutation } from '../../Redux/Services/UserApi';
import { useAppDispatch, useAppSelector } from '../../Redux/Hooks/hooks';
import { incrementByAmountPage } from '../../Redux/Slice/PaginationSlice';

import { skipToken } from '@reduxjs/toolkit/dist/query';

const b = block(style);

let optionsList: optionListType[] = []

const PollsList = () => {

    const page = useAppSelector((state) => state.pagination.initialPage)
    const dispach = useAppDispatch()

    let [searchParams] = useSearchParams();

    // eslint-disable-next-line
    const [loginApi, { data: dataLogin, isSuccess: isSuccessLogin }] = useUserLoginMutation({
        fixedCacheKey: "login"
    });

    const { data: dataGetPollsApi, isLoading: isGetting, isSuccess } = useGetPollsQuery(isSuccessLogin ? { userId: String(dataLogin?.rows[0]?.user_id), page } : skipToken, {
        pollingInterval: 5000
    });

    const [isShownAdd, setIsShownAdd] = useState<boolean>(false)
    const [randomNumber, setRandomNumber] = useState<number>(0);

    const handleRandomNumber = (event?: MouseEvent<HTMLButtonElement>) => {
        event?.preventDefault();
        setRandomNumber((Math.floor(Math.random() * 100000) + 100000));
    }

    const handleModal = (event: MouseEvent<HTMLButtonElement>) => {
        handleRandomNumber(event);
        setIsShownAdd(!isShownAdd);
    }

    let optionObject: ObjectPushType = {};
    optionsList.forEach((option, index) => optionObject[`option${index}`] = { id: index, ...option })

    const PollDisplay = () => !isGetting && dataGetPollsApi?.data?.map((el: PollType) => <Poll key={el.number} id={el.id} name={el.name} number={el.number} question={el.question} options={el.options} poolCreator={el.user_id} />)

    useEffect(() => {
        const chekingPage = Number(searchParams.get('page')) > 0 ? Number(searchParams.get('page')) : 1;

        dispach(incrementByAmountPage(chekingPage))
        // eslint-disable-next-line
    }, [])

    return (
        <div className={b()}>
            {!isGetting && <button className={b('add')} onClick={handleModal}>Add poll +</button>}
            {AddPoll(isShownAdd, handleModal, handleRandomNumber, randomNumber)}

            {!isGetting ? PollDisplay() : <Loader />}
            {Pagination(Number(dataGetPollsApi?.numberOfPages), isSuccess, page)}
        </div>
    )
}

export default PollsList
