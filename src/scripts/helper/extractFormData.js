function getKeyValue(result, element) {
  if (element.tagName.toLowerCase() === 'select' && element.multiple) {
    for(let i = 0; i < element.options.length; i++) {
      const option = element.options[i];
      if (option.selected) {
        result[element.name] = result[element.name] ? [...result[element.name], option.value] : [option.value]
      }
    }
  }
  else if (element.type === 'radio') {
    if(element.checked) result[element.name] = element.value
  } else if (element.type === 'checkbox') {
    if(element.checked) result[element.name] = result[element.name] ? [...result[element.name], element.value] : [element.value]   
  } else {
    result[element.name] = element.value;
  }
  return result;
}

function extractFormData(form) {
  const result = Object.create(null);
  const namedInputs = Array.prototype.filter.call( form.elements, elem => elem.name )
  return namedInputs.reduce( getKeyValue, result );
}

export default extractFormData;