export default {
  data() {
    return {
      rightsData: [
        {
          authName: '',
          path: '',
          level: ''
        }
      ],
      currentRow: null
    }
  },
  created() {
    this.getRightsList()
  },
  methods: {
    setCurrent(row) {
      this.$refs.rightsTable.setCurrentRow(row)
    },
    handleCurrentChange(val) {
      this.currentRow = val
    },
    indexMethod(index) {
      return index
    },
    async getRightsList() {
      let res = await this.$axios.get('rights/list')
      console.log(res)
      if (res.data.meta.status === 200) {
        this.rightsData=res.data.data
      }
    }
  }
}
