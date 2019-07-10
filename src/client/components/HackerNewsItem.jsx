import React, { Component } from 'React';
import { Row, Alert, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import HackerNewsComment from './HackerNewsComment.jsx';

// TODO: Use a pure functional component if no state changes...
export default class HackerNewsItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            commentDetails: undefined
        }
        this.loadComments = this.loadComments.bind(this);
        this.hackersNewsApiBaseUrl = 'https://hacker-news.firebaseio.com/v0';
    }

    loadComments() {
        // Make a call to get the next 30 news items using the appropriate item IDs
        debugger;

        // Set the state to be loading and show the spinner
        this.setState({
            loading: true
        })

        const commentDetailsCalls = [];
        for (let i = 0; i < this.props.itemDetails.kids.length; i++) {
            const currentCommentId = this.props.itemDetails.kids[i];
            console.info(`The currentCommentId about to have details requested is: ${currentCommentId}`);
            commentDetailsCalls.push(axios.get(`${this.hackersNewsApiBaseUrl}/item/${currentCommentId}.json`));
        }

        // debugger;
        axios.all(commentDetailsCalls).then(commentDetailsResponses => {
            // debugger;
            console.info(`The child comment details are: ${JSON.stringify(commentDetailsResponses)}`);

            // Iterate through responses, extracting out the data and assign these all to the state 
            const commentDetailsData = [];
            commentDetailsResponses.forEach(currentCommentDetailsResponse => {
                commentDetailsData.push(currentCommentDetailsResponse.data)
            });

            debugger;
            this.setState({
                commentDetails: commentDetailsData,
                loading: false
            });
        }).catch(error => {
            // debugger;
            console.error(`Something went wrong attempting to fetch the first 30 news item details: ${JSON.stringify(error)}`);

            // Set the error on the state and display it to the user in an alert
            this.setState({
                error: error.message
            });
        });
   }

    render() {
        console.info(`In hacker news item, the props are: ${JSON.stringify(this.props)}`);

        const momentTimePosted = moment.unix(this.props.itemDetails.time).format('DD/MM/YYYY HH:mm');
        console.info(`The momentTimePosted (in hours): ${momentTimePosted}`);

        return (
            <Row className="hacker-news-item__container">
                <h5 className="hacker-news-item__title"><a href={this.props.itemDetails.url}>{this.props.itemDetails.title}</a></h5>
                <div className="hacker-news-item__details">
                    <p className="hacker-news-item__description">{this.props.itemDetails.score} by {this.props.itemDetails.by} at {momentTimePosted}</p>
                    {
                        this.state.error ?
                            <Alert variant="danger">
                                {`Something went wrong loading comments: ${this.state.error}`}
                            </Alert>
                            : 
                            this.state.loading ? 
                                <Row className="hacker-news-item__spinner">
                                    <Spinner animation="border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </Spinner>
                                </Row>
                                :
                                this.state.commentDetails ?
                                    this.state.commentDetails.map(currentChildCommentDetails => {
                                        debugger;
                                        return (
                                            <HackerNewsComment commentDetails={currentChildCommentDetails} />
                                        )
                                    })
                                    :
                                    <Button size="sm" onClick={this.loadComments}>Show comments</Button>
                    }
                </div>
            </Row>
        );
    }
}
