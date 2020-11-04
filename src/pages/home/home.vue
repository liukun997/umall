<template>
  <div>
    <div id="main" class="box"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import echarts from "echarts";
export default {
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqlist: "cate/reqListAction",
    }),
  },
  watch: {
    list: {
      handler() {
        if (this.list.length > 0) {
          var myChart = echarts.init(document.getElementById("main"));
          var option = {
            title: {
              text: "商品分类",
            },
            tooltip: {},
            legend: {
              data: ["子分类数量"],
            },
            xAxis: {
              data:this.list.map(item=>item.catename)
              // data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
            },
            yAxis: {},
            series: [
              {
                name: "子分类数量",
                type: "bar",
                data:this.list.map(item=>item.children?item.children.length:0)
                // data: [5, 20, 36, 10, 10, 20], 
              },
            ],
          };
          myChart.setOption(option);
        }
      },
    },
  },
  mounted() {
    this.reqlist();
    // 获取list数据
  },
};
</script>

<style scoped>
.box {
  width: 80%;
  height: 400px;
  background: #cccccc;
  margin: 0 auto;
}
</style>