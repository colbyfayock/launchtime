class ClassName {
  constructor (baseClass) {
    this.className = baseClass;
  }

  addIf(className, condition) {
    if ( !!condition ) {
      this.className = `${this.className} ${className}`;
    }
    return this.className;
  }
}

export default ClassName;