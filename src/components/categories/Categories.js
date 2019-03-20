export default {
  data() {
    return {
      cateTable: [
        {
          cat_name: '',
          cat_pid: '',
          cat_level: 0,
          cat_deleted: false
        }
      ],
      currentPage: 1,
      total: 0
    }
  },
  created() {
    this.loadCateList()
  },
  methods: {
    async loadCateList() {
      let res = await this.$axios.get('categories', {
        params: {
          // 要获取到它的children
          type: 3,
          pagenum: this.currentPage,
          pagesize: 4
        }
      })
      console.log(res)
      if (res.data.meta.status === 200) {
        this.cateTable = res.data.data.result
        this.total = res.data.data.total
      }
    },
    currentChange(res) {
      this.currentPage = res
      this.loadCateList()
    }
  }
}
