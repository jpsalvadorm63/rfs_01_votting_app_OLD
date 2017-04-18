import React, { Component } from 'react';
import '../css/App.css';
import Seed from './seed.js';

class ProductList extends Component {

    state = { products: [], };

    componentDidMount() {
        this.setState({ products: Seed.products });
    }

    handleProductUpVote = (productId) => {
        const nextProducts = this.state.products.map((product) => {
            if (product.id === productId) {
                return Object.assign({}, product, {
                    votes: product.votes + 1,
                });
            } else {
                return product;
            }
        });

        this.setState({ products: nextProducts, });
    };

    render() {
        const products = this.state.products.sort((a, b) => (
            a.votes - b.votes
        ));

        const productComponents = products.map( (product) => {
            return (
                <Product
                    key={'product-' + product.id}
                    id={product.id}
                    title={product.title}
                    description={product.description}
                    url={product.url}
                    votes={product.votes}
                    submitter_avatar_url={product.submitterAvatarUrl}
                    product_image_url={product.productImageUrl}
                    onVote={this.handleProductUpVote}
                />
            )
        });

        return(
            <div className='ui unstackable items'>
                {productComponents}
            </div>
        );
    }
}

class Product extends Component {
    constructor(props) {
        super(props);
        this.handleUpVote = this.handleUpVote.bind(this);
    }

    // Inside `Product`
    handleUpVote() {
        this.props.onVote(this.props.id);
    }

    render() {
        return (
            <div className='item'>
                <div className='image'>
                    <img src={this.props.product_image_url} alt="1" />
                </div>
                <div className='middle aligned content'>
                    <div className='header'>
                        <a onClick={this.handleUpVote}>
                            <i className='large caret up icon'/>
                        </a>
                        {this.props.votes}
                    </div>
                    <div className='description'>
                        <a href={this.props.url}>
                            {this.props.title}
                        </a>
                    </div>
                    <div className='extra'>
                        <span>Submitted by:</span>
                        <img
                            className='ui avatar image'
                            src={this.props.submitter_avatar_url}
                            alt="2"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductList;
