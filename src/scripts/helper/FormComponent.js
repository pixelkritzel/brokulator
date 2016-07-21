import React, { Component } from 'react';

import extractFormData from '../helper/extractFormData';

export default class FormComponent extends Component {

  onSubmit = (event) => {
    event.preventDefault();
    const { method } = this.props;
    const formData = extractFormData(event.target);
    for (let key in formData) {
      if (typeof formData === 'string') {
        formData[key] = formData[key].trim()
      }
    }
    if (method === 'create') {
      this.create && this.create(formData);
    }
    if (method === 'update') {
      this.update && this.update(formData);
    }
  }

  closeFormIfEscapePressed = event => {
    if (event.keyCode == 27) { this.props.closeForm() };
  }

  componentDidMount() {
    window.addEventListener('keyup', this.closeFormIfEscapePressed);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.closeFormIfEscapePressed);
  }
}