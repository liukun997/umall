<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="角色名称" label-width="120px">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" label-width="120px">
          <el-tree
            ref="tree"
            :data="menuList"
            show-checkbox
            node-key="id"
            :props="{ children: 'children', label: 'title' }"
          >
          </el-tree>
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
        <el-button type="primary" @click="add" v-if="info.title == '添加菜单'"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import { successAlert, errorAlert } from "../../../utils/alert";
import {
  reqRodeAdd,
  reqRodeDetail,
  reqMenuAdd,
  reqMenuDetail,
  reqMenuUpdate,
  reqMenuList,
  reqRodeUpdata,
} from "../../../utils/request";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
      // 树形数据
      menuList: [],
    };
  },
  mounted() {
    reqMenuList().then((res) => {
      // console.log(res)
      this.menuList = res.data.list;
    });
  },
  methods: {
    //重置form
    empty() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
      };
      // 清空树
      this.$refs.tree.setCheckedKeys([]);
    },
    //点击了取消按钮
    cancel() {
      this.info.isshow = false;
    },
    //上级菜单发生修改
    changePid() {
      //如果是顶级菜单，那么类型应该是目录；否则，应该是菜单。
      if (this.form.pid === 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    //添加
    add() {
      // 获取的是文字
      // console.log(this.$refs.tree.getCheckedNodes());
      // 获取的是id
      //  console.log(this.$refs.tree.getCheckedKeys());
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      // console.log(this.form);
      // 角色添加请求
      reqRodeAdd(this.form).then((res) => {
        if (res.data.code == 200) {
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
    //获取一条的数据
    getOne(id) {
      reqRodeDetail(id).then((res) => {
        if (res.data.code === 200) {
          // 注意此时没有id字段
          this.form = res.data.list;
          //添加id
          this.form.id = id;
          this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus));
        }
      });
    },
    //点击了修改
    update() {
      // 将tree上的数据取出存在form上然后发请求
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());

      reqRodeUpdata(this.form).then((res) => {
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

<style scoped>
</style>