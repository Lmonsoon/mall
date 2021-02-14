export default {
    addCounter(state, payload) {
        payload.count++
    },
    addToCart(state, payload) {
        payload.checked = false;
        state.cartList.push(payload)
    }
}
//this.$store.commit('MUTATIONS', payload)
//this.$store.commit({type:increment,payload:{})