import { useEffect, useState } from "react";

import type { ChangeEvent, MouseEvent } from "react";

import style from "./EditPoll.module.scss";
import block from 'bem-css-modules';

import Modal from '../../../Modal/Modal';

import { editArg, ObjectPushType } from "../../../../Types/Types";
import { useUpdatePollInfoMutation } from "../../../../Redux/Services/PollApi";

const b = block(style);

const EditPoll = ({ isOpen, edit, pro }: editArg) => {

    const [optionText, setOptionText] = useState<string>('');
    const [nameText, setNameText] = useState<string>(pro?.name);
    const [questionText, setQuestionText] = useState<string>(pro?.question);
    const [optionColor, setOptionColor] = useState<string>("#000000");
    const [random] = useState<number>(pro.number);
    const [optionsList, setOptionsList] = useState<Array<object>>([]);

    const [updatePoll] = useUpdatePollInfoMutation();

    useEffect(() => {
        let arr: Array<object> = [];
        const optionsParse = JSON.parse(pro.options);

        const arrOptinsValue: Array<object> = Object.values(optionsParse);

        arrOptinsValue.forEach((el: any) => arr = [...arr, { name: el.name, color: el.color, vote: el.vote }]);

        setOptionsList(arr);
    }, [pro.options]);

    const handleNameText = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setNameText(e.target.value);
    };

    const handleQuestionText = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setQuestionText(e.target.value);
    };

    const handleOptionText = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setOptionText((event.target.value));
    };

    const handleOptionColor = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setOptionColor(event.target.value);
    };

    const handleAddOption = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!Boolean(optionText === "") && optionsList?.length < 6) {
            setOptionsList([...optionsList, { name: optionText.trim(), color: optionColor, vote: 0 }]);
            setOptionText("");
        };
    };

    const handleDelOption = (event: MouseEvent<HTMLButtonElement>, index: number) => {
        event.preventDefault();
        setOptionsList((state: any) => state.filter((t: Array<object>, ind: number) => ind !== index));
    };

    let optionObject: ObjectPushType = {};
    optionsList?.forEach((option: object, index: number) => optionObject[`option${index}`] = { id: index, ...option });

    const handleUpdatePoll = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        updatePoll({ name: nameText.trim(), question: questionText, number: random, option: optionObject, id: pro.id });
        edit()
    };

    const optionShow = () => optionsList?.map((option: any, index: number) => <div className={b('option')} key={index}>{index + 1}.  {option?.name} <span className={b('option__color')} style={({ borderColor: `${option.color}`, backgroundColor: `${option.color}` })}></span> <button className={b('option__x-btn')} onClick={(e) => { handleDelOption(e, index) }}>X</button>
    </div>);

    return (
        <Modal isOpen={isOpen} >
            <div className={b()}>
                <form className={b('form')}>
                    <label>Name:</label>
                    <input type="text" className={b('form__input')} onChange={handleNameText} value={nameText} />
                    <label>Question:</label>
                    <input type="text" className={b('form__input')} onChange={handleQuestionText} value={questionText} />
                    <label >Number:</label>
                    <input type="number" readOnly className={b('form__number-poll')} disabled value={random} />
                    <label>Option to choose in poll (max 6):</label>
                    <input type="text" className={b('form__input')} value={optionText} onChange={handleOptionText} />
                    <input type="color" className={b('form__input-color')} onChange={handleOptionColor} value={optionColor} />
                    <button className={b('form__btn-plus')} onClick={handleAddOption}>+</button>
                    {optionShow()}
                </form>
                <div>
                    <button className={b('btn')} onClick={(e) => edit(e)}>Close</button>
                    <button className={b('btn')} onClick={handleUpdatePoll}>Submmit</button>
                </div>
            </div>
        </Modal>
    )
}

export default EditPoll;