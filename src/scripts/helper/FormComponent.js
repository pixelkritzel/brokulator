/* global window */

import React, { Component } from 'react';

import extractFormData from '../helper/extractFormData';

export default class FormComponent extends Component {

  applyChanges = (event) => {
    event.preventDefault();
    const { method } = this.props;
    const formData = extractFormData(event.currentTarget);
    for (let key in formData) {
      if (typeof formData === 'string') {
        formData[key] = formData[key].trim()
      }
    }
    if (method === 'create') {
      this.create && this.create(formData, event.type);
    }
    if (method === 'update') {
      this.update && this.update(formData, event.type);
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