<template>
  <div class="pagination">
    <button :disabled="pageNo===1" @click="postPageNo(pageNo-1)">上一页</button>
    <button v-if="startAndEnd[0] > 1" @click="postPageNo(1)">1</button>
    <button v-if="startAndEnd[0] > 2">···</button>

    <button v-for="num in startAndEnd" :key="num" :class="{active:num===pageNo}" @click="postPageNo(num)">{{ num }}</button>

    <button v-if="startAndEnd[midContinue - 1] < totalPages - 1">···</button>
    <button v-if="startAndEnd[midContinue - 1] < totalPages" @click="postPageNo(totalPages)">
      {{ totalPages }}
    </button>
    <button :disabled="pageNo===totalPages" @click="postPageNo(pageNo+1)">下一页</button>

    <div style="margin-left: 30px;display: inline-block;">
      <button>当前第 {{ pageNo }} 页</button>
      <button>共 {{ totalPages }} 页</button>
      <button>共 {{ total }} 条搜索结果</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "midContinue","totalPages"],
  computed: {
    //计算连续页码的起始与结束的数字
    startAndEnd() {
      let start = 0,
        end = 0;
      const res = new Array();
      //总页数小于连续页数
      if (this.midContinue > this.totalPages) {
        start = 1;
        end = this.totalPages;
      } else {
        start = this.pageNo - Math.floor(this.midContinue / 2); //此处不能写死
        end = this.pageNo + Math.floor(this.midContinue / 2); //此处不能写死
        //一些特殊情况(以前者为例，小于等于1不解释，等于2时，左边首页会显示，为确保midContinue为5，需将start=1)
        if (start <= 2) {
          start = 1;
          end = this.midContinue;
        }else if (end >= this.totalPages - 1) {
          end = this.totalPages;
          start = this.totalPages - this.midContinue + 1;
        }
      }
      for (let i = start; i <= end; i++) {
        res.push(i);
      }
      return res;
    },
  },
  methods:{
    postPageNo(PageNo){
        this.$emit('getPageNo',PageNo)
    }
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  margin-bottom: 35px;
  button {
    margin: 10px 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }

  }
}
</style>