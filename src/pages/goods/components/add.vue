<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="一级分类" label-width="120px">
          <el-select v-model="form.first_cateid" @change="changeFirst">
            <el-option
              v-for="item in CateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="120px">
          <el-select v-model="form.second_cateid">
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" label-width="120px">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="120px">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="120px">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px" v-if="form.pid !== 0">
          <div class="my-upload">
            <h3>+</h3>
            <img v-if="imgUrl" alt="" />
            <input
              v-if="info.isshow"
              type="file"
              class="ipt"
              @change="changeFile"
            />
          </div>
        </el-form-item>
    <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
        <el-form-item label="商品规格" label-width="120px">
          <el-select v-model="form.specsid" multiple="">
            <el-option v-for="item in specList" :key="item.id" :label="item.specsname" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品属性" label-width="120px">
          <el-select v-model="form.specsattr">
            <el-option
              v-model="form.specsid"
              label="1.5"
              :value="1"
            ></el-option>
            <el-option v-model="form.specsid" label="2" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" label-width="120px">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="120px">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <el-form-item label="商品描述" label-width="120px">
          <textarea cols="30" rows="10"></textarea>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button
          type="primary"
          @click="add"
          v-if="info.title == '添加商品管理'"
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
  reqGoodsAdd,
  reqGoodsDetail,
  reqGoodssUpdata,
  // reqManageAdd,
  reqCateList,
} from "../../../utils/request";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      imgUrl: "",
      // 规格属性值
      attrArr: [{ val: "" }],
      // 二级分类的数据
      secondCateList: [],
    };
  },
  // 一进来就请求分类的数据
  mounted() {
    this.getCateList();
    this.reqList()
  },
  // 拿来cate的仓 库数据
  computed: {
    ...mapGetters({
      CateList: "cate/list",
       specList:"spec/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "spec/reqListAction",
      reqTotalAction: "spec/reqTotalAction",
      // 请求分类仓库数据的方法
      getCateList: "cate/reqListAction",
   
    }),
    attArr() {
      this.attrArr.push({ val: "" });
    },
    attDel(index) {
      this.attrArr.splice(index, 1);
    },
    // 重置form
    empty() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.imgUrl = "";
    },
    // 一级分类发生修改时间
    changeFirst() {
      // 二级分类的id应该置空
      this.form.second_cateid = "";
      reqCateList({ pid: this.form.first_cateid }).then((res) => {
        this.secondCateList = res.data.list;
      });
    },
    changeFile(e) {
      let file = e.target.files[0];

      if (file.size > 2 * 1024 * 1024) {
        errorAlert("文件不能大于2M");
        return;
      }
      let arr=['.jpeg','.png','.gif','.jpg'];
      if(!arr.includes(file.name.slice(file.name.lastIndexOf('.')))){
        errorAlert('请上传正确图片')
          return
      }
      this.imgUrl = URL.createObjectURL(file);
     this.form.img = file;

    },
    //点击了取消按钮
    cancel() {
      this.info.isshow = false;
    },
    //添加
    add() {},
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
.my-upload {
  width: 100px;
  height: 100px;
  border: 1px dashed #ccc;

  position: relative;
}
.my-upload h3 {
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 100px;
  color: #666;
}
.my-upload .ipt {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  cursor: pointer;
}
.my-upload img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
}
</style>