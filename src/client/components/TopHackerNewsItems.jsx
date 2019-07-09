import React, { Component } from 'React';
import axios from 'axios';
import { Container, Row, Alert, Spinner } from 'react-bootstrap';

export default class TopHackerNewsItems extends Component {
    constructor(props) {
        super(props);
        //todo: set state of startIndex = 0, maxIndex = 30, loading = true
        this.state = {
            loading: true,
            startItemIndex: 0,
            latestItemIndex: 30, // start by loading in 30 items per page.
            topNewsItemIds: [],
            currentTopNewsItems: []
        }
        this.hackersNewsApiBaseUrl = 'https://hacker-news.firebaseio.com/v0';
    }

    componentDidMount() {
        debugger;
        //make a call for 30 top hacker news items.
        axios.get(`${this.hackersNewsApiBaseUrl}/topstories.json?print=pretty`)
            .then(response => {
                debugger;
                const topNewsItemIds = response.data;

                console.info(`Successfully retrieved the top news item IDs: ${JSON.stringify(topNewsItemIds)}`);

                // Set this on the state asynchronously.
                this.setState({
                    topNewsItemIds
                })

                // Now go and retrieve the first 30 news items to display
                // Create an array of promises then use promise.all on them
                const newsItemDetailsCalls = [];

                for (let i = 0; i < 30; i++) {
                    const currentTopNewsItemId = topNewsItemIds[i];
                    newsItemDetailsCalls.push(axios.get(`${this.hackersNewsApiBaseUrl}/item/${currentTopNewsItemId}.json`))
                }

                // Now await all of the responses, allowing them to run concurrently
                axios.all(newsItemDetailsCalls).then(topNewsItemDetailsResponses => {
                    debugger;
                    console.info(`The first 30 news items details are: ${JSON.stringify(topNewsItemDetailsResponses)}`);

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
                    });
                }).catch(error => {
                    debugger;
                    console.error(`Somethign went wrong attempting to fetch the first 30 news item details: ${JSON.stringify(error)}`);
                });
            })
            .catch(error => {
                debugger;
                console.error(`An error occurred attempting to get top news item IDs: ${error.message}`);
            })
    }

    render() {
        //if loading, render a spinner
        //if not loading render the list of items
        //render a 'more' link to replace current items with the next 30 items. 
        return (
            <Container>
                {
                    this.state.loading ?
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                        :
                        this.state.currentTopNewsItems ?
                            this.state.currentTopNewsItems.map((currentTopNewsItem, index) => {
                                return (
                                    <Row key ={index}>
                                        {
                                            JSON.stringify(currentTopNewsItem)
                                        }
                                    </Row>
                                )
                            }) // TODO: render a component here to layout everything properly...
                            :
                            <Alert variant="danger">
                                There are no top news items to display!
                            </Alert>
                }
            </Container>
        )
    }
}