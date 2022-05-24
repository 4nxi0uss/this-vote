import style from './Introduction.module.scss'
import block from 'bem-css-modules'

const b = block(style)

const Introduction = () => {
    return (
        <section className={b()}>
            <h2 className={b('title')}>What is for?</h2>
            <p className={b('paragraph')}>This will be use for voting, users will be assigned to specific group by the code. Admin will be add and moderate votings. </p>
            <br />
            <br />
            <p className={b('paragraph')}>App in development ...</p>
        </section>
    )
}
export default Introduction