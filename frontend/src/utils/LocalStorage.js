class myStorage {
  getItem(key) {
    const info = JSON.parse(localStorage.getItem(key));
    return info;
  }
  setItem(key, value) {
    return JSON.stringify(localStorage.setItem(key, value));
  }
  deleteItem() {
    localStorage.clear();
  }
}

module.exports = new myStorage();
