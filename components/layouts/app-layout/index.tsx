import Header from '../../layout/header'
import Head from 'next/head'

import ModalProvider from '../../../context/modal'

import styles from './styles.module.css'

type Props = {
  title: string
}

const Layout: React.FC<Props> = ({ children, title }) => {
  return (
    <ModalProvider>
      <Head>
        <title>{title}</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
      </Head>

      <div className={styles.container}>
        <Header title={title} />
        <main className="flex-1 mt-12">{children}</main>
      </div>
    </ModalProvider>
  )
}

export { Layout as default }
