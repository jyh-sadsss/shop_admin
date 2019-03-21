import Vue from 'vue'
import moment from 'moment'
// 注册全局过滤器
Vue.filter('dateFilter', res => {
  return moment(res).format('YYYY-MM-DD hh:mm:ss')
})

export default {
  data() {
    return {
      goodsList: [],
      total: 0,
      pagenum: 1,
      query: ''
    }
  },
  created() {
    this.loadGoodsList()
  },
  methods: {
    async loadGoodsList(pagenum = 1, query = '') {
      let res = await this.$axios.get('goods', {
        params: {
          query,
          pagenum,
          pagesize: 4
        }
      })
      console.log(res)
      if (res.data.meta.status === 200) {
        this.goodsList = res.data.data.goods
        this.total = res.data.data.total
        this.pagenum = +res.data.data.pagenum
      }
    },
    currentChanged(pnum) {
      this.loadGoodsList(pnum)
    },
    showGoodsDialod () {
      this.$router.push('/goods-add')
    }
  }
}
