import HeaderButton from '@/ui/bottoms/headerBottom/HeaderButton'
import styles from './Header.module.css'


const Header = () => {


    return (

        <div className={styles.headerContainer}>
            <h1>MoviesDirectory</h1>
            <section>
                <HeaderButton incomingText='Add Movie' />
                <HeaderButton incomingText='LogIn' />
                <HeaderButton incomingText='LogOut' />
            </section>
        </div>

    )
}

export default Header