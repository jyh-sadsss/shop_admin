<template src='./Roles.html'></template>

<script src='./Roles.js'>
export default {
  data() {
    return {
      rolesData: []
    };
  },
  created() {
    this.getRolesList();
  },
  methods: {
    async getRolesList() {
      let res = await this.$axios.get("roles");
      console.log(res);
      if (res.data.meta.status === 200) {
        this.rolesData = res.data.data;
      }
    },
    getRowData(row) {
      console.log(row);
    }
  }
};
</script>

<style lang='less' src='./Roles.less'>
</style>
