import React, { Component } from 'React';
import { Row } from 'react-bootstrap';
import moment from 'moment';

// TODO: Use a pure functional component if no state changes...
export default class HackerNewsItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        debugger;
        console.info(`In hacker news item, the props are: ${JSON.stringify(this.props)}`);

        //by: "jamesbowman"
        // descendants: 14
        // id: 20397044
        // kids: Array(7) [ 20397310, 20397590, 20397347, … ]
        // score:66
        // time: 1562709157
        // title: "I have found an excellent programmer named Steve Wozniac"
        // type: "story"
        // url: "https://tinyletter.com/jamesbowman/letters/i-have-found-an-excellent-programmer-named-steve-wozniac"

        // Calculate 'hours ago' from now...
        // const momentTimePosted = moment.unix(this.props.itemDetails.time).format('HH');
        // console.info(`The momentTimePosted (in hours): ${momentTimePosted}`);
        // debugger;
        // const momentFromNow = momentTimePosted.fromNow();
        // debugger;

        return (
            <Row>
                <h1>{this.props.itemDetails.title}</h1>
                <h2>{this.props.itemDetails.score} by {this.props.itemDetails.by} </h2>
            </Row>
        );
    }
}
