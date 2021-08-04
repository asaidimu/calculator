import { assert } from 'chai'
import { Engine } from '../src/Engine.js'

describe('Calculator Engine', function () {
    it('append() should append to expression', function () {
        const [engine, value] = [Engine(), 1]

        engine.append(value)

        assert.equal(engine.expression, value)
    })

    it('append() should emit an append event', function (done) {
        const [engine, value] = [Engine(), 1]

        engine.on('append', ({ expression }) => {
            assert.equal(expression, value)
            done()
        })

        engine.append(value)
    })

    it('delete() should delete from expression', function () {
        const [engine, value1, value2] = [Engine(), 123, 456]

        engine.append(value1)
        engine.append(value2)
        engine.delete()
        assert.equal(engine.expression, value1)
    })

    it('delete() should emit a delete event', function (done) {
        const [engine, value] = [Engine(), 1]

        engine.on('delete', ({ expression }) => {
            assert.equal(expression, '')
            done()
        })

        engine.append(value)
        engine.delete()
    })

    it('clear() should clear the expression', function () {
        const [engine, value] = [Engine(), 123]

        engine.append(value)
        engine.clear()
        assert.equal(engine.expression, '')
    })

    it('clear() should emit a clear event', function (done) {
        const [engine, value] = [Engine(), 1]

        engine.on('clear', ({ expression }) => {
            assert.equal(expression, '')
            done()
        })

        engine.append(value)
        engine.clear()
    })

    it('evaluate() should emit an evaluate event', function (done) {
        const [engine, value] = [Engine(), 0]

        engine.append(value)

        engine.on('evaluate', ({ result }) => {
            assert.equal(result, value)
            done()
        })

        engine.evaluate()
    })

    it('evaluate() should evaluate the expression', function (done) {
        const [engine, value1, value2] = [Engine(), 123, 456]

        engine.append(value1)
        engine.append(' + ')
        engine.append(value2)

        engine.on('evaluate', ({ result }) => {
            assert.equal(result, 123 + 456)
            done()
        })

        engine.evaluate()
    })
})
