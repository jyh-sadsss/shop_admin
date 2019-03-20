export default {
  data() {
    return {
      LoginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async submitForm() {
      this.$refs.LoginForm.validate(async valid => {
        //async 里面有异步函数
        if (!valid) {
          this.$message({
            showClose: true,
            message: '登录失败',
            type: 'error',
            duration: 1000,
            center: true
          })
        }
        let res = await this.$axios.post('/login', this.LoginForm)
        console.log(res)
        //await 等待一个异步函数的结果 后面要跟一个异步操作的promise实例对象
        if (res.data.meta.status === 200) {
          localStorage.setItem('token', res.data.data.token)
          //router是全局的路由对象
          this.$router.push('/home')
        } else {
          this.$message({
            showClose: true,
            message: res.data.meta.msg,
            type: 'error',
            duration: 1000,
            center: false
          })
        }
      })
    },
    resetForm() {
      this.$refs.LoginForm.resetFields()
    }
  }
}
