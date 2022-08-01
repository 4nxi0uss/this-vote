import { useEffect } from 'react';

import style from './Introduction.module.scss'
import block from 'bem-css-modules'

import { useGetAllPollsQuery } from '../../../../Redux/Services/PollApi';

import Poll from '../../../Polls/subcomponent/Poll/Poll';
import Loader from '../../../Loader/Loader';

import { PollProp } from '../../../../Types/Types';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../Redux/Hooks/hooks';
import { incrementByAmountPage } from '../../../../Redux/Slice/PaginationSlice';
import Pagination from '../../../Pagination/Pagination';

const b = block(style)

const Introduction = () => {

    const page = useAppSelector((state) => state.pagination.initialPage)
    const dispach = useAppDispatch()

    let [searchParams, setSearchParams] = useSearchParams();

    const { data, error, isLoading, isError, isSuccess } = useGetAllPollsQuery({ page }, {
        pollingInterval: 5000,
    });

    const PollDisplay = () => !isLoading && data.data.map((el: PollProp) => <Poll key={el.number} id={el.id} name={el.name} number={el.number} question={el.question} options={el.options} btn={false} />)

    isError && console.warn(error)

    useEffect(() => {
        // setSearchParams({ page: String(page) })
        const chekingPage = Number(searchParams.get('page')) > 0 ? Number(searchParams.get('page')) : 1;

        dispach(incrementByAmountPage(chekingPage))
    }, [])

    return (
        <section className={b()}>
            {isSuccess
                ? PollDisplay()
                : <Loader />}
            {Pagination(data?.numberOfPages, isSuccess, page)}
        </section>
    )
}
export default Introduction