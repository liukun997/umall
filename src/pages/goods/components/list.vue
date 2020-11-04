<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="商品编号"></el-table-column>
      <el-table-column prop="specsname" label="商品名称"></el-table-column>
      <el-table-column label="商品价格">
        <template slot-scope="scope">
          <span>{{scope.row.specsname}}</span>
        </template>
      </el-table-column>
            <el-table-column label="市场价格">
        <template slot-scope="scope">
          <span>{{scope.row.specsname}}</span>
        </template>
      </el-table-column>
 <el-table-column label="是否新品">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >是</el-button
          >
          <el-button type="info" v-else>否</el-button>
        </template>
      </el-table-column>
       <el-table-column label="是否热卖">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >是</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >否</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180px">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <!-- <el-button type="danger" @click="del(scope.row.id)">原本的删除</el-button> -->

          <del-btn @confirm="del2(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next"
    @current-change='changePage'  
     :page-size="size" :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { successAlert, errorAlert } from "../../../utils/alert";
import { reqSpecDetail, reqSpecsDel } from "../../../utils/request";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "spec/list",
      total: "spec/total",
      size: "spec/size",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "spec/reqListAction",
      reqTotalAction: "spec/reqTotalAction",
     changePageAction:'spec/changePageActiddon'
    }),
    //点了编辑
    edit(id) {
      this.$emit("edit", id);
    },
    changePage(page){
      this.changePageAction(page)
    },
    //删除
    del2(id) {
      //发起请求删除数据
      reqSpecsDel(id).then((res) => {
        // console.log(res)
        if (res.data.code === 200) {
          successAlert("删除成功");
          this.reqList();
          this.reqTotalAction()
        }
      });
    },
  },
  mounted() {
    this.reqList();
    this.reqTotalAction()
  },
};
</script>

<style scoped>
img {
  width: 80px;
  height: 80px;
}
</style>