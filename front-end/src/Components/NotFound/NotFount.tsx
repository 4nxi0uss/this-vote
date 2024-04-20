import style from './NotFound.module.scss';
import block from 'bem-css-modules';

const b = block(style)

const NotFound = () => {
    return (
        <div className={b()}>
            <h1  >404 not found</h1>
            <p>chose diferent page </p>
        </div>
    )
}

export default NotFound;
