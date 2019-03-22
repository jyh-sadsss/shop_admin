export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
      if (!value) {
        return callback(new Error('电话号码不能为空'))
      }
      setTimeout(() => {
        // Number.isInteger是es6验证数字是否为整数的方法,实际输入的数字总是识别成字符串
        // 所以在前面加了一个+实现隐式转换

        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('手机号码格式不正确'))
          }
        }
      }, 100)
    }
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }
    return {
      usersData: [],
      editeForm: {
        //这里要添加属性来实现动态绑定
        email: '',
        mobile: '',
        id: ''
      },
      //assignRolesForm必须是一个对象
      assignRolesForm: {
        username: '23333',
        id: 1,
        rid: 1,
        rolesList: []
      },
      options: [
        {
          //value 遍历的:key
          id: '选项1',
          label: '黄金糕'
        }
      ],
      value: '',
      total: 0,
      query: '',
      currentPage: 1,
      //插槽？
      value: false,
      dialogFormVisible: false,
      dialogEditeVisible: false,
      assignRolesVisible: false,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      formLabelWidth: '120px',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        email: [{ validator: checkEmail, trigger: 'blur' }],
        mobile: [{ validator: checkPhone, trigger: 'blur' }]
      }
    }
  },
  created() {
    // 获取到当前的路由参数
    let page = this.$route.params.page
    console.log(page)
    this.getData(page)
    this.getAllRoles()
  },
  methods: {
    async getData(currentPage = 1, query = '') {
      let res = await this.$axios.get('/users', {
        params: {
          query,
          pagenum: currentPage,
          pagesize: 2
        }
      })
      //这里将userData替换掉
      console.log(res)
      this.usersData = res.data.data.users
      console.log(this.usersData)
      this.total = res.data.data.total
      //渲染的是哪一页的数据，就显示哪一页
      this.currentPage = res.data.data.pagenum
    },
    currentChange(res) {
      console.log(res)
      this.getData(res, this.query)
      //编程导航
      this.$router.push('/users/' + res)
    },
    searchKey() {
      this.getData(1, this.query)
    },
    //异步请求
    async addData() {
      let res = await this.$axios.post('/users', this.form)
      console.log(res)
      if (res.data.meta.status === 201) {
        this.$message({
          message: '添加用户成功',
          type: 'success',
          duration: 1000
        })
        this.getData(1)
        this.cancelForm()
      }
    },
    cancelForm() {
      this.dialogFormVisible = false
      this.$message({
        message: '已取消次操作',
        type: 'info',
        duration: 1000
      })
      this.$refs['form'].resetFields()
    },
    showEdite(obj) {
      //我现在拿到的对象就是当前那一行的数据
      this.dialogEditeVisible = true
      console.log(obj)
      //展示数据
      //当前被编辑的对象
      const { id, username, email, mobile } = obj
      this.editeForm.id = id
      this.editeForm.username = username
      this.editeForm.email = email
      this.editeForm.mobile = mobile
    },
    cancleEdite() {
      this.dialogEditeVisible = false
      this.$message({
        message: '您已取消编辑',
        type: 'info',
        duration: 1000
      })
    },
    async editeUserData() {
      const { id, email, mobile } = this.editeForm
      try {
        let res = await this.$axios.put('/users/' + id, {
          email,
          mobile
        })
        console.log(res)
        if (res.data.meta.status === 200) {
          this.dialogEditeVisible = false
          this.$message({
            message: '更新成功',
            type: 'success',
            duration: 1000
          })
          this.getData(1)
        }
      } catch (err) {
        this.$message({
          message: '更新数据失败',
          type: 'error',
          duration: 1000
        })
      }
    },
    async deleteUser(id) {
      try {
        await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        let res = await this.$axios.delete('/users/' + id)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!',
            duration: 1000
          })
          this.getData(1)
        }
      } catch (error) {
        this.$message({
          type: 'info',
          message: '已取消删除',
          duration: 1000
        })
      }
    },
    async stateChanged(obj) {
      console.log(obj)
      const { id, mg_state: type } = obj
      let res = await this.$axios.put('/users/' + id + '/state/' + type)
      console.log(res)
      if (res.data.meta.status === 200) {
        this.getData(1)
      }
    },
    //获取所有的角色列表，展示在下拉框里面
    async getAllRoles() {
      let res = await this.$axios.get('roles')
      console.log(res)
      if (res.data.meta.status === 200) {
        this.assignRolesForm.rolesList = res.data.data
      }
    },
    async showAssignRoles(row) {
      this.assignRolesVisible = true
      const { username, id } = row
      this.assignRolesForm.username = username
      this.assignRolesForm.id = id
      //这里获取到对应id下的rid
      let res = await this.$axios.get(`users/${id}`)
      console.log(res)
      const rid = res.data.data.rid
      console.log(rid)
      this.assignRolesForm.rid = rid === 0 ? '' : rid
    },
    hideAssignRoles() {
      this.assignRolesVisible = false
      this.$message({
        message: '您已取消该操作',
        type: 'info',
        duration: 1000
      })
    },
    async addAssignRoles() {
      let res = await this.$axios.put(`users/${this.assignRolesForm.id}/role`, {
        rid: this.assignRolesForm.rid
      })
      console.log(res)
      if (res.data.meta.status === 200) {
        this.getData(this.currentPage)
        this.$message({
          message: res.data.meta.msg,
          type: 'success',
          duration: 1000
        })
        this.assignRolesVisible = false
      }
    }
  }
}
