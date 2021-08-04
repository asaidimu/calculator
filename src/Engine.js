export const Engine = () => {
    const math = {
        evaluate: eval,
    }

    let [stack, expression] = [[], '']

    const events = new EventTarget()

    const emit = (name, expression, result = undefined, error = false) => {
        const event = new Event(name)
        events.dispatchEvent(
            Object.assign(event, { expression, result, error })
        )
    }

    const append = (value) => {
        expression = `${expression}${value}`
        stack.push(String(value).length)
        emit('append', expression)
    }

    const del = () => {
        if (stack.length === 0) return

        const limit = expression.length - stack.pop()
        expression = expression.substr(0, limit)
        emit('delete', expression)
    }

    const clear = (hasEvent = true) => {
        expression = ''
        stack = []
        if (hasEvent) emit('clear', expression)
    }

    const evaluate = () => {
        if (String(expression).length === 0) expression = 0

        try {
            const result = math.evaluate(expression)
            emit('evaluate', expression, result)
        } catch (error) {
            emit('evaluate', expression, 0, error)
        }
        clear(false)
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

export default Engine
