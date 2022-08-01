import { useEffect, useState } from 'react';
import type { MouseEvent } from "react";

import style from './PollsList.module.scss';
import block from 'bem-css-modules';

import Poll from './subcomponent/Poll/Poll';
import Loader from '../Loader/Loader';
import AddPoll from './subcomponent/AddPoll/AddPoll';

import { ObjectPushType, optionListType } from '../../Types/Types';

import { useGetPollsQuery } from '../../Redux/Services/PollApi';
import { useUserLoginMutation } from '../../Redux/Services/UserApi';
import Pagination from '../Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '../../Redux/Hooks/hooks';
import { incrementByAmountPage } from '../../Redux/Slice/PaginationSlice';

const b = block(style);

let optionsList: optionListType[] = []

const PollsList = () => {

    const page = useAppSelector((state) => state.pagination.initialPage)
    const dispach = useAppDispatch()

    // eslint-disable-next-line
    const [loginApi, { data: dataLogin, isLoading: isLoging }] = useUserLoginMutation({
        fixedCacheKey: "login"
    });

    const { data: dataGetPollsApi, isLoading: isGetting, isSuccess } = useGetPollsQuery({ userId: dataLogin?.rows[0]?.user_id, page }, {
        pollingInterval: 5000
    });
    console.log(dataGetPollsApi?.numberOfPages)

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

    const PollDisplay = () => !isGetting && dataGetPollsApi?.data?.map((el: any) => <Poll key={el.number} id={el.id} name={el.name} number={el.number} question={el.question} options={el.options} />)

    useEffect(() => {
        dispach(incrementByAmountPage(1))
    }, [])

    return (
        <section className={b()}>
            {!isGetting && <button className={b('add')} onClick={handleModal}>Add poll +</button>}
            {AddPoll(isShownAdd, handleModal, handleRandomNumber, randomNumber)}

            {!isGetting ? PollDisplay() : <Loader />}
            {Pagination(dataGetPollsApi?.numberOfPages, isSuccess, page)}
        </section>
    )
}

export default PollsList
