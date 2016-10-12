import cDev from './dev'
import cProd from './prod'

export default process.env.NODE_ENV == 'production' ? cProd : cDev
