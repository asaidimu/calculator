export const Screen = ({ name, value }) => {
    const styles = `calculator__screen__${name}`
    return <span className={styles}>{value}</span>
}

export const Button = ({ value, onClick, isPrimary=false, isSecondary=false, isExtended=false}) => {
    let styles = 'calculator__controls__button'

    if(isExtended)
        styles = `${styles} calculator__controls__button--is-extended`

    if(isPrimary) {
        styles = `${styles} calculator__controls__button--is-primary`
    } else if(isSecondary) {
        styles = `${styles} calculator__controls__button--is-secondary`
    }

    return ( <button className={ styles } onClick={onClick}> {value} </button>)
}

export const Calculator = ({ engine, expression, result }) => {
    return (
        <div className="calculator">
                <div className="calculator__screen">
                    <Screen name="primary" value={expression} />
                    <Screen name="secondary" value={result} />
                </div>
                <div className="calculator__controls">
                        <Button
                            onClick={() => engine.clear()}
                            isPrimary= {true}
                            value="AC"
                        />
                        <Button
                            onClick={() => engine.delete()}
                            isPrimary= {true}
                            value="DEL"
                        />
                        <Button
                            onClick={() => engine.append('%')}
                            isPrimary= {true}
                            value=" % "
                        />
                        <Button
                            onClick={() => engine.append('/')}
                            isSecondary= {true}
                            styles="pink-text"
                            value=" / "
                        />
                        <Button onClick={() => engine.append('7')} value="7" />
                        <Button onClick={() => engine.append('8')} value="8" />
                        <Button onClick={() => engine.append('9')} value="9" />
                        <Button
                            onClick={() => engine.append(' * ')}
                            isSecondary= {true}
                            value="*"
                        />
                        <Button onClick={() => engine.append('4')} value="4" />
                        <Button onClick={() => engine.append('5')} value="5" />
                        <Button onClick={() => engine.append('6')} value="6" />
                        <Button
                            onClick={() => engine.append(' - ')}
                            isSecondary= {true}
                            value="-"
                        />
                        <Button onClick={() => engine.append('1')} value="1" />
                        <Button onClick={() => engine.append('2')} value="2" />
                        <Button onClick={() => engine.append('3')} value="3" />
                        <Button
                            onClick={() => engine.append(' + ')}
                            isSecondary= {true}
                            value="+"
                        />
                        <Button
                            onClick={() => engine.append('0')}
                            isExtended = { true }
                            value="0"
                        />
                        <Button onClick={() => engine.append('.')} value="." />
                        <Button
                            onClick={() => engine.evaluate()}
                            isSecondary= {true}
                            value="="
                        />
                </div>
        </div>
    )
}
