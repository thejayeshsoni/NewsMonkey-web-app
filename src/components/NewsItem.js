import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <div>
                <div className="card" style={{ border: "1px solid black" }}>
                    <div style={{ display: "flex", justifyContent: "flex-end", position: "absolute", right: "0" }}>
                        <span className="badge rounded-pill bg-danger">{source}</span>
                    </div>
                    <img src={imageUrl} className="card-img-top" alt="IMAGES" />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"> <small className="text-danger"> By {!author ? "Unkown" : author} on {new Date(date).toGMTString()} </small> </p>
                        <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark" rel="noreferrer">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
