<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="this.$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header/index.vue";
import Footer from "./components/Footer/index.vue";
export default {
  components: { Header, Footer },
  mounted() {
    //通知Vuex发请求，获取数据存放于仓库中,放在此处指执行一次，有利于优化性能
    this.$store.dispatch("home/categoryList");
  },
};
</script>

<style lang="scss" scoped>
</style>