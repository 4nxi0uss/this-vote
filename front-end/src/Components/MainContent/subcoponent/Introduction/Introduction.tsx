import style from './Introduction.module.scss'
import block from 'bem-css-modules'

import { useGetAllPollsQuery } from '../../../../Redux/Services/PollApi';
import Poll from '../../../Polls/subcomponent/Poll/Poll';

const b = block(style)

const Introduction = () => {

    const { data, error, isLoading, isError, isSuccess } = useGetAllPollsQuery();

    const PollDisplay = () => !isLoading && data.data.map((el: any) => <Poll key={el.number} id={el.id} name={el.name} question={el.question} options={el.options} btn={false} />)

    isError && console.warn(error)

    return (
        <section className={b()}>
            {isSuccess
                ? PollDisplay()
                : (
                    <>
                        <h2 className={b('title')}>What is for?</h2>
                        <p className={b('paragraph')}>This will be use for voting, users will be assigned to specific group by the code. Admin will be add and moderate votings. </p>
                        <br />
                        <br />
                        <p className={b('paragraph')}>App in development ...</p>
                    </>
                )}
        </section>
    )
}
export default Introduction