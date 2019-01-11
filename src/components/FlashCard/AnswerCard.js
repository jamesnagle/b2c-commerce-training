import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
    Typography,
    Card,
    CardContent
} from '@material-ui/core';

const styles = theme => ({
    card: {
        maxWidth: 500,
        textAlign: 'center',
        backfaceVisibility: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        padding: '3em',
        transform: 'rotateY(180deg)',
        zIndex: 2,
        "&:before": {
            content: '',
            display: 'block',
            paddingTop: '100%',
        }        
    }
});

const AnswerCard = ({ classes, currentAnswer }) => (
    <Card className={classes.card}>
        <CardContent>
            <Typography variant="h3" gutterBottom>A:</Typography>
            <Typography variant="body1" gutterBottom>{currentAnswer[0]}</Typography>
            {currentAnswer.map((v, i) => {
                if (i !== 0) {
                    return (<Typography key={i} variant="body2" gutterBottom>{v}</Typography>)
                } else {
                    return (<span key={i}></span>)
                }
            })}
        </CardContent>
    </Card>
);

export default withStyles(styles)(AnswerCard)