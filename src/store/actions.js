export default {
    addCart(context, payload) {
        return new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
            // console.log(context);
            let Produc = context.state.cartList.find(item => item.iid === payload.iid)
            if (Produc) {
                // Produc.iid += 1
                context.commit('addCounter', Produc)
                resolve('当前商品数量 + 1')
            } else {
                payload.count = 1
                    // state.cartList.push(payload)
                context.commit('addToCart', payload)
                resolve('添加新商品')
            }
        })
    }

}