import React from 'react'
import ReactDOM from 'react-dom'

import { Calculator } from './Calculator'
import { Engine } from './Engine'

import { useState, useEffect } from 'react'

const engine = Engine()

const App = () => {
    const [expression, setExpression] = useState('')
    const [result, setResult] = useState(0)

    useEffect(() => {
        engine.on('append', ({ expression }) => {
            setExpression(expression)
            setResult(0)
        })

        engine.on('delete', ({ expression }) => setExpression(expression))

        engine.on('clear', () => {
            setExpression('')
            setResult(0)
        })

        engine.on('evaluate', ({ expression, result, error }) => {
            setResult(expression)

            if (error) {
                setExpression(error.name)
            } else {
                setExpression(result)
            }
        })
    }, [engine])

    return (
        <>
            <Calculator
                engine={engine}
                expression={expression}
                result={result}
            />
            <Calculator
                engine={engine}
                expression={expression}
                result={result}
                theme="light"
            />
        </>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)
