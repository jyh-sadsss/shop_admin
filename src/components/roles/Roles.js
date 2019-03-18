export default {
  data() {
    return {
      rolesData: [],
      rolesId: 0,
      dialogRolesVisible: false,
      rolesTreeData: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  created() {
    this.getRolesList()
    this.getTreeRoles()
  },
  methods: {
    async getRolesList() {
      let res = await this.$axios.get('roles')
      if (res.data.meta.status === 200) {
        this.rolesData = res.data.data
      }
    },
    async getTreeRoles() {
      let res = await this.$axios.get('rights/tree')
      this.rolesTreeData = res.data.data
    },
    showRolesDialog(row) {
      //对话框弹出来，这也是DOM渲染
      this.dialogRolesVisible = true
      //遍历所有的id
      var arr = []
      row.children.forEach(v1 => {
        v1.children.forEach(v2 => {
          v2.children.forEach(v3 => {
            arr.push(v3.id)
          })
        })
      })
      //在DOM渲染之后获取
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(arr)
      })
      //点击渲染之后，要获取当前id下的用户权限
      this.rolesId = row.id
    },
    hideRolesDialog() {
      this.dialogRolesVisible = false
      this.$message({
        message: '已取消编辑',
        type: 'info',
        duration: 1000
      })
    },
    async assignRights() {
      //获取当前被选中的节点
      let keys1 = this.$refs.tree.getCheckedKeys()
      let keys2 = this.$refs.tree.getHalfCheckedKeys()
      let keys = keys1.concat(keys2)
      let str=keys.join(',')
      let res = await this.$axios.post(`roles/${this.rolesId}/rights`, {
        rids:str
      })
      console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          message: res.data.meta.msg,
          type: 'success',
          duration:1000
        })
        this.getRolesList()
        this.dialogRolesVisible=false
      } else {
        this.$message({
          message:'更新失败',
          type: 'error',
          duration:1000
        })
      }
    }
  }
}
