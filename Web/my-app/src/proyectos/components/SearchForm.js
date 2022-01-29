import React from "react";
import "./static/projects.css";
import "bootstrap-icons/font/bootstrap-icons.css";

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: "" };
  }

  onSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  submitSearch = (e) => {
    e.preventDefault();
    this.props.getByName(this.state.searchTerm);
    //this.setState({ searchTerm: "" });
  };
  render() {
    return (
      <div class="col-8 ml-auto">
        <form onSubmit={this.submitSearch}>
          <div class="input-group mb-3">
            <input
              type="text"
              value={this.state.searchTerm}
              onChange={this.onSearchChange}
              class="form-control"
              placeholder="Buscar por nombre..."
            />
            <div class="input-group-append">
              <span class="input-group-text">
                <i class="bi bi-search" onClick={this.submitSearch}></i>
              </span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchForm;
