import styles from './HeaderButton.module.css'

type Props = {
  incomingText: string
}

const HeaderButton = ({ incomingText }: Props) => {



  return (

    <a className={styles.headerButton}>{incomingText}</a>

  )
}

export default HeaderButton