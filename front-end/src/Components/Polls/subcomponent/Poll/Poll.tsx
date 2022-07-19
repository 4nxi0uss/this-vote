import { useState } from 'react';

import type { MouseEvent } from 'react';

import style from './Poll.module.scss'
import block from 'bem-css-modules'

import { optionValueJson, PollProp, VoteType } from '../../../../Types/Types';

import { useDeletePollMutation, useUpdatePollValueMutation } from '../../../../Redux/Services/PollApi';

import EditPoll from '../EditPoll/EditPoll';
import { useUserLoginMutation } from '../../../../Redux/Services/UserApi';

const b = block(style);

const Poll = ({ id, name, question, options, number, btn = true }: PollProp) => {

    // eslint-disable-next-line
    const [loginApi, { data: dataLogin, isLoading: isLoging }] = useUserLoginMutation({
        fixedCacheKey: "login"
    });

    const [updatePollOptionValueApi] = useUpdatePollValueMutation()
    const [deletePoolApi] = useDeletePollMutation()

    const [isOpenEdit, setIsShownEdit] = useState<boolean>(false)

    let optionJsonParse: object = {}
    try {
        optionJsonParse = JSON.parse(options)
    } catch (error) {
        console.warn(error)
    }

    const optionJsonParseValuses = Object.values(optionJsonParse)

    const handlePollDelete = (e: React.MouseEvent<HTMLButtonElement>) => {

        const delData = { userId: String(!isLoging && dataLogin?.rows[0].user_id), id: id }
        deletePoolApi(delData)
    }

    const handleBtnFunction = (event: MouseEvent<HTMLButtonElement>, vote?: { id: number }) => {
        event.preventDefault();

        const putOption = { id: Number(id), optionId: vote?.id }

        updatePollOptionValueApi(putOption)
    }

    const handleEdit = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsShownEdit(!isOpenEdit)
    }

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

    const votePercent = (sum: number, count: number) => {
        if (!isNaN(((count / sum) * 100))) {
            return ((count / sum) * 100).toFixed(2)
        } else {
            return 0;
        }
    }

    const buttonsForVote = () => {
        let count = 0;
        optionJsonParseValuses.forEach((c) => { count += c.vote })
        return optionJsonParseValuses.map((valueOfJsonData: optionValueJson) => {
            return !Boolean(typeof (valueOfJsonData.name) === String(undefined)) && <button className={b('btn-vote')} key={valueOfJsonData.id} onClick={(event: MouseEvent<HTMLButtonElement>) => handleBtnFunction(event, valueOfJsonData)}>{valueOfJsonData.name} -- {votePercent(count, valueOfJsonData.vote)}% -- <span className={b('color-dot')} style={{ background: valueOfJsonData.color }}></span> </button>
        })
    };

    return (
        <section className={b()}>
            <div className={b('option')}>
                {btn && <button onClick={handlePollDelete} className={b('btn-option', { delete: true })}>Delete</button>}
                {btn && <button onClick={handleEdit} className={b('btn-option', { edit: true })}>Edit</button>}
            </div>
            < EditPoll key={id + 18} isOpen={isOpenEdit} edit={handleEdit} pro={{ id, name, question, number, options }} />
            <h2>{name}</h2>
            <h4>{question}</h4>
            <div className={b('circle-chart')} style={({ background: circleStyle() })}></div>
            <div className={b('btns')}>
                {buttonsForVote()}
            </div>
        </section>
    )
}

export default Poll
