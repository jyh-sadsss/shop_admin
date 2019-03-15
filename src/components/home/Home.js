export default {
  methods: {
    async startLogout() {
      try {
        let res = await this.$confirm('您确定要退出登录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

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
