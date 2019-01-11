import React from 'react'
import { Grid } from '@material-ui/core';
import FlashCard from '../FlashCard';
import NextFlashCard from '../buttons/NextFlashCard';
import { withFirebase } from '../Firebase'

class Home extends React.Component {

    _initFirebase = false;

    _firebaseData = [];

    state = {
        loading: true,
        cards: [],
        currentIndex: 0,
        currentSection: '',
        currentQuestion: '',
        currentOptions: [],
        currentAnswer: []
    }
    componentDidMount() {
        this.firebaseInit();
    }

    componentDidUpdate() {
        this.firebaseInit();
        if (this.state.cards.length === 42 
            && this.state.loading === true) {

            this.setState({ loading: false });

            this.setCurrentCard(this.state.cards[this.state.currentIndex]);

            this.handleNextCardClick();
        }
    }

    firebaseInit = () => {
        if (this.props.firebase && !this._initFirebase) {

            this._initFirebase = true;

            this.getAnswers();
        }
    }
    getAnswers = () => {
        const _this = this;

        this.props.firebase.db.collection('answers')
            .get()
            .then(function (answersSnap) {
                answersSnap.forEach(function (doc) {
                    _this._firebaseData.push(doc.data())
                })
                _this.getQuestions()
            })
            .catch(function (error) {
                console.log('Error getting answers: ', error)
            })
    }
    getQuestions = () => {
        const _this = this;
        this._firebaseData.forEach(function(answer, i, obj) {
            answer.question_ref.get()
                .then(function(questionSnapshot) {
                    const question = questionSnapshot.data();
                    obj[i].question = question;
                    _this.getSectionTitle(question, function(title) {
                        obj[i].section = title;
                        _this.setState({cards: [..._this.state.cards, obj[i]]});
                    });
                })
                .catch(function(error) {
                    console.log('Error getting question: ', error);
                    obj[i].question = false;
                    _this.setState({ cards: [..._this.state.cards, obj[i]] });
                })
        })
    }
    getSectionTitle = (collection, callback) => {
        collection.section_ref.get()
            .then(function(sectionSnapshot) {
                const section = sectionSnapshot.data();
                callback(section.title)
            })
            .catch(function(error) {
                console.log('Error getting section: ', error);
                callback(false);
            })
    }
    handleNextCardClick = () => {
        let updatedIndex = this.state.currentIndex + 1;
        this.setState({currentIndex: updatedIndex});
        this.setCurrentCard(this.state.cards[this.state.currentIndex]);
    }
    setCurrentCard = (cardObj) => {
        this.setState({ currentSection: cardObj.section });
        this.setState({ currentQuestion: cardObj.question.text});
        this.setState({ currentOptions: (cardObj.question.options) ? cardObj.question.options : []});
        this.setState({ currentAnswer: cardObj.text});
    }
    render() {
        return (
            <>
                <Grid item xs={12}>
                    {!this.state.loading ? <FlashCard 
                                                currentSection={this.state.currentSection}
                                                currentQuestion={this.state.currentQuestion}
                                                currentOptions={this.state.currentOptions}
                                                currentAnswer={this.state.currentAnswer} /> : <div style={{textAlign: 'center'}}>Loading...</div>}
                </Grid>
                <Grid item xs={12} style={{textAlign: 'center', marginTop: '25px'}}>
                    <NextFlashCard handleButtonClick={this.handleNextCardClick} currentIndex={this.state.currentIndex} />
                </Grid>
            </>
        )
    }
}

export default withFirebase(Home)