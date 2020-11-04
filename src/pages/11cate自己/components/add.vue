<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="上级分类" label-width="120px">
          <el-select v-model="form.pid" placeholder="请选择活动区域">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>
     <!-- 原生 上传图片 -->
        <el-form-item label="图片" label-width="120px" v-if="form.pid !== 0">
          <div class="my-upload">
            <h3>+</h3>
            <img  :src="imgUrl" alt="" />
            <input
              v-if="info.isshow"
              type="file"
              class="ipt"
              @change="changeFile"
            />
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
          v-if="info.title == '商品分类添加'"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { successAlert, errorAlert } from "../../../utils/alert";
import {
  reqCateAdd,
  reqCateDetail,
  reqCateUpdata,
} from "../../../utils/request";
export default {
  props: ["info", "list"],
  data() {
    return {
      form: {
        pid: "",
        catename: "",
        status: 1,
        img: null,
      },
      imgUrl: "",
    };
  },
  methods: {
    // 绑定on-change属性 处理文件
    changeFile(e) {
      //  console.log(e);
      // 取出img的具体详情
      let file = e.target.files[0];
      // console.log(file);
      // 判断文件大小
      if (file.size > 2 * 1024 * 1024) {
        errorAlert("文件太大");
        return;
      }
      // 判断文件格式
      let imgArr = [".jpg", ".pong", ".jepg", ".gif", "jpg"];
      let name = file.name;
      let extname = name.slice(name.lastIndexOf("."));
      if (!imgArr.includes(extname)) {
        errorAlert("请上传正确图片格式");
        return;
      }
      //将文件file转为一个地址
      this.imgUrl = URL.createObjectURL(file);
      // 把img赋值给
      // console.log(imgUrl);
      this.form.img = file;
    },
    //重置form
    empty() {
      this.form = {
        pid: "",
        catename: "",
        status: 1,
        img: null,
      };
      this.imgUrl = "";
    },
    //点击了取消按钮
    cancel() {
      this.info.isshow = false;
    },

    //添加
    add() {
      // console.log(this.form);
      // 发请求
      let data = new FormData();
      for (let i in this.form) {
        data.append(i, this.form[i]);
      }
      reqCateAdd(data).then((res) => {
        if (res.data.code == 200) {
          //成功
          //弹框消息
          this.cancel();
          //弹个成功
          successAlert("添加成功");
          //重置form
          this.empty();
          // //刷新list数据
          this.$emit("init");
        }
      });
    },
    // 查
    //获取一条的数据
    getOne(id) {
      //发起获取一条数据的请求
      reqCateDetail(id).then((res) => {
        // console.log(res);
        // console.log(this.form);
        // 目前form上是没有id字段
        this.form = res.data.list;
        //补id
        this.form.id = id;
        this.imgUrl = "http://localhost:3000" + this.form.img;
      });
    },
    //点击了修改
    update() {
      // 上传的文件中含有文件 需要转换
       let data = new FormData();
      for (let i in this.form) {
        data.append(i, this.form[i]);
      }
       reqCateUpdata(data).then((res) => {
        //  console.log(123);
        if (res.data.code === 200) {
          //弹框消失
          this.cancel(); 
          //form重置
          this.empty();
          //弹成功
          successAlert("修改成功");
          //刷新list
          this.$emit("init");
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