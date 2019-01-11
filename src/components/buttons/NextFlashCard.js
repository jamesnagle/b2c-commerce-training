import React from 'react'
import Button from '@material-ui/core/Button';

const NextFlashCardButton = ({ handleButtonClick, currentIndex }) => (
    <Button variant="contained" color="primary" onClick={handleButtonClick} disabled={(currentIndex >= 42) ? true : false}>NEXT QUESTION</Button>
)

export default NextFlashCardButton;

