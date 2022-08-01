import { useEffect } from 'react'

import style from './Pagination.module.scss'
import block from 'bem-css-modules'

import { useSearchParams } from 'react-router-dom'

import { useAppDispatch } from '../../Redux/Hooks/hooks'
import { decrementPage, incrementByAmountPage, incrementPage } from '../../Redux/Slice/PaginationSlice'

const b = block(style);

const Pagination = (numberOfPages: any, pass?: boolean, page?: number,) => {
    // const Pagination = (increment: any, incrementByAmount: any, decrement: any, numberOfPages: any, pass?: boolean, page?: number,) => {

    const dispach = useAppDispatch()

    let [searchParams, setSearchParams] = useSearchParams();

    // console.log(searchParams.get('page'))

    const amountBtn = () => {
        let pageArr = [];
        for (let i = 1; i <= numberOfPages; i++) {
            pageArr.push(i);
        }
        return pageArr.map((el) => <button key={el} className={b(`chose-page`, { active: el === Number(searchParams.get('page')) })} onClick={() => { dispach(incrementByAmountPage(el)) }}>{el}</button>)
    }

    useEffect(() => {
        setSearchParams({ page: String(page) })
    }, [page])

    return pass && <div className={b()}>
        {page !== 1 && <button className={b('btn')} onClick={() => { dispach(decrementPage()) }}>Prev</button>}
        {amountBtn()}
        {page !== numberOfPages && <button className={b('btn')} onClick={() => { dispach(incrementPage()) }}>Next</button>}
    </div>
}

export default Pagination;