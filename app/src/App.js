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
      if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
        return;
      }
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
  constructor(props){
    super(props);
  }

  onChangeFilterText(e) {
    this.props.onChangeFilterText(e.target.value);
  }

  onChangeInStock(e) {
    this.props.onChangeInStock(e.target.value);
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChangeFilterText={this.onChangeFilterText}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.inStockOnly}
            onChangeInStock={this.props.onChangeInStock}
          />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false
    };
    this.onChangeFilterText = this.onChangeFilterText.bind(this);
    this.onChangeInStock = this.onChangeInStock.bind(this);
  }

  onChangeFilterText(e) {
    const newText = e;
    this.setState({
      filterText: newText
    });
  }

  onChangeInStock(e) {
    const newStock = e;
    this.setState({
      inStockOnly: newStock
    });
  }


  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText} inStockOnly={this.state.inStockOnly}
          onChangeFilterText={this.onChangeFilterText}
          onChangeInStock={this.onChangeInStock}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}
