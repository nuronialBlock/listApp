import React, { Component } from 'react';
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
      if(product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
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
    this.handleChangeFilterTextChange = this.handleChangeFilterTextChange.bind(this);
    this.handleChangeInStockChange = this.handleChangeInStockChange.bind(this);
  }

  handleChangeFilterTextChange(e) {
    this.props.onChangeFilterText(e.target.value);
  }

  handleChangeInStockChange(e) {
    this.props.onChangeInStock(e.target.checked);
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleChangeFilterTextChange}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.inStockOnly}
            onChange={this.handleChangeInStockChange}
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
      inStockOnly: false,
      filterText: '',
    };
    this.handleChangeFilterText = this.handleChangeFilterText.bind(this);
    this.handleChangeInStock = this.handleChangeInStock.bind(this);
  }

  handleChangeFilterText(newText) {
    this.setState({
      filterText: newText
    });
  }

  handleChangeInStock(stockOnly) {
    this.setState({
      inStockOnly: stockOnly
    });
  }


  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText} inStockOnly={this.state.inStockOnly}
          onChangeFilterText={this.handleChangeFilterText}
          onChangeInStock={this.handleChangeInStock}
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
