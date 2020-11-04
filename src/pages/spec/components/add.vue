<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
      
        <el-form-item label="规格名称" label-width="120px">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        
        <el-form-item
          label="规格属性"
          label-width="120px"
          v-for="(item, index) in attrArr"
          :key="index"
        >
          <div class="line">
            <el-input v-model="item.val" autocomplete="off"></el-input>
            <div class="btn-box">
              <el-button type="primary" v-if="index == 0" @click="attArr"
                >新增规格属性</el-button
              >
              <el-button type="danger" @click="attDel(index)" v-else
                >删除</el-button
              >
            </div>
          </div>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button
          type="primary"
          @click="add"
          v-if="info.title == '添加商品规格'"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, errorAlert } from "../../../utils/alert";
import {
  reqSpecAdd,
  reqSpecDetail,
  reqSpecsUpdata,
} from "../../../utils/request";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        specsname: "",
        attrs: "[]",
        status: 1,
      },
      // 规格属性值
      attrArr: [{ val: "" }],
    };
  },
  methods: {
    ...mapActions({
      reqList: "spec/reqListAction",
      reqTotalAction: "spec/reqTotalAction",
    }),
    attArr() {
      this.attrArr.push({ val: "" });
    },
    attDel(index) {
      this.attrArr.splice(index, 1);
    },
    //重置form
    empty() {
      this.form = {
        specsname: "",
        attrs: "[]",
        status: 1,
      };
      this.imgUrl = "";
    },
    //点击了取消按钮
    cancel() {
      this.info.isshow = false;
    },
    //添加
    add() {
      // console.log(this.attrArr);
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.val));
      // console.log(this.form);
      reqSpecAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("添加成功");
          this.cancel();
          this.empty();
          // 刷新list
          this.reqList();
          // 刷新总数
          this.reqTotalAction()
        }
      });
    },
    //获取一条的数据
    getOne(id) {
      //发起获取一条数据的请求
      reqSpecDetail(id).then((res) => {
        //  有id
        this.form = res.data.list[0];
        this.attrArr = JSON.parse(this.form.attrs).map((item) => ({
          val: item,
        }));
      });
    },
    //点击了修改
    update() {
      // console.log(this.form);
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.val));
      reqSpecsUpdata(this.form).then((res) => {
        if (res.data.code === 200) {
          //弹框消失
          this.cancel();
          //form重置
          this.empty();
          //弹成功
          successAlert("修改成功");
          //刷新list
          this.reqList();
        } else {
          errorAlert(res.data.msg);
        }
      });
    },
  },
};
</script>

<style  scoped>
.line {
  display: flex;
}
.btn-box {
  flex: 1;
}
</style>