import React, { Component } from 'React';
import axios from 'axios';
import { Container, Row, Alert, Spinner, Button } from 'react-bootstrap';
import HackerNewsItem from './HackerNewsItem.jsx';

export default class TopHackerNewsItems extends Component {
    constructor(props) {
        super(props);
        //todo: set state of startIndex = 0, maxIndex = 30, loading = true
        this.state = {
            loading: true,
            startItemIndex: 0,
            latestItemIndex: 30, // start by loading in 30 items per page.
            topNewsItemIds: [],
            currentTopNewsItems: [],
            error: undefined,
        }
        this.hackersNewsApiBaseUrl = 'https://hacker-news.firebaseio.com/v0';

        // bind functions to the correct context
        this.loadNextTopNewsItems = this.loadNextTopNewsItems.bind(this);
    }

    componentDidMount() {
        debugger;
        //make a call for 30 top hacker news items.
        axios.get(`${this.hackersNewsApiBaseUrl}/topstories.json?print=pretty`)
            .then(response => {
                debugger;
                const topNewsItemIds = response.data;

                console.info(`Successfully retrieved the top news item IDs: ${JSON.stringify(topNewsItemIds)}`);

                this.setState({
                    topNewsItemIds
                })

                this.loadNextTopNewsItems();
            })
            .catch(error => {
                debugger;
                console.error(`An error occurred attempting to get top news item IDs: ${error.message}`);

                this.setState({
                    error: error.message
                })
            })
    }

    loadNextTopNewsItems() {
        // Make a call to get the next 30 news items using the appropriate item IDs
        debugger;

        // Set the state to be loading and show the spinner
        this.setState({
            loading: true
        })

        const nextNewsItemIdDetailsCalls = [];
        for (let i = this.state.startItemIndex; i < this.state.latestItemIndex; i++) {
            const currentTopNewsItemId = this.state.topNewsItemIds[i];
            console.info(`The currentTopNewsItemId about to have details requested is: ${currentTopNewsItemId}`);
            nextNewsItemIdDetailsCalls.push(axios.get(`${this.hackersNewsApiBaseUrl}/item/${currentTopNewsItemId}.json`));
        }

        debugger;
        axios.all(nextNewsItemIdDetailsCalls).then(topNewsItemDetailsResponses => {
            debugger;
            console.info(`The next 30 news items details are: ${JSON.stringify(topNewsItemDetailsResponses)}`);

            // Iterate through responses, extracting out the data and assign these all to the state 
            const topNewsItemsDetailsData = [];
            topNewsItemDetailsResponses.forEach(topNewsItemDetailsResponse => {
                topNewsItemsDetailsData.push(topNewsItemDetailsResponse.data)
            });

            debugger;
            console.info(`The extracted top news item details are: ${JSON.stringify(topNewsItemsDetailsData)}`);
            this.setState({
                currentTopNewsItems: topNewsItemsDetailsData,
                loading: false,
                startItemIndex: this.state.startItemIndex + 30, // Set the state to load the next 30 items 
                latestItemIndex: this.state.latestItemIndex + 30,
            });
        }).catch(error => {
            debugger;
            console.error(`Something went wrong attempting to fetch the first 30 news item details: ${JSON.stringify(error)}`);

            // Set the error on the state and display it to the user in an alert
            this.setState({
                error: error.message
            });
        });
    }

    render() {
        //if loading, render a spinner
        //if not loading render the list of items
        //render a 'more' link to replace current items with the next 30 items. 
        return (
            <Container>
                {
                    this.state.error ?
                        <Alert variant="danger">
                            Something went wrong when attempting to load news items: {this.state.error}
                        </Alert> :
                        this.state.loading ?
                            <Row>
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            </Row>
                            :
                            this.state.currentTopNewsItems ?
                                this.state.currentTopNewsItems.map((currentTopNewsItem, index) => {
                                    return (
                                        <Row key={index}>
                                            <HackerNewsItem itemDetails={currentTopNewsItem}/>
                                        </Row>
                                    )
                                }) // TODO: render a component here to layout everything properly...
                                :
                                <Alert variant="danger">
                                    There are no top news items to display!
                                    </Alert>
                }
                {
                    this.state.loading ?
                        null
                        : 
                        <Row>
                            <Button onClick={this.loadNextTopNewsItems}>More top news items</Button>
                        </Row>
                }
            </Container>
        )
    }
}