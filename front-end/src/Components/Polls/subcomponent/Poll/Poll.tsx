import { useState } from 'react';

import style from './Poll.module.scss'
import block from 'bem-css-modules'

import { PollProp, VoteType } from '../../../../Types/Types';

import { useDeletePollMutation, useGetPollsQuery, useUpdatePollValueMutation } from '../../../../Redux/Services/PollApi';

import EditPoll from '../EditPoll/EditPoll';
import { useUserLoginMutation } from '../../../../Redux/Services/UserApi';

const b = block(style);

const Poll = ({ id, name, question, options }: PollProp) => {

    const [loginApi, { data: dataLogin, isLoading: isLoging }] = useUserLoginMutation({
        fixedCacheKey: "login"
    });

    const { data: getPollsData, error, isLoading } = useGetPollsQuery(!isLoging && dataLogin?.rows[0].user_id)

    const [updatePollOptionValueApi, { isLoading: isUpdating }] = useUpdatePollValueMutation()
    const [deletePoolApi, { isLoading: isDeleting }] = useDeletePollMutation()

    const [isOpenEdit, setIsShownEdit] = useState<boolean>(false)

    let optionJsonParse: object = JSON.parse(options)
    const optionJsonParseValuses = Object.values(optionJsonParse)

    const handlePollDelete = (e: React.MouseEvent<HTMLButtonElement>) => {

        const delData = { creatorId: String(!isLoging && dataLogin?.rows[0].user_id), id: id }
        console.log(id)
        deletePoolApi(delData)
    }

    const handleBtnFunction = (event: any, vote?: any, index?: number) => {
        event.preventDefault();

        const putOption = { id: Number(id), optionId: vote.id }

        updatePollOptionValueApi(putOption)
    }

    const handleEdit = (event: any) => {
        event.preventDefault();
        setIsShownEdit(!isOpenEdit)
    }

    const buttonOfChoose = () => optionJsonParseValuses.map((valueOfJsonData: any, index: number) => !Boolean(typeof (valueOfJsonData.name) === String(undefined)) && <button key={valueOfJsonData.id} className='addedBtn' onClick={(event: any) => handleBtnFunction(event, valueOfJsonData, index)}>{valueOfJsonData.name}--{valueOfJsonData.vote}</button>);

    const circleStyle = () => {

        let percentArr: number[] = []
        let colorArr: string[] = []
        let voteSum: number = 0

        optionJsonParseValuses.forEach(({ vote }: VoteType) => {
            voteSum += vote
        })

        optionJsonParseValuses.forEach(({ vote, color }: VoteType) => {
            percentArr.push(Number(((vote / voteSum) * 100).toFixed(2)))
            colorArr.push(String(color))
        })

        let sectionOfStyle = ``
        let percent0 = 0;

        if (voteSum === 0) {
            const fin = Number((100 / Number(percentArr.length)).toFixed(2))
            percentArr.forEach((el, i) => (percentArr[i] = fin))
        }

        percentArr.forEach((el: number, i: number) => {
            let percent1 = Number((percent0 + el).toFixed(2));
            sectionOfStyle += `${colorArr[i]} ${percent0}% ${percent1}%, `
            percent0 = percent1
        })

        let style = `conic-gradient(${sectionOfStyle})`
        style = style.replace(", )", ")")
        return style
    }

    const test = () => !isLoading && getPollsData.data.map((el: any) => id === el.id && < EditPoll key={el.id} isOpen={isOpenEdit} edit={handleEdit} pro={el} />)
    return (
        <section className={b()}>
            <button onClick={handlePollDelete}>del</button>
            <button onClick={handleEdit}>Edit</button>
            {test()}
            <h2>{name}</h2>
            <h3>{question}</h3>
            <div className={b('circle-chart')} style={({ background: circleStyle() })}></div>
            <div className={b('btns')}>
                {buttonOfChoose()}
            </div>
            <p>{id}</p>
        </section>
    )
}

export default Poll
