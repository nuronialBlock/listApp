import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class ProductCategoryRow extends Component {
  render() {
    return <tr><th colSpan="2">{this.props.category}</th></tr>;
  }
}

class ProductRow extends Component {
  render() {
    var productName = this.props.product.stocked ?
    this.props.product.name :
    <span style={{ color: 'red' }}>{this.props.product.name}</span>;
    return (
      <tr>
        <td>{productName}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends Component {
  render() {
    var titleField = <tr>
      <th>Name</th>
      <th>Price</th>
    </tr>;

    var rows = [];
    var lastCategory = null;
    this.props.products.forEach((product) => {
      if(product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    });
    return(
      <table>
        <thead>
          {titleField}
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );

  }
}

class SearchBar extends Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Search..." />
        <p>
          <input type="checkbox" />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <ProductTable products={this.props.products} />
      </div>
    );
  }
}
