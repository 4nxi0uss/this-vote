import { useState } from 'react';
import type { MouseEvent } from "react";

import style from './Polls.module.scss';
import block from 'bem-css-modules';

import Poll from './subcomponent/Poll/Poll';

import { ObjectPushType, optionListType } from '../../Types/Types';

import { pollApi, useGetPollsQuery } from '../../Redux/Services/PollApi';

import AddPoll from './subcomponent/AddPoll/AddPoll';
import { useUserLoginMutation } from '../../Redux/Services/UserApi';

const b = block(style);

let optionsList: optionListType[] = []

const Polls = () => {
    const [loginApi, { data: dataLogin, isLoading: isLoging }] = useUserLoginMutation({
        fixedCacheKey: "login"
    });

    const { data: dataGetPollsApi, isLoading } = useGetPollsQuery(!isLoging && dataLogin?.rows[0]?.user_id);

    const { refetch } = pollApi.endpoints.getPolls.useQuerySubscription(dataLogin?.rows[0]?.user_id)

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

    const handleGetPoll = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        refetch()
    }

    const PollDisplay = () => !isLoading && dataGetPollsApi.data.map((el: any) => <Poll key={el.number} id={el.id} name={el.name} question={el.question} options={el.options} />)

    return (
        <section className={b()}>
            <button className={b('add')} onClick={handleModal}>Add poll</button>
            {AddPoll(isShownAdd, handleModal, randomNumber)}
            <button className={b('add')} onClick={handleGetPoll}>test pobierania polls</button>

            {PollDisplay()}
        </section>
    )
}

export default Polls
