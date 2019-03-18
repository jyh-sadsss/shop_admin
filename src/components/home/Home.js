export default {
  data () {
    return {
      index: 1
    }
  },
  created () {
    this.index = this.$route.path
  },
  methods: {
    async startLogout() {
      try {
        let res = await this.$confirm('您确定要退出登录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        //没有错就向下执行，有错就走catch
        this.$message({
          type: 'success',
          message: '退出登录成功!',
          duration: 1000
        })
        localStorage.removeItem('token')
        this.$router.push('/login')
      } catch (error) {
        this.$message({
          type: 'info',
          message: '您已取消退出登录!'
        })
      }
    }
  }
}
