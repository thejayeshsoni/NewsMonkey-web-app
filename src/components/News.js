import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 6,
        category: "general"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        console.log("Constructor form NEWS component");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(60);
        console.log(parsedData);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false });
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();
    }

    handlePreviousClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    };

    handleNextClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    };

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData);
        this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults });
    }

    render() {
        return (
            <>
                <h1 className="text-center" style={{ margin: "30px", marginTop: "90px" }}><strong>NewsMonkey TOP {this.capitalizeFirstLetter(this.props.category)} headlines</strong></h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll dataLength={this.state.articles.length} next={this.fetchMoreData} hasMore={this.state.articles.length !== this.state.totalResults} loader={<Spinner />}>
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((elements) => {
                                return <div className="col-md-4 my-3" key={elements.url}>
                                    <NewsItem title={elements.title} description={elements.description} imageUrl={elements.urlToImage} newsUrl={elements.url} author={elements.author} date={elements.publishedAt} source={elements.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}

export default News
