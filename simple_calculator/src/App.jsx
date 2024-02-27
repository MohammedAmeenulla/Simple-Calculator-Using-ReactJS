import React, { useState, useEffect } from 'react';
import './Global.css';

const App = () => {
    const [previousOperand, setPreviousOperand] = useState('');
    const [currentOperand, setCurrentOperand] = useState('');
    const [operation, setOperation] = useState('');

    useEffect(() => {
        const handleKeyDown = (event) => {
            const { key } = event;
            if (!isNaN(key) || key === '.' || key === '+' || key === '-' || key === '*' || key === '/') {
                event.preventDefault();
                if (!isNaN(key) || key === '.') {
                    handleNumberClick(key);
                } else if (key === '+' || key === '-' || key === '*' || key === '/') {
                    handleOperationClick(key);
                }
            } else if (key === 'Enter') {
                handleEqualsClick();
            } else if (key === 'Backspace') {
                handleOperationClick('DEL');
            } else if (key === 'Escape') {
                handleClearClick();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    });

    const handleNumberClick = (value) => {
        setCurrentOperand(currentOperand + value);
    };

    const handleOperationClick = (value) => {
        if (value === 'DEL') {
            setCurrentOperand(currentOperand.slice(0, -1));
        } else {
            setPreviousOperand(previousOperand + ' ' + currentOperand + ' ' + value);
            setCurrentOperand('');
            setOperation(value);
        }
    };

    const handleEqualsClick = () => {
        let result;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }
        setCurrentOperand(result.toString());
        setPreviousOperand('');
        setOperation('');
    };

    const handleClearClick = () => {
        setPreviousOperand('');
        setCurrentOperand('');
        setOperation('');
    };

    return (
        <div className='calculator'>
        <h1>Simple Calculator</h1>
            <div className='output'>
                <div className='previous-operand'>{previousOperand}</div>
                <div className='current-operand'>{currentOperand}</div>
            </div>
            <div className='buttons'>
            <button id='ac' className='span-two' onClick={handleClearClick}>AC</button>
            <button onClick={() => handleOperationClick('DEL')}>DEL</button>
            <button onClick={() => handleOperationClick('/')}>/</button>
            <button onClick={() => handleNumberClick('1')}>1</button>
            <button onClick={() => handleNumberClick('2')}>2</button>
            <button onClick={() => handleNumberClick('3')}>3</button>
            <button onClick={() => handleOperationClick('*')}>*</button>
            <button onClick={() => handleNumberClick('4')}>4</button>
            <button onClick={() => handleNumberClick('5')}>5</button>
            <button onClick={() => handleNumberClick('6')}>6</button>
            <button onClick={() => handleOperationClick('+')}>+</button>
            <button onClick={() => handleNumberClick('7')}>7</button>
            <button onClick={() => handleNumberClick('8')}>8</button>
            <button onClick={() => handleNumberClick('9')}>9</button>
            <button onClick={() => handleOperationClick('-')}>-</button>
            <button onClick={() => handleNumberClick('.')}>.</button>
            <button onClick={() => handleNumberClick('0')}>0</button>
            <button className='span-two' id='equals' onClick={handleEqualsClick}>=</button>
            </div>
        </div>
    );
};

export default App;
