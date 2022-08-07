import { useEffect } from 'react';

import style from './Introduction.module.scss'
import block from 'bem-css-modules'

import { useGetAllPollsQuery } from '../../../../Redux/Services/PollApi';

import Poll from '../../../Polls/subcomponent/Poll/Poll';
import Loader from '../../../Loader/Loader';

import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../Redux/Hooks/hooks';
import { incrementByAmountPage } from '../../../../Redux/Slice/PaginationSlice';
import Pagination from '../../../Pagination/Pagination';
import { PollType } from '../../../../Types/Types';

const b = block(style)

const Introduction = () => {

    const page = useAppSelector((state) => state.pagination.initialPage)
    const dispach = useAppDispatch()

    let [searchParams] = useSearchParams();

    const { data, error, isError, isSuccess } = useGetAllPollsQuery({ page }, {
        pollingInterval: 5000,
    });

    const PollDisplay = () => isSuccess && data?.data.map((el: PollType) => <Poll key={el.number} id={el.id} name={el.name} number={el.number} question={el.question} options={el.options} poolCreator={el.user_id} />)

    isError && console.warn(error)

    useEffect(() => {
        const chekingPage = Number(searchParams.get('page')) > 0 ? Number(searchParams.get('page')) : 1;

        dispach(incrementByAmountPage(chekingPage))
        // eslint-disable-next-line
    }, [])

    return (
        <section className={b()}>
            {isSuccess
                ? PollDisplay()
                : <Loader />}
            {Pagination(Number(data?.numberOfPages), isSuccess, page)}
        </section>
    )
}

export default Introduction