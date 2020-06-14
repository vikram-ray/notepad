import React, {useState} from 'react';
import Card from 'react-bootstrap/Card'
import PrintJs from 'print-js';
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import classes from './Notepad.module.css';

export default function(){

    const [text, setText] = useState(localStorage.getItem('notepad'));
    const [saving, setsaving] = useState(false);
    const [showSaving, setShowSaving] = useState(false);

    const handleChange = e => {
        setText(e.target.value);
        setsaving(true);
        setShowSaving(true);
        setTimeout(()=>{
            setsaving(false);
        },500)
        localStorage.setItem('notepad', e.target.value);
    }

    const downloadAsTxt = (filename, text) => {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }

    let savingText = null;
    if (showSaving) {
        if(saving) {
            savingText = <span>saving..</span>;
        }else{
            savingText = <span>saved</span>;
        }
    }

    let buttons = (
        <Row >
            <Col>
            <div className={classes.button_row}>
                {savingText}
            </div>
            </Col>
            <Col>
            <ButtonGroup className={classes.button_row}>
                <Button size="sm" onClick={()=>PrintJs('notepad', 'html')} variant="secondary">Print</Button>
                <Button size="sm" onClick={()=>downloadAsTxt('notepad', text)} variant="secondary">Download</Button>
            </ButtonGroup>                
            </Col>
        </Row>
    )

    return (
        <div style={{height: `${window.innerHeight - 40}px`}}>
            <Card.Header>
                {buttons}
            </Card.Header>
            <Card.Body className={classes.full} >
                <textarea id="notepad" className={[classes.notepad, classes.full].join(' ')} value={text} onChange={handleChange}></textarea>
            </Card.Body>
        </div>
    )
}