<template>
  <web-view :src="url"></web-view>
</template>
 
<script>
export default {
  data() {
    return {
      url: ''
    }
  },
  onLoad(item) {
    this.url = decodeURIComponent(item.url)
    console.log(this.url)
    // 传入需要跳转的链接 使用web-view标签进行跳转
  }
}
</script>
 
<style lang="scss">
</style>
