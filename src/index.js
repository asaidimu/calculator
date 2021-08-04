import React from 'react'
import ReactDOM from 'react-dom'

import { Calculator } from './Calculator'

const engine = {
    clear() {},
    append() {},
    delete() {},
    evaluate() {},
}

ReactDOM.render(
    <React.StrictMode>
        <Calculator engine={engine} />
    </React.StrictMode>,
    document.getElementById('root')
)
