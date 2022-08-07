import style from './NotFound.module.scss';
import block from 'bem-css-modules';

const b = block(style)

const NotFound = () => {
    return (
        <section className={b()}>
            <h1  >404 not found</h1>
            <p>chose diferent page </p>
        </section>
    )
}

export default NotFound;