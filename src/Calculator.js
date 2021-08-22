export const Calculator = () => {
    let [lengthStack, expression] = [[], '']

    const events = new EventTarget()

    const emit = (name, expression, result = undefined, error = false) => {
        const event = new Event(name)
        events.dispatchEvent(
            Object.assign(event, { expression, result, error })
        )
    }

    const reset = () => {
        expression = ''
        lengthStack = []
    }

    const clear = () => {
        reset()
        emit('clear', expression)
    }

    const append = (value) => {
        expression = `${expression}${value}`
        lengthStack.push(String(value).length)
        emit('append', expression)
    }

    const del = () => {
        if (lengthStack.length === 0) return

        const limit = expression.length - lengthStack.pop()
        expression = expression.substr(0, limit)
        emit('delete', expression)
    }

    const evaluate = () => {
        if (String(expression).length === 0) expression = 0

        try {
            // eslint-disable-next-line
            const result = eval(expression)
            emit('evaluate', expression, result)
        } catch (error) {
            emit('evaluate', expression, 0, error)
        } finally {
            reset()
        }
    }

    return {
        append,
        clear,
        evaluate,
        delete: del,
        on(event, action) {
            events.addEventListener(event, action)
        },
        get expression() {
            return expression
        },
    }
}

export default Calculator
