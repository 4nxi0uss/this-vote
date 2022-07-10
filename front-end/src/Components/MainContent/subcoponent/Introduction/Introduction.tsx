import style from './Introduction.module.scss'
import block from 'bem-css-modules'

import { useGetAllPollsQuery } from '../../../../Redux/Services/PollApi';

import Poll from '../../../Polls/subcomponent/Poll/Poll';
import Loader from '../../../Loader/Loader';
import { PollProp } from '../../../../Types/Types';

const b = block(style)

const Introduction = () => {

    const { data, error, isLoading, isError, isSuccess } = useGetAllPollsQuery(undefined, {
        pollingInterval: 5000,
    });

    const PollDisplay = () => !isLoading && data.data.map((el: PollProp) => <Poll key={el.number} id={el.id} name={el.name} number={el.number} question={el.question} options={el.options} btn={false} />)

    isError && console.warn(error)

    return (
        <section className={b()}>
            {isSuccess
                ? PollDisplay()
                : <Loader />}
        </section>
    )
}
export default Introduction