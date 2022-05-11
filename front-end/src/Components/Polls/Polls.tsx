import { useEffect, useState } from 'react';
import type { MouseEvent } from "react"

import './Polls.scss'

import Poll from './subcomponent/Poll/Poll';

import { useAppDispatch, useAppSelector } from '../../Redux/Hooks/hooks';
import { ObjectPushType, optionListType } from '../../Types/Types';
import { fetchGetPolls } from '../../Redux/Slice/getPollSlice';
import AddPoll from './subcomponent/AddPoll/AddPoll';

let optionsList: optionListType[] = []

const Polls = () => {
    const dispatch = useAppDispatch();

    const { infoLogin } = useAppSelector(state => state.users)
    const { infoGetPolls } = useAppSelector(state => state.getPolls)

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
        dispatch<any>(fetchGetPolls(infoLogin.rows[0].user_id))
    }

    useEffect(() => { dispatch<any>(fetchGetPolls(infoLogin.rows[0].user_id)) }, [dispatch, infoLogin.rows])

    const PollDisplay = () => infoGetPolls.data.map((el: any) => <Poll key={el.number} id={el.id} name={el.name} question={el.question} options={el.options} />);

    return (
        <section className='mainPollsSection'>
            <button className='addPoll' onClick={handleModal}>Add poll</button>
            {AddPoll(isShownAdd, handleModal, randomNumber)}
            <button className='addPoll' onClick={handleGetPoll}>test pobierania polls</button>

            {PollDisplay()}
        </section>
    )
}

export default Polls