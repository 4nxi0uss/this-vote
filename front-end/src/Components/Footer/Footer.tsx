import { Link, useLocation } from 'react-router-dom';
import { useUserLoginMutation } from '../../Redux/Services/UserApi';

import style from './Footer.module.scss';
import block from 'bem-css-modules';

const b = block(style);

const Footer = () => {
    const location = useLocation();
    const [, { data: dataLogin, isLoading, isSuccess }] = useUserLoginMutation({
        fixedCacheKey: 'login',
    });

    return (
        <div className={b()}>
            <div className={b('Menu')}>
                <p className={b('Menu-Title')}>Menu</p>
                <nav className={b('Menu-Nav')}>
                    <Link
                        to="/"
                        className={b('Menu-Nav-Link', {
                            mark: location.pathname === '/',
                        })}
                    >
                        Home
                    </Link>
                    {!isLoading && dataLogin?.login && (
                        <Link
                            to="/account"
                            className={b('Menu-Nav-Link', {
                                mark: location.pathname === '/account',
                            })}
                        >
                            Account
                        </Link>
                    )}
                    {!isLoading && dataLogin?.login && (
                        <Link
                            to="/polls"
                            className={b('Menu-Nav-Link', {
                                mark: location.pathname === '/polls',
                            })}
                        >
                            Polls
                        </Link>
                    )}
                    {!isSuccess && !dataLogin?.login && (
                        <Link
                            to="/login"
                            className={b('Menu-Nav-Link', {
                                mark: location.pathname === '/login',
                            })}
                        >
                            Login/Registry
                        </Link>
                    )}
                </nav>
            </div>
            <p className={b('Creator')}>Created by Artur Żaczek</p>
        </div>
    );
};

export default Footer;
