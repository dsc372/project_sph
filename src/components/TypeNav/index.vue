<template>
  <div>
    <div class="type-nav">
      <div class="container">
        <div @mouseenter="enterShow" @mouseleave="leaveShow">
          <h2 class="all">全部商品分类</h2>
          <transition name="sort">
            <div class="sort" v-show="show">
              <div class="all-sort-list2" @click.prevent="goSearch">
                <div
                  class="item"
                  v-for="(c1, index) in categoryList"
                  :key="c1.categoryID"
                  :class="{ cur: currentIndex === index }"
                >
                  <h3
                    @mouseenter="changeIndex(index)"
                    @mouseleave="changeBackIndex"
                  >
                    <a
                      href=""
                      :data-categoryName="c1.categoryName"
                      :data-category1Id="c1.categoryId"
                      >{{ c1.categoryName }}</a
                    >
                  </h3>
                  <div
                    class="item-list clearfix"
                    @mouseenter="changeIndex(index)"
                    @mouseleave="changeBackIndex"
                    :style="{
                      display: currentIndex === index ? 'block' : 'none',
                    }"
                  >
                    <div
                      class="subitem"
                      v-for="c2 in c1.categoryChild"
                      :key="c2.categoryID"
                    >
                      <dl class="fore">
                        <dt>
                          <a
                            href=""
                            :data-categoryName="c2.categoryName"
                            :data-category2Id="c2.categoryId"
                            >{{ c2.categoryName }}</a
                          >
                        </dt>
                        <dd>
                          <em
                            v-for="c3 in c2.categoryChild"
                            :key="c3.categoryID"
                          >
                            <a
                              href=""
                              :data-categoryName="c3.categoryName"
                              :data-category3Id="c3.categoryId"
                              >{{ c3.categoryName }}</a
                            >
                          </em>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: true, //控制三级菜单是否显示
    };
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    changeBackIndex() {
      this.currentIndex = -1;
    },
    goSearch(event) {
      let { categoryname, category1id, category2id, category3id } =
        event.target.dataset;
      if (categoryname) {
        let location = { name: "search" };
        let query = { categoryName:categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        location.query = query;
        if(this.$route.params){
          location.params=this.$route.params
        }
        this.$router.push(location);
      }
    },
    //控制/search中三级菜单的显示
    enterShow() {
      if (this.$route.path !== "/home") {
        this.show = true;
      }
    },
    leaveShow() {
      if (this.$route.path !== "/home") {
        this.show = false;
      }
    },
  },
  beforeMount() {
    //当路由不为/home时，三级菜单默认收起
    if (this.$route.path !== "/home") {
      this.show = false;
    }
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      border-top: 2px solid #e1251b;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 461px/15;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }
          .item-list {
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }

    //过渡动画
    .sort-enter,
    .sort-leave-to {
      height: 0px;
    }
    .sort-enter-to,
    .sort-leave {
      height: 461px;
    }
    .sort-enter-active,
    .sort-leave-active {
      transition: all 0.5s linear;
      overflow: hidden; //防止过渡动画时，文字一下子出来了
    }
  }
}
</style>
