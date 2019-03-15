import axios from 'axios'
export default {
  data() {
    return {
      usersData: [],
      total: 0,
      query: '',
        currentPage: 1,
      //插槽？
      value:false
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData(currentPage=1,query='') {
      let res = await axios.get('http://localhost:8888/api/private/v1/users', {
        params: {
          query,
          pagenum:currentPage,
          pagesize: 2
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      console.log(res)
      this.usersData = res.data.data.users
      this.total = res.data.data.total
      },
      currentChange (res) {
          this.getData(res,this.query)
      },
      searchKey () {
          this.getData(1,this.query)
      }
  }
}
