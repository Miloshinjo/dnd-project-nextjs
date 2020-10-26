// we need fs to write folders and files
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')

// parse component name from the argv array
const componentName = process.argv[2].split('--')[1]

// set content for the files
// (can by anything, this is just how I prefer to set it)
const indexContent = `import styles from './styles.module.css';

type Props = {};

const ${componentName}: React.FC<Props> = () => {
  return <div className={styles.container}>${componentName}</div>;
};

export { ${componentName} as default };
`

const styledContent = `.container{}`

// create a folder if it doesn't exist (which it shouldn't)
if (!fs.existsSync(`./${componentName}`)) {
  fs.mkdirSync(componentName)
}

// create out files
fs.writeFileSync(`${componentName}/index.tsx`, indexContent)
fs.writeFileSync(`${componentName}/styled.ts`, styledContent)
