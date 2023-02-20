import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {
    static defaultprops = {
        country: "in",
        pageSize: 6,
        category: "general",

    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }


    constructor(props) {
        super(props);
        console.log("this is constructor called");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${(this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1))} - SamaChaar`;
    }

    async updaetNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&&apikey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.props.setProgress(30);
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        this.props.setProgress(100);
    }

    async componentDidMount() {

        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&&apikey=173c153efcdd405da20b13a0bdd865a6&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading : true})
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading : false })
        this.updaetNews();
    }

    handlePrevClick = async () => {
        console.log("previous");

        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&&apikey=173c153efcdd405da20b13a0bdd865a6&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading : true})
        // let data = await fetch(url);
        // let parsedData = await data.json();


        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading : false
        // })

        this.setState({ page: this.state.page - 1 });
        this.updaetNews();

    }

    handleNextClick = async () => {
        console.log("next");
        // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {



        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&&apikey=173c153efcdd405da20b13a0bdd865a6&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     this.setState({loading : true})
        //     let data = await fetch(url);
        //     let parsedData = await data.json();


        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parsedData.articles,
        //         loading : false
        //     })
        // }

        this.setState({ page: this.state.page + 1 });
        this.updaetNews();
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&&apikey=173c153efcdd405da20b13a0bdd865a6&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults, loading: false })


    };


    render() {
        return (
            <>

                <h2 className="text-center" style={{marginTop:'100px'}}> SamaChaar - Top {(this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1))} Headlines</h2><hr />
                {this.state.loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}>
                        
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {

                                return <div className="col-md-4" key={element.url} >
                                    <Newsitem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>

                            })}

                        </div>
                    </div>
                </InfiniteScroll>

                {/* <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-outline-primary" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}className="btn btn-outline-primary" onClick={this.handleNextClick}>Next &rarr;</button>

                </div> */}

            </>
        )
    }
}

export default News
