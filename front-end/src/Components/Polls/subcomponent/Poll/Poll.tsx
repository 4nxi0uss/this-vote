import { useState } from 'react';
import type { MouseEvent } from 'react';

import style from './Poll.module.scss';
import block from 'bem-css-modules';

import { OptionValueJson, PollProp, VoteType } from '../../../../Types/Types';

import EditPoll from '../EditPoll/EditPoll';

import { useDeletePollMutation, useUpdatePollValueMutation } from '../../../../Redux/Services/PollApi';
import { useGetUserDataQuery, useUserLoginMutation } from '../../../../Redux/Services/UserApi';

import { skipToken } from '@reduxjs/toolkit/dist/query';

const b = block(style);

const Poll = ({ id, name, question, options, number, poolCreator }: PollProp) => {

    // eslint-disable-next-line
    const [loginApi, { data: dataLogin, isSuccess }] = useUserLoginMutation({
        fixedCacheKey: "login"
    });

    const { data } = useGetUserDataQuery(isSuccess && Boolean(dataLogin?.rows[0]?.user_id) ? String(dataLogin?.rows[0]?.user_id) : skipToken)

    const [updatePollOptionValueApi] = useUpdatePollValueMutation();
    const [deletePoolApi] = useDeletePollMutation();

    const [isOpenEdit, setIsShownEdit] = useState<boolean>(false);

    let optionJsonParse: object = {};
    try {
        optionJsonParse = JSON.parse(options);
    } catch (error) {
        console.warn(error);
    };

    const optionJsonParseValuses = Object.values(optionJsonParse);

    const handlePollDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!((Number(data?.data[0]?.type_of_account) >= 2) || (poolCreator === dataLogin?.rows[0]?.user_id))) { return }
        const delData = { userId: String(poolCreator), id: id };
        deletePoolApi(delData);
    }

    const handleBtnFunction = (event: MouseEvent<HTMLButtonElement>, vote?: { id: number }) => {
        event.preventDefault();

        const putOption = { id: Number(id), optionId: Number(vote?.id) };

        updatePollOptionValueApi(putOption);
    };

    const handleEdit = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsShownEdit(!isOpenEdit);
    };

    const circleStyle = () => {

        let percentArr: number[] = [];
        let colorArr: string[] = [];
        let voteSum: number = 0;

        optionJsonParseValuses.forEach(({ vote }: VoteType) => {
            voteSum += vote;
        });

        optionJsonParseValuses.forEach(({ vote, color }: VoteType) => {
            percentArr.push(Number(((vote / voteSum) * 100).toFixed(2)));
            colorArr.push(String(color));
        });

        let sectionOfStyle = ``;
        let percent0 = 0;

        if (voteSum === 0) {
            const fin = Number((100 / Number(percentArr.length)).toFixed(2));
            percentArr.forEach((el, i) => (percentArr[i] = fin));
        };

        percentArr.forEach((el: number, i: number) => {
            let percent1 = Number((percent0 + el).toFixed(2));
            sectionOfStyle += `${colorArr[i]} ${percent0}% ${percent1}%, `;
            percent0 = percent1;
        });

        let style = `conic-gradient(${sectionOfStyle})`;
        style = style.replace(", )", ")");
        return style;
    };

    const votePercent = (sum: number, count: number) => {
        if (!isNaN(((count / sum) * 100))) {
            return ((count / sum) * 100).toFixed(2);
        } else {
            return 0;
        };
    };

    const buttonsForVote = () => {
        let count = 0;

        optionJsonParseValuses.forEach((c) => { count += c.vote });

        return optionJsonParseValuses.map((valueOfJsonData: OptionValueJson) => {
            return !Boolean(typeof (valueOfJsonData.name) === String(undefined)) && <button className={b('btn-vote')} key={valueOfJsonData.id} onClick={(event: MouseEvent<HTMLButtonElement>) => handleBtnFunction(event, valueOfJsonData)}>{valueOfJsonData.name}   {votePercent(count, valueOfJsonData.vote)}%{'  '}<span className={b('color-dot')} style={{ background: valueOfJsonData.color }}></span> </button>
        });
    };

    return (
        <div className={b()}>
            <div className={b('option')}>
                {((Number(data?.data[0]?.type_of_account) >= 2) || (poolCreator === dataLogin?.rows[0]?.user_id)) && <button onClick={handlePollDelete} className={b('option__btn-option', { delete: true })}>Delete</button>}
                {((Number(data?.data[0]?.type_of_account) >= 1) || (poolCreator === dataLogin?.rows[0]?.user_id)) && <button onClick={handleEdit} className={b('option__btn-option', { edit: true })}>Edit</button>}
            </div>
            < EditPoll key={id + 18} isOpen={isOpenEdit} edit={handleEdit} pro={{ id, name, question, number, options }} />
            <h2>{name}</h2>
            <h4>{question}</h4>
            <div className={b('circle-chart')} style={({ background: circleStyle() })}></div>
            <div className={b('btns')}>
                {buttonsForVote()}
            </div>
        </div>
    )
}

export default Poll;
