<template>
    <div class="allowner">

        <el-container>

            <el-aside width="300px" >
                <side></side>
            </el-aside>
            
            <el-main class="main-owner">
                
                <el-card class="table-card">
                    <div slot="header" class="clearfix">
                        <span>养殖人员列表</span>
                        <el-button @click="checkAdd" style="float: right; padding: 3px 0" type="text">添加</el-button>
                    </div>

                    <el-table
                        :data="tempTableData"
                        style="width: 100%">
                        <el-table-column
                            :prop="item.prop"
                            :label="item.label"
                            :width="item.width"
                            v-for="(item,index) in tableItem" 
                            :key="index"
                        >
                            <template slot-scope="scope">
                                <img v-if="item.prop=='imgUrl'" :src="scope.row.imgUrl" alt="" width="90">
                                <div v-else>{{scope.row[item.prop]}}</div>
                            </template>
                        </el-table-column>

                        <el-table-column
                            fixed="right"
                            label="操作"
                            width="120">
                            <template slot-scope="scope">
                                <el-button @click="check(scope.row)" type="text" size="small">查看</el-button>
                                <el-button @click="deleteSelect(scope.row)" style="color:red" type="text" size="small">删除</el-button>

                            </template>
                        </el-table-column>

                    </el-table>

                </el-card>

                <!--  分页 -->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5,10]"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next"
                    :total="AllOwnerLength">
                </el-pagination>

            </el-main>

        </el-container>


        <el-dialog
            :title="title"
            :visible.sync="formShow"
            width="60%"
            center
        >

            <!-- form -->
            <el-form label-position="left" :inline="true" :rules="rules" ref="form" :model="form" label-width="120px">
                                
                <el-collapse v-model="activeName" accordion>

                    <el-collapse-item v-if="checkOrAdd=='add'" title="选择个人/企业" name="0">
                        <el-form-item label="个人/企业">
                            <el-radio-group class="short" v-model="form.discriminator">
                                <el-radio label="个人"></el-radio>
                                <el-radio label="企业"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-collapse-item>

                    <el-collapse-item v-if="form.discriminator" title="个人信息" name="1">
                        <el-form-item label="名称/法人" prop="name">
                            <el-input class="short" v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item :label="form.discriminator=='个人'?'手机号码':'联系电话'" prop="mobile">
                            <el-input class="short" v-model="form.mobile"></el-input>
                        </el-form-item>
                        <el-form-item label="家庭住址" prop="address">
                            <el-input class="short" v-model="form.address"></el-input>
                        </el-form-item>
                        <el-form-item label="所在区" prop="county">
                            <el-select class="short" v-model="form.county" placeholder="请选择所在区/县">
                                <el-option
                                    v-for="item in countyOption"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所在镇" prop="town">
                            <el-select class="short" v-model="form.town" placeholder="请选择所在镇" :disabled='form.county==""?true:false'>
                                <el-option
                                    v-for="item in townOption"
                                    :key="item.id"
                                    :label="item.town"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所在村" prop="village">
                            <el-select class="short" v-model="form.village" placeholder="请选择所在村" :disabled='form.county==""||form.town==""?true:false'>
                                <el-option
                                    v-for="item in villageOption"
                                    :key="item.id"
                                    :label="item.village"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="出生年月" prop="birthday">
                            <el-date-picker
                                class="short"
                                v-model="form.birthday"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item label="性别" prop="sex">
                            <el-radio-group class="short" v-model="form.sex">
                                <el-radio label="男"></el-radio>
                                <el-radio label="女"></el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item label="文化程度" prop="educationLevel">
                            <el-select v-model="form.educationLevel" placeholder="请选择" class="short">
                            <el-option label="小学" value="小学"></el-option>
                            <el-option label="初中" value="初中"></el-option>
                            <el-option label="高中" value="高中"></el-option>
                            <el-option label="大学" value="大学"></el-option>
                            <el-option label="研究生" value="研究生"></el-option>
                            <el-option label="博士" value="博士"></el-option>
                            </el-select>
                        </el-form-item>
                                        
                        <el-form-item label="组织机构代码" prop="departmentId">
                            <el-input class="short" v-model="form.departmentId"></el-input>
                        </el-form-item>
                        <el-form-item label="从业时间" prop="engagedTime">
                            <el-input class="short" v-model="form.engagedTime"></el-input>
                        </el-form-item>
                        <el-form-item label="农民头衔" prop="farmerTitle">
                            <el-input class="short" v-model="form.farmerTitle"></el-input>
                        </el-form-item>
                        <el-form-item label="信用等级" prop="creditLevel">
                            <el-select v-model="form.creditLevel" placeholder="请选择" class="short">
                            <el-option label="A" value="A"></el-option>
                            <el-option label="B" value="B"></el-option>
                            <el-option label="C" value="C"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="图片" >
                            <el-upload
                                class="avatar-uploader"
                                action="#"
                                :show-file-list="false"
                                :before-upload='beforeUpload'
                            >
                                <img v-if="form.imgUrl" :src="form.imgUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item style="display:block;"  label="备注">
                            <el-input style="width:510px" autosize type="textarea" v-model="form.comment"></el-input>
                        </el-form-item>
                    </el-collapse-item>

                    <el-collapse-item v-if="form.discriminator=='企业'" title="企业信息" name="2">
                        <!-- 和企业有关的 -->
                        <el-form-item v-if="form.discriminator=='企业'" label="公司" prop="companyName">
                            <el-input class="short" v-model="form.companyName"></el-input>
                        </el-form-item>
                        <el-form-item v-if="form.discriminator=='企业'" label="成立时间" prop="establishedTime">
                            <el-date-picker
                                class="short"
                                v-model="form.establishedTime"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item v-if="form.discriminator=='企业'" label="固定资产" prop="fixedAssets">
                            <el-input class="short" v-model="form.fixedAssets"></el-input>
                        </el-form-item>
                        <el-form-item v-if="form.discriminator=='企业'" label="经营内容" prop="businessContents">
                            <el-input class="short" v-model="form.businessContents"></el-input>
                        </el-form-item>
                        <el-form-item v-if="form.discriminator=='企业'" label="无公害基地" prop="isBaseOfEmployee">
                            <el-select class="short" v-model="form.isBaseOfEmployee" placeholder="请选择">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-if="form.discriminator=='企业'" label="员工人数" prop="numberOfEmployee">
                            <el-input class="short" v-model="form.numberOfEmployee"></el-input>
                        </el-form-item>
                        <el-form-item v-if="form.discriminator=='企业'" label="特色产品" prop="featuredProducts">
                            <el-input class="short" v-model="form.featuredProducts"></el-input>
                        </el-form-item>
                    </el-collapse-item>
                </el-collapse>

            </el-form>
            <span slot="footer" class="dialog-footer" >
                    <el-button type="primary" v-if="checkOrAdd=='check'" @click="save">保存</el-button>
                    <el-button type="primary" v-else @click="add">添加</el-button>
                    <el-button @click="cancle">取消</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import random from '../../api/random'

