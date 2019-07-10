import React, { Component } from 'React';
import { Row } from 'react-bootstrap';
import moment from 'moment';

// TODO: Use a pure functional component if no state changes...
export default class HackerNewsItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.info(`In hacker news item, the props are: ${JSON.stringify(this.props)}`);

        const momentTimePosted = moment.unix(this.props.itemDetails.time).format('DD/MM/YYYY HH:mm');
        console.info(`The momentTimePosted (in hours): ${momentTimePosted}`);

        return (
            <Row className="hacker-news-item__container">
                <h5 className="hacker-news-item__title"><a href={this.props.itemDetails.url}>{this.props.itemDetails.title}</a></h5>
                <p className="hacker-news-item__description">{this.props.itemDetails.score} by {this.props.itemDetails.by} at {momentTimePosted}</p>
            </Row>
        );
    }
}
