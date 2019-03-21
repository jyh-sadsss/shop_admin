import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor /* { default global options } */)
export default {
  data() {
    return {
      active: 1,
      name: '1',
      addCateForm: {
        goods_name: '',
        goods_cat: [],
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: []
      },
      options: [],
      defaultProps: {
        label: 'cat_name',
        value: 'cat_id'
      },
      isPromotion: false,
      headers: { Authorization: localStorage.getItem('token') },
      dialogImageUrl: '',
      dialogVisible: false,
      editorOption: {
        /* quill options */
      }
    }
  },
  created() {
    this.load3CateList()
  },
  methods: {
    // 获取所有的商品
    async load3CateList() {
      let res = await this.$axios.get('categories', {
        params: {
          type: 3
        }
      })
      console.log(res)
      this.options = res.data.data
    },
    tabclick(tab) {
      this.active = +tab.name
    },
    next(active, name) {
      this.active = active
      this.name = name
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handelSuccess(res) {
      console.log(res)
      if (res.meta.status === 200) {
        //将tmp_url push进数组里面
        this.addCateForm.pics.push({ pic: res.data.tmp_path })
      }
    },
    async addGoods() {
      let res = await this.$axios.post('goods', {
        ...this.addCateForm,
        goods_cat: this.addCateForm.goods_cat.join()
      })
      console.log(res)
      if (res.data.meta.status === 201) {
        this.$message({
          message: '添加商品成功',
          type: 'success',
          duration:1000
        })
        this.$router.push('/goods')
      }
    }
  }
}