import side from './Side.vue'
export default {
    name:'allowner',
    data(){
        return{
            currentPage:1,
            pagesize:10,
            tempTableData:[],
            // 手风琴激活
            activeName:'1',
            tableItem:[
                {'id':'1',prop:'name',label:'名称/法人',width:'100'},
                {'id':'2',prop:'discriminator',label:'类型',width:'100'},
                {'id':'3',prop:'countyContent',label:'所在区/县',width:'150'}, 
                {'id':'4',prop:'townContent',label:'所在镇',width:'150'}, 
                {'id':'5',prop:'villageContent',label:'所在村',width:'150'},
                {'id':'6',prop:'creditLevel',label:'信用等级',width:'100'},
                {'id':'7',prop:'departmentId',label:'组织机构代码',width:'150'},
                {'id':'8',prop:'checkStatus',label:'审核状态',width:'100'},
            ],
            form: {
                discriminator:'',
                id:'',

                name: '',
                mobile:'',
                birthday:'',
                sex:'',
                imgUrl:'',
                address:'',
                county:'',
                countyId:'',
                town:'',
                townId:'',
                village:'',
                villageId:'',
                engagedTime:'',
                educationLevel:'',
                farmerTitle:'',
                departmentId:'',

                companyName:'',
                establishedTime:'',
                fixedAssets:'',
                businessContents:'',
                isBaseOfEmployee:'',
                numberOfEmployee:'',
                featuredProducts:'',
                creditLevel:'',
                comment:'',
                // checkStatus:'',
            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'change' },
                ],
                mobile: [
                    { required: true, message: '请输入手机', trigger: 'change' },
                ],
                birthday: [
                    { required: true, message: '请选择出生日期', trigger: 'change' },
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'change' },
                ],
                address: [
                    { required: true, message: '请输入家庭地址', trigger: 'change' },
                ],
                county: [
                    { required: true, message: '请选择所在区', trigger: 'change' },
                ],
                town: [
                    { required: true, message: '请选择所在镇', trigger: 'change' },
                ],
                village: [
                    { required: true, message: '请选择所在村', trigger: 'change' },
                ],
                engagedTime: [
                    { required: true, message: '请输入从业时间', trigger: 'change' },
                ],
                farmerTitle: [
                    { required: true, message: '请输入农民头衔', trigger: 'change' },
                ],
                educationLevel:[
                    { required: true, message: '请选择文化程度', trigger: 'change' },
                ],
                departmentId: [
                    { required: true, message: '请输入组织机构代码', trigger: 'change' },
                ],
                companyName: [
                    { required: true, message: '请输入公司名', trigger: 'change' },
                ],
                establishedTime: [
                    { required: true, message: '请选择成立时间', trigger: 'change' },
                ],
                fixedAssets: [
                    { required: true, message: '请输入固定资产', trigger: 'change' },
                ],
                businessContents: [
                    { required: true, message: '请输入经营内容', trigger: 'change' },
                ],
                isBaseOfEmployee: [
                    { required: true, message: '请选择是否未无公害基地', trigger: 'change' },
                ],
                numberOfEmployee: [
                    { required: true, message: '请输入员工人数', trigger: 'change' },
                ],
                featuredProducts: [
                    { required: true, message: '请输入特色产品', trigger: 'change' },
                ],
                creditLevel: [
                    { required: true, message: '请选择信用等级', trigger: 'change' },
                ],
            },
            formShow:false,
            imageName:'',
            checkOrAdd:'check',
            title:'',
            //1=>定海区，2=>普陀区,3=>岱山县,4=>嵊泗县
            countyOption:[
                {
                    value: 1,
                    label: '定海区'
                }, 
                {
                    value: 2,
                    label: '普陀区'
                }, 
                {
                    value: 3,
                    label: '岱山县'
                }, 
                {
                    value: 4,
                    label: '嵊泗县'
                }, 
            ],
            townOption:[],
            villageOption:[],
        }
    },
    methods:{
        getAllOwner(){
            this.$axios({
                url:'/api/owner/getAll',
                method:'GET'
            }).then(res=>{
                if(res.data.status==200){
                    this.tempTableData=res.data.data.data.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)

                    this.$store.commit('allOwner/setTableData',res.data.data.data)
                    this.getAllTown()
                    this.getALlVillage()
                }
            
            })
        },
        // 查看
        check(item){
            this.activeName='1'
            this.form=item
            this.checkOrAdd='check'
            this.title=`${this.form.discriminator}养殖`
            setTimeout(()=>{
                this.formShow=true
            },100)

        },
        // 添加
        checkAdd(){
            this.activeName='0'
            this.checkOrAdd='add'
            this.title="添加养殖"
            this.resetForm()
            setTimeout(()=>{
                this.formShow=true
            },100)

        },
        cancle(){
            this.formShow=false
        },
        save(){
            if(this.form.name==''){
                return this.$message.error('请输入姓名')
            }
            if(this.form.mobile==''){
                return this.$message.error('请输入手机')
            }
            if(this.form.address==''){
                return this.$message.error('请输入家庭地址')
            }
            if(this.form.county==''){
                return this.$message.error('请选择所在区')
            }
            if(this.form.town==''){
                return this.$message.error('请选择所在镇')
            }
            if(this.form.village==''){
                return this.$message.error('请选择所在村')
            }
            if(this.form.birthday==''){
                return this.$message.error('请选择出生日期')
            }
            if(this.form.sex==''){
                return this.$message.error('请选择性别')
            }
            if(this.form.educationLevel==''){
                return this.$message.error('请选择文化程度')
            }
            if(this.form.departmentId==''){
                return this.$message.error('请输入组织机构代码')
            }
            if(this.form.engagedTime==''){
                return this.$message.error('请输入从业时间')
            }
            if(this.form.farmerTitle==''){
                return this.$message.error('请输入农民头衔')
            }
            if(this.form.creditLevel==''){
                return this.$message.error('请选择信用等级')
            }
            if(this.form.discriminator=='企业'){
                if(this.form.companyName==''){
                    return this.$message.error('请输入公司名')
                }
                if(this.form.establishedTime==''){
                    return this.$message.error('请选择成立时间')
                }
                if(this.form.fixedAssets==''){
                    return this.$message.error('请输入固定资产')
                }
                if(this.form.businessContents==''){
                    return this.$message.error('请输入经营内容')
                }
                if(this.form.isBaseOfEmployee==''){
                    return this.$message.error('请选择是否未无公害基地')
                }
                if(this.form.numberOfEmployee==''){
                    return this.$message.error('请输入员工人数')
                }
                if(this.form.featuredProducts==''){
                    return this.$message.error('请输入特色产品')
                }
            }
            // update
            let data=this.qs.stringify(this.form)

            this.$axios({
                url:'/api/owner/update',
                method:"POST",
                data:data
            }).then(res=>{
                console.log(res);
                if(res.data.status==200){
                    this.formShow=false
                    this.$message.success('修改成功');
                    //刷新
                    window.location.reload();
                    this.$router.go(0);
                }
            })
        },
        add(){
            if(this.form.discriminator==''){
                return this.$message.error('请选择个人/企业养殖')
            }
            if(this.form.name==''){
                return this.$message.error('请输入姓名')
            }
            if(this.form.mobile==''){
                return this.$message.error('请输入手机')
            }
            if(this.form.address==''){
                return this.$message.error('请输入家庭地址')
            }
            if(this.form.county==''){
                return this.$message.error('请选择所在区')
            }
            if(this.form.town==''){
                return this.$message.error('请选择所在镇')
            }
            if(this.form.village==''){
                return this.$message.error('请选择所在村')
            }
            if(this.form.birthday==''){
                return this.$message.error('请选择出生日期')
            }
            if(this.form.sex==''){
                return this.$message.error('请选择性别')
            }
            if(this.form.educationLevel==''){
                return this.$message.error('请选择文化程度')
            }
            if(this.form.departmentId==''){
                return this.$message.error('请输入组织机构代码')
            }
            if(this.form.engagedTime==''){
                return this.$message.error('请输入从业时间')
            }
            if(this.form.farmerTitle==''){
                return this.$message.error('请输入农民头衔')
            }

            if(this.form.creditLevel==''){
                return this.$message.error('请选择信用等级')
            }
            if(this.form.discriminator=='企业'){
                if(this.form.companyName==''){
                    return this.$message.error('请输入公司名')
                }
                if(this.form.establishedTime==''){
                    return this.$message.error('请选择成立时间')
                }
                if(this.form.fixedAssets==''){
                    return this.$message.error('请输入固定资产')
                }
                if(this.form.businessContents==''){
                    return this.$message.error('请输入经营内容')
                }
                if(this.form.isBaseOfEmployee==''){
                    return this.$message.error('请选择是否未无公害基地')
                }
                if(this.form.numberOfEmployee==''){
                    return this.$message.error('请输入员工人数')
                }
                if(this.form.featuredProducts==''){
                    return this.$message.error('请输入特色产品')
                }
            }
            
            

            let data=this.qs.stringify(this.form)

            this.$axios({
                url:'/api/owner/add',
                method:"POST",
                data:data
            }).then(res=>{
                console.log(res);
                if(res.data.status==200){
                    this.formShow=false
                    //上传给前端store
                    this.$store.commit('allOwner/addItem',this.form)
                    this.$message.success('添加成功');
                    //刷新
                    window.location.reload();
                    this.$router.go(0);

                }
            })

        },
        deleteSelect(item){
            let data=this.qs.stringify(item)

            this.$confirm('确认删除数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then((e)=>{
                if(this.IsAdmin==1){
                    this.$store.commit('allOwner/deleteItem',item.id)
                    this.tempTableData=this.AllOwner.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
                }
                //后端
                this.$axios({
                    url:'/api/owner/delete',
                    method:"POST",
                    data:data,
                }).then(res=>{
                    console.log(res);
                    if(res.data.status==200){
                        this.$message.success(res.data.data.msg);
                        //前端删除
                        //把store里的数据删除
                    }
                })
            }).catch((e)=>{
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            })


        },

        //form 设为空
        resetForm(){
            this.form={
                discriminator:'',
                id:'',

                name: '',
                mobile:'',
                birthday:'',
                sex:'',
                imgUrl:'',
                address:'',
                county:'',
                town:'',
                village:'',
                engagedTime:'',
                educationLevel:'',
                farmerTitle:'',
                departmentId:'',

                companyName:'',
                establishedTime:'',
                fixedAssets:'',
                businessContents:'',
                isBaseOfEmployee:'',
                numberOfEmployee:'',
                featuredProducts:'',
                creditLevel:'',
                comment:'',
                // checkStatus:'',
            }
        },


        beforeUpload(file) {
            this.upload(file)

            return false
        },
        //上传图片，用form-data
        upload(file){
            console.log(file);
            let type=file.name.replace(/.+\./, ".")
            this.imageName=random.randomImageName(6)+type

            const formData=new FormData()
            formData.append('file',file)
            formData.append('name',this.imageName)

            this.$axios({
                url:'/api/owner/upload',
                method:'POST',
                headers:{"Content-Type":"multipart/form-data"},
                data:formData
            }).then(res=>{
                console.log(res.data.data.imgUrl);
                this.form.imgUrl='http://localhost:3000'+res.data.data.imgUrl
            })
        },
        handleSizeChange (size) {
            this.pagesize = size;
            this.tempTableData=this.AllOwner.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
        },
        handleCurrentChange (currentPage) {
            this.currentPage = currentPage;
            this.tempTableData=this.AllOwner.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
        },


        //获取所有的镇和村
        getAllTown(){
            this.$axios({
                url:'/api/area/getAllTown',
                method:'GET',
            }).then(res=>{
                if(res.data.status==200){
                    //赋值  
                    this.$store.commit('allOwner/setTownData',res.data.data.data)
                }
            })
        },
        getALlVillage(){
            this.$axios({
                url:'/api/area/getAllVillage',
                method:'GET',
            }).then(res=>{
                if(res.data.status==200){
                    //赋值  
                    this.$store.commit('allOwner/setVillageData',res.data.data.data)
                }
            })
        },
        //获取镇和村
        getTown(){
            let data=this.qs.stringify({
                countyId:this.form.county,
            })

            this.$axios({
                url:'/api/area/getTown',
                method:'POST',
                data:data
            }).then(res=>{
                if(res.data.status==200){
                    this.townOption=res.data.data.data
                    //赋值

                }
            })
        },
        getVillage(){

            let data=this.qs.stringify({
                Tid:this.form.town,
            })

            this.$axios({
                url:'/api/area/getVillage',
                method:'POST',
                data:data
            }).then(res=>{
                if(res.data.status==200){
                    this.villageOption=res.data.data.data
                }
            })
        },

    },
    computed:{
        AllOwner(){
            return this.$store.state.allOwner.tableData
        },
        AllOwnerLength(){
            return this.$store.state.allOwner.tableData.length
        },
        Town(){
            return this.$store.state.allOwner.townData
        },
        Village(){
            return this.$store.state.allOwner.villageData
        },
        IsAdmin(){
            return this.$store.state.USERINFO.isAdmin
        }
    },
    watch:{
        AllOwner(n,o){
            this.currentPage=1
            this.tempTableData=n.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
        },
        'form.county'(n,o){
            //如果为空，返回
            if(n=='')return
            //重新选择
            this.getTown()
        },
        'form.town'(n,o){
            if(n=='')return
            //重新选择
            this.getVillage()
        },
        'form.village'(n,o){
            if(n=='')return
        },

    },
    created(){
        this.getAllOwner()
        
    },
    components:{
        side
    }
}
</script>

<style lang="less" scoped>
    .allowner{
        position: relative;
        width: 100%;
        height: 100%;
    }
    
    .show{
        display: none;
    }

    .bg{
        
        position:fixed;
        left:0;
        top:0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0,0,0,.3);
        z-index:10;

    }



    .short{
        width: 200px;
    }

    ::v-deep .el-textarea__inner{
        height: 66px!important;
    }
    // .el-form-item{
    //     // margin-bottom:5px!important;
    // }

    .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 78px;
        height: 78px;
        line-height: 78px;
        text-align: center;
    }
    .avatar {
        width: 78px;
        height: 78px;
        display: block;
    }
    .el-aside{
        padding-top:20px;
    }


    .main-owner{
        padding-top:0;
        margin-top:20px;
    }

</style>