import Link from 'next/link'
import Head from 'next/head'

import styles from './styles.module.css'

import useRedirectFromAuth from '../hooks/useRedirectFromAuth'

const currentFeatures = [
  'Mobile ready',
  'Character create, edit and delete.',
  'Character stats - abilities, modifiers, level, saving throws, hit, armor class, hit points...',
  'Character skills - proficiency in skills is supported.',
  'Character spells - preparing spells, spell slots and quick spell lookup. Almost all spellcasting classes supported.',
  'Spells archive (60% finished).',
]

const roadmapFeatures = [
  'Inventory',
  'Feats archive',
  'Party mode - connecting the characters together in a party',
  'DM Tools',
  'Laptop ready',
  'Better design',
  'New name',
  'Logo',
  'Dark mode',
  'Offline support',
]

const Home = () => {
  useRedirectFromAuth()

  return (
    <>
      <Head>
        <meta
          name="description"
          content="A dungeons and dragons note taking app"
        />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="keywords" content="dungeons and dragons character sheet" />
        <title>Home</title>
      </Head>
      <div className={styles.container}>
        <header className={styles.header}>
          <img className={styles.logo} src="/images/logo.png" alt="logo" />
        </header>
        <div className={styles.contentContainer}>
          <h1 className={styles.title}>
            Welcome to <br />{' '}
            <span className={styles.titleMain}>DnD Armory</span>{' '}
          </h1>
          <p className={styles.paragraph}>
            Helps you manage and save your 5th edition characters. <br />
            <span className="text-xs">
              *in case you ever forget your character sheet at home.
            </span>
          </p>

          <section className={styles.section}>
            <Link href="/login">
              <a className={styles.loginLink}>Log in</a>
            </Link>
            <span className="mx-2">or</span>
            <Link href="/signup">
              <a className={styles.signupLink}>Create account</a>
            </Link>
          </section>
          <section className={styles.section}>
            <h2 className={styles.title2}>About</h2>
            <p className={styles.aboutParagraph}>
              DnD Armory (working title) is a pet project with the aim to make
              DnD sessions easier and let you focus more on the roleplay rather
              then sifting through your papers. Its aim is to replace paper and
              act as one. I have many features planned for it, and it's still in
              it's baby stage.
            </p>
          </section>
          <section className={styles.section}>
            <h2 className={styles.title2}>How to use</h2>
            <p className={styles.aboutParagraph}>
              DnD Armory works as a <strong>Progressive Web App</strong>, which
              means, no download from the app store, just open the link and pick{' '}
              <strong>Add to Home Screen</strong> option and it will be
              installed on your phone.
            </p>
            <p className={styles.aboutParagraph}>
              It takes almost no space and doesn't drain battery more then one
              webpage. It <strong>requires</strong> an internet connection in
              order to work with the server to save your character and stats so
              they are available at any point to you. At some point I plan to
              make it work without internet as well.
            </p>
            <p className={styles.aboutParagraph}>
              Account creation is required, but atm you can use any email or
              password (it won't be checked or validated). Character creation is
              very easy, requiring only 4 inputs, and rest you can edit on the
              fly.
            </p>
          </section>
          <section className={styles.section}>
            <h2 className={styles.title2}>Current Features</h2>
            <ul className={styles.list}>
              {currentFeatures.map((feature) => {
                return (
                  <li className={styles.listItem} key={feature}>
                    - {feature}
                  </li>
                )
              })}
            </ul>
          </section>
          <section className={styles.section}>
            <h2 className={styles.title2}>Roadmap</h2>
            <ul className={styles.list}>
              {roadmapFeatures.map((feature) => {
                return (
                  <li className={styles.listItem} key={feature}>
                    - {feature}
                  </li>
                )
              })}
            </ul>
          </section>
        </div>
      </div>
    </>
  )
}

export { Home as default }
