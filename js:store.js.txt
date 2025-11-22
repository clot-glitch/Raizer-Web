export const Store = {
  state: {
    theme: localStorage.getItem("theme") || "dark",
    user: JSON.parse(localStorage.getItem("user") || "null"),
    wishlist: JSON.parse(localStorage.getItem("wishlist") || "[]"),
    savedSearches: JSON.parse(localStorage.getItem("savedSearches") || "[]"),
    recentlyViewed: JSON.parse(localStorage.getItem("recentlyViewed") || "[]"),
    compareQueue: JSON.parse(localStorage.getItem("compareQueue") || "[]"),
    alerts: JSON.parse(localStorage.getItem("alerts") || "[]"),
  },
  save() {
    localStorage.setItem("theme", this.state.theme);
    localStorage.setItem("user", JSON.stringify(this.state.user));
    localStorage.setItem("wishlist", JSON.stringify(this.state.wishlist));
    localStorage.setItem("savedSearches", JSON.stringify(this.state.savedSearches));
    localStorage.setItem("recentlyViewed", JSON.stringify(this.state.recentlyViewed));
    localStorage.setItem("compareQueue", JSON.stringify(this.state.compareQueue));
    localStorage.setItem("alerts", JSON.stringify(this.state.alerts));
  },
  login(email, password) {
    // demo auth: accept any non-empty
    if (email && password) {
      this.state.user = { id: crypto.randomUUID(), email, role: "buyer" };
      this.save();
      return true;
    }
    return false;
  },
  signup(email, password) {
    return this.login(email, password);
  },
  logout() { this.state.user = null; this.save(); },
  addWishlist(id) {
    if (!this.state.wishlist.includes(id)) this.state.wishlist.push(id);
    this.save();
  },
  removeWishlist(id) {
    this.state.wishlist = this.state.wishlist.filter(x => x !== id);
    this.save();
  },
  addRecentlyViewed(id) {
    this.state.recentlyViewed = [id, ...this.state.recentlyViewed.filter(x => x !== id)].slice(0, 20);
    this.save();
  },
  addCompare(id) {
    if (this.state.compareQueue.length >= 4) return false;
    if (!this.state.compareQueue.includes(id)) this.state.compareQueue.push(id);
    this.save(); return true;
  },
  removeCompare(id) { this.state.compareQueue = this.state.compareQueue.filter(x=>x!==id); this.save(); }
};
