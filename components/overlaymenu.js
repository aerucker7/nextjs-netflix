import BtnUI from './btnui'
import Link from 'next/link'
import Nav from './nav'
import styles from './overlay.module.scss'

import { getNavLinks } from '../lib/api'

const OverlayMenu = ({closeHandler}) => {
    const navLinks = getNavLinks()

    return <div className={styles.overlay}>
        <BtnUI icon="close" clickHandler={() => {
            closeHandler(false)
        }} /> 
        <Nav type="mobile" />
    </div>
}

export default OverlayMenu