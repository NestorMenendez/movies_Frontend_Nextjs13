import styles from './HeaderButton.module.css'

type Props = {
  incomingText: string
}

const HeaderButton = ({ incomingText }: Props) => {



  return (

    <button className={styles.headerButton}>{incomingText}</button>

  )
}

export default HeaderButton