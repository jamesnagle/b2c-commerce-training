import React from 'react'
import { withStyles } from '@material-ui/core/styles'
/*import {
    Typography
} from '@material-ui/core';*/
import QuestionCard from './QuestionCard';
import AnswerCard from './AnswerCard';

const styles = theme => ({
    flipper: {
        margin: '60px auto 0 auto',
        maxWidth: 500,
        position: 'relative',
        transform: 'rotateY(0deg)',
        transition: '0.6s, margin 0.5s ease',
        transformStyle: 'preserve-3d',
        height: 400,
        "&:before": {
            content: '',
            display: 'block',
            paddingTop: '100%'
        }
    },
    flipped: {
        margin: '60px auto 0 auto',
        maxWidth: 500,
        position: 'relative',
        transform: 'rotateY(180deg)',
        transition: '0.6s, margin 0.5s ease',
        transformStyle: 'preserve-3d',
        height: 400,
        "&:before": {
            content: '',
            display: 'block',
            paddingTop: '100%'
        }
    },
});

class FlashCard extends React.Component {
    state = {
        flipped: false,
        margin: '60px auto 0 auto',
        currentSection: this.props.currentSection,
        currentQuestion: this.props.currentQuestion,
        currentOptions: this.props.currentOptions,
        currentAnswer: this.props.currentAnswer
    }
    handleClick = () => {
        (this.state.flipped) ? this.setState({ flipped: false }) : this.setState({ flipped: true });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.currentQuestion !== this.state.currentQuestion ) {
            const _this = this
            if (_this.state.flipped) {
                _this.setState({ flipped: false })
            }
            this.setState({ margin: '60px -500px 0 auto' });
            setTimeout(function() {
                _this.setState({ currentSection: nextProps.currentSection });
                _this.setState({ currentQuestion: nextProps.currentQuestion });
                _this.setState({ currentOptions: nextProps.currentOptions });
                _this.setState({ currentAnswer: nextProps.currentAnswer });
                _this.setState({ margin: '60px auto 0 auto' });
            }, 500)
        }
    }
    render() {

        const { classes } = this.props

        return (
            <div onClick={this.handleClick}>
                <div className={(this.state.flipped) ? classes.flipped : classes.flipper} style={{margin: this.state.margin}}>
                    <QuestionCard 
                        currentSection={this.state.currentSection}
                        currentQuestion={this.state.currentQuestion}
                        currentOptions={this.state.currentOptions} />
                    <AnswerCard currentAnswer={this.state.currentAnswer} />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(FlashCard)