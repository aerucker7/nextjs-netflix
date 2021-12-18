import Link from 'next/link'

import styles from './nav.module.scss'

import { getNavLinks } from '../lib/api'

const NavDesktop = () => {
    const navLinks = getNavLinks();

    return <nav className={styles.nav}>
        <ul>
            {navLinks.map((navLink, index) => {
                const { label, path } = navLink
                return <li>
                    <Link href={path}>
                        <a>
                            {label}
                        </a>
                    </Link>
                </li>
            })}
        </ul>
    </nav>
}

export default NavDesktop