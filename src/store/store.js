
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

//1.创建一个vuex的store（仓库），保存需要传递的交互数据

var store = new Vuex.Store({
    //store 核心属性
    //state：状态，存放所有交互数据
    state: {
        //所有交互数据都保存在仓库的state中
        // num: 0,
        // name: '赵龙',
        // arr: []

        goodslist: [], //商品列表数据

    },

    //mutation:改变，它是改变state值的唯一方式
    /* mutations: {
        changeNum(state) {
            state.num = 5
        },

        // changeName(state,参数) {
        //     state.name = xxxx
        // }
        changeArr(state){
            state.arr.push('你好牛逼啊！！！')
        },

        changeName(state,val){
            state.name = val
        }
    }, */

    mutations: {
        //初始化商品数组
        initgoodslist(state, val) {
            state.goodslist = val
        },

        changeNum(state, payload) {
            for (let i of state.goodslist) {
                for (let j of i.foods) {
                    if (j.id == payload.id) {
                        // console.log(j.id);
                        j.num += payload.val
                        // console.log(j.num);

                    }
                }
            }
        },

    },

    // getters:计算属性,同computed非常像（vuex版的computed）
    getters: {
        //获取所有数量>0的商品
        shopcarslist(state) {
            let arr = [];
            for (let i of state.goodslist) {
                // console.log(obj);
                for (let j of i.foods) {
                    // console.log(foodsobj);
                    // console.log(j.num);
                    if (j.num > 0) {
                        arr.push(j)

                        // return arr.push(j)
                    }
                }
            }
            return arr;
        }
    }
})

/* store.commit('changeNum') //触发一个小的mutatons

// store.commit('changeNum',传入参数) //触发一个小的mutatons

store.commit('changeArr')

console.log(store.state.arr); */

// console.log(store.state.num);

export default store