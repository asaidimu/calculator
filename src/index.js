import React from 'react'
import ReactDOM from 'react-dom'

import { CalculatorUi } from './Ui'
import { Calculator } from './Calculator'

import { useState, useEffect } from 'react'

const calc = Calculator()

const App = () => {
    const [expression, setExpression] = useState('')
    const [result, setResult] = useState(0)

    useEffect(() => {
        calc.on('append', ({ expression }) => {
            setExpression(expression)
            setResult(0)
        })

        calc.on('delete', ({ expression }) => setExpression(expression))

        calc.on('clear', () => {
            setExpression('')
            setResult(0)
        })

        calc.on('evaluate', ({ expression, result, error }) => {
            setResult(expression)

            if (error) {
                setExpression(error.name)
            } else {
                setExpression(result)
            }
        })
    }, [])

    return ( <CalculatorUi
                calc={calc}
                expression={expression}
                result={result}
            />
    )
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)
