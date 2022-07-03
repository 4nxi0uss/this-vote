import style from './Loader.module.scss'
import block from 'bem-css-modules'

const b = block(style)

const Loader = () => {
    return (
        <div className={b()}></div>
    )
}

export default Loader