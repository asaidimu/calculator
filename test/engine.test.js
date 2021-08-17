import { assert } from 'chai'
import { Calculator } from '../src/Calculator.js'

describe('Calculator', function () {
    it('append() should append to expression', function () {
        const [calc, value] = [Calculator(), 1]

        calc.append(value)

        assert.equal(calc.expression, value)
    })

    it('append() should emit an append event', function (done) {
        const [calc, value] = [Calculator(), 1]

        calc.on('append', ({ expression }) => {
            assert.equal(expression, value)
            done()
        })

        calc.append(value)
    })

    it('delete() should delete from expression', function () {
        const [calc, value1, value2] = [Calculator(), 123, 456]

        calc.append(value1)
        calc.append(value2)
        calc.delete()
        assert.equal(calc.expression, value1)
    })

    it('delete() should emit a delete event', function (done) {
        const [calc, value] = [Calculator(), 1]

        calc.on('delete', ({ expression }) => {
            assert.equal(expression, '')
            done()
        })

        calc.append(value)
        calc.delete()
    })

    it('clear() should clear the expression', function () {
        const [calc, value] = [Calculator(), 123]

        calc.append(value)
        calc.clear()
        assert.equal(calc.expression, '')
    })

    it('clear() should emit a clear event', function (done) {
        const [calc, value] = [Calculator(), 1]

        calc.on('clear', ({ expression }) => {
            assert.equal(expression, '')
            done()
        })

        calc.append(value)
        calc.clear()
    })

    it('evaluate() should emit an evaluate event', function (done) {
        const [calc, value] = [Calculator(), 0]

        calc.append(value)

        calc.on('evaluate', ({ result }) => {
            assert.equal(result, value)
            done()
        })

        calc.evaluate()
    })

    it('evaluate() should evaluate the expression', function (done) {
        const [calc, value1, value2] = [Calculator(), 123, 456]

        calc.append(value1)
        calc.append(' + ')
        calc.append(value2)

        calc.on('evaluate', ({ result }) => {
            assert.equal(result, 123 + 456)
            done()
        })

        calc.evaluate()
    })
})
