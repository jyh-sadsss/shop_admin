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
      total: 0,
      dialogCateVisible: false,
      cateForm: {
        // 选择分类的时候需要的是第三级分类
        cat_name: '',
        valueArr: []
      },
      options: [],
      defaultProps: {
        label: 'cat_name',
        value: 'cat_id'
      }
    }
  },
  created() {
    this.loadCateList()
    this.load2CateList()
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

    // 获取2级数据
    async load2CateList() {
      let res = await this.$axios.get('categories', {
        params: {
          type: 2
        }
      })
      console.log(res)
      this.options = res.data.data
      // 出现结构了，表示children与选项默认的对应，但是label是不一样的
    },
    currentChange(res) {
      this.currentPage = res
      this.loadCateList()
    },
    hideCateDialog() {
      this.dialogCateVisible = false
      this.$messsage({
        message: '已取消该操作',
        type: 'info',
        duration: 1000
      })
    },
    // 每次点击添加分类的时候重置表单
    showCateDialog() {
      this.dialogCateVisible = true
      // 获取DOM要在DOM渲染完成之后获取
      this.$nextTick(() => {
        this.$refs['form'].resetFields()
      })
    },
    async addCate() {
      // cateForm.valueArr 长度表示层级，最后一个值表示父级id
      const { cat_name, valueArr } = this.cateForm
      let res = await this.$axios.post('categories', {
        cat_name,
        cat_pid: valueArr[valueArr.length - 1],
        cat_level: valueArr.length
      })
      console.log(res)
      if (res.data.meta.status === 201) {
        //关闭对话框，提示信息，刷新数据
        this.dialogCateVisible = false
        this.$message({
          message: '添加分类成功',
          type: 'success',
          duration: 1000
        })
        this.loadCateList()
      }
    }
  }
}
