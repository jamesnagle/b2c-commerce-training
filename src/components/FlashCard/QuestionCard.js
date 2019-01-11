import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { 
    Typography, 
    Card, 
    CardActionArea, 
    CardHeader, 
    CardContent 
} from '@material-ui/core';

const styles = theme => ({
    card: {
        maxWidth: 500,
        backfaceVisibility: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        transform: 'rotateY(0deg)',      
        "&:before": {
            content: '',
            display: 'block',
            paddingTop: '100%',
        }        
    },
    header: {
        background: theme.palette.primary.main,
    },
    title: {
        color: '#fff'
    }
});

const QuestionCard = ({ classes, currentSection, currentQuestion, currentOptions }) => (
    <Card className={classes.card}>
        <CardActionArea>
            <CardHeader title={<Typography variant="h6" className={classes.title}>{currentSection}</Typography>} disableTypography={true} className={classes.header} />
            <CardContent>
                <Typography variant="h3" gutterBottom>Q:</Typography>
                <Typography variant="body1" gutterBottom>{currentQuestion}</Typography>
                {currentOptions.map((v, i) => {
                    return (
                        <Typography key={i} variant="body2" gutterBottom>{v}</Typography>
                    )
                })}
            </CardContent>
        </CardActionArea>
    </Card>
);

export default withStyles(styles)(QuestionCard)