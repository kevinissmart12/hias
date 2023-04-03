<template>
    <div class="main">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>审核列表</span>
            </div>
            <el-table :data="TableData" stripe style="width: 100%">
                <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width"
                    v-for="(item,index) in tableItem" 
                    :key="index"
                >
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="120">
                    <template slot-scope="scope">
                        <el-button @click="check(scope.row)" type="text" size="small">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!--  分页 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="CurrentPage"
            :page-size="Pagesize"
            layout="total,prev, pager, next"
            :total="length">
        </el-pagination>

        <el-dialog
            title="具体信息"
            :visible.sync="dialogVisible"
            width="75%"
        >
            <!-- product -->
            <div v-if="CheckingData.op_obj==2"> 
                <table border="1" style="width:100%"  align="center">
                    <tr>
                        <td width="100px" height="50px"></td>
                        <td align="center">新内容</td>
                        <td align="center">旧内容</td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">品种名称</td>
                        <td align="center">{{newProductTableData.name||'无'}}</td>
                        <td align="center">{{oldProductTableData.name||'无'}}</td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">所属种类</td>
                        <td align="center">{{newProductTableData.type||'无'}}</td>
                        <td align="center">{{oldProductTableData.type||'无'}}</td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">养殖方式</td>
                        <td align="center">{{newProductTableData.breedMethod||'无'}}</td>
                        <td align="center">{{oldProductTableData.breedMethod||'无'}}</td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">图片</td>
                        <td align="center"><img :src="newProductTableData.imgUrl||''" style="width:100px"></td>
                        <td align="center"><img :src="oldProductTableData.imgUrl||''" style="width:100px"></td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">描述</td>
                        <td align="center" v-html="newProductTableData.description||'无'"></td>
                        <td align="center" v-html="oldProductTableData.description||'无'"></td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">养殖技术</td>
                        <td align="center" v-html="newProductTableData.breedTech||'无'"></td>
                        <td align="center" v-html="oldProductTableData.breedTech||'无'"></td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">病害</td>
                        <td align="center" v-html="newProductTableData.diseases||'无'"></td>
                        <td align="center" v-html="oldProductTableData.diseases||'无'"></td>
                    </tr>
                </table>
            </div>
            <!-- ponds -->
            <div v-if="CheckingData.op_obj==0">
                <table border="1" style="width:100%"  align="center">
                    <tr>
                        <td width="100px" height="50px"></td>
                        <td align="center">新内容</td>
                        <td align="center" v-if="oldpondTableData!={}">旧内容</td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">区块编号</td>
                        <td align="center">{{newpondTableData.number||'无'}}</td>
                        <td align="center">{{oldpondTableData.number||'无'}}</td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">养殖方式</td>
                        <td align="center">{{newpondTableData.pondsType==0?'海水养殖':'淡水养殖'||'无'}}</td>
                        <td align="center">{{oldpondTableData.pondsType==0?'海水养殖':'淡水养殖'||'无'}}</td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">纬度</td>
                        <td align="center">{{newpondTableData.lat||'无'}}</td>
                        <td align="center">{{oldpondTableData.lat||'无'}}</td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">经度</td>
                        <td align="center">{{newpondTableData.lng||'无'}}</td>
                        <td align="center">{{oldpondTableData.lng||'无'}}</td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">面积</td>
                        <td align="center">{{newpondTableData.area||'无'}}</td>
                        <td align="center">{{oldpondTableData.area||'无'}}</td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">估算面积</td>
                        <td align="center">{{newpondTableData.estimateArea||'无'}}</td>
                        <td align="center">{{oldpondTableData.estimateArea||'无'}}</td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">所在区/县</td>
                        <td align="center">{{newpondTableData.county||'无'}}</td>
                        <td align="center">{{oldpondTableData.county||'无'}}</td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">所在镇</td>
                        <td align="center">{{newpondTableData.town||'无'}}</td>
                        <td align="center">{{oldpondTableData.town||'无'}}</td>
                    </tr>                    
                    <tr>
                        <td width="100px" height="50px" align="center">所在村</td>
                        <td align="center">{{newpondTableData.village||'无'}}</td>
                        <td align="center">{{oldpondTableData.village||'无'}}</td>
                    </tr>                    
                    <tr>
                        <td width="100px" height="50px" align="center">多边形</td>
                        <td align="center">{{newpondTableData.polygon||'无'}}</td>
                        <td align="center">{{oldpondTableData.polygon||'无'}}</td>
                    </tr>                    
                    <tr>
                        <td width="100px" height="50px" align="center">拥有者</td>
                        <td align="center">{{newpondTableData.ownerId||'无'}}</td>
                        <td align="center">{{oldpondTableData.ownerId||'无'}}</td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">养殖品种</td>
                        <td align="center">{{newpondTableData.productId||'无'}}</td>
                        <td align="center">{{oldpondTableData.productId||'无'}}</td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">年产量</td>
                        <td align="center">{{newpondTableData.productOutput||'无'}}</td>
                        <td align="center">{{oldpondTableData.productOutput||'无'}}</td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">留言</td>
                        <td align="center">{{newpondTableData.comment||'无'}}</td>
                        <td align="center">{{oldpondTableData.comment||'无'}}</td>
                    </tr>
                </table>
            </div>
            <!-- owner -->
            <div v-if="CheckingData.op_obj==1">
                <table border="1" style="width:100%"  align="center">
                    <tr>
                        <td width="100px" height="50px"></td>
                        <td align="center">新内容</td>
                        <td align="center">旧内容</td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">名称/法人</td>
                        <td align="center">{{newownerTableData.name||'无'}}</td>
                        <td align="center">{{oldownerTableData.name||'无'}}</td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">联系电话</td>
                        <td align="center">{{newownerTableData.mobile||'无'}}</td>
                        <td align="center">{{oldownerTableData.mobile||'无'}}</td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">出生年月</td>
                        <td align="center">{{newownerTableData.birthday||'无'}}</td>
                        <td align="center">{{oldownerTableData.birthday||'无'}}</td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">性别</td>
                        <td align="center">{{newownerTableData.sex||'无'}}</td>
                        <td align="center">{{oldownerTableData.sex||'无'}}</td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">图片</td>
                        <td align="center"><img :src="newownerTableData.imgUrl||''" style="width:100px"></td>
                        <td align="center"><img :src="oldownerTableData.imgUrl||''" style="width:100px"></td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">家庭住址</td>
                        <td align="center">{{newownerTableData.address||'无'}}</td>
                        <td align="center">{{oldownerTableData.address||'无'}}</td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">所在区/县</td>
                        <td align="center">{{newownerTableData.county||'无'}}</td>
                        <td align="center">{{oldownerTableData.county||'无'}}</td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">所在镇</td>
                        <td align="center">{{newownerTableData.town||'无'}}</td>
                        <td align="center">{{oldownerTableData.town||'无'}}</td>
                    </tr>                    
                    <tr>
                        <td width="100px" height="50px" align="center">所在村</td>
                        <td align="center">{{newownerTableData.village||'无'}}</td>
                        <td align="center">{{oldownerTableData.village||'无'}}</td>
                    </tr>                    
                    <tr>
                        <td width="100px" height="50px" align="center">从业时间</td>
                        <td align="center">{{newownerTableData.engagedTime||'无'}}</td>
                        <td align="center">{{oldownerTableData.engagedTime||'无'}}</td>
                    </tr>                    
                    <tr>
                        <td width="100px" height="50px" align="center">文化程度</td>
                        <td align="center">{{newownerTableData.educationLevel||'无'}}</td>
                        <td align="center">{{oldownerTableData.educationLevel||'无'}}</td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">农民头衔</td>
                        <td align="center">{{newownerTableData.farmerTitle||'无'}}</td>
                        <td align="center">{{oldownerTableData.farmerTitle||'无'}}</td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">组织机构代码</td>
                        <td align="center">{{newownerTableData.departmentId||'无'}}</td>
                        <td align="center">{{oldownerTableData.departmentId||'无'}}</td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">类型</td>
                        <td align="center">{{newownerTableData.discriminator||'无'}}</td>
                        <td align="center">{{oldownerTableData.discriminator||'无'}}</td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">公司</td>
                        <td align="center">{{newownerTableData.companyName||'无'}}</td>
                        <td align="center">{{oldownerTableData.companyName||'无'}}</td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">成立时间</td>
                        <td align="center">{{newownerTableData.establishedTime||'无'}}</td>
                        <td align="center">{{oldownerTableData.establishedTime||'无'}}</td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">固定资产</td>
                        <td align="center">{{newownerTableData.fixedAssets||'无'}}</td>
                        <td align="center">{{oldownerTableData.fixedAssets||'无'}}</td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">经营内容</td>
                        <td align="center">{{newownerTableData.businessContents||'无'}}</td>
                        <td align="center">{{oldownerTableData.businessContents||'无'}}</td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">无公害基地</td>
                        <td align="center">{{newownerTableData.isBaseOfEmployee||'无'}}</td>
                        <td align="center">{{oldownerTableData.isBaseOfEmployee||'无'}}</td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">员工人数</td>
                        <td align="center">{{newownerTableData.numberOfEmployee||'无'}}</td>
                        <td align="center">{{oldownerTableData.numberOfEmployee||'无'}}</td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">特色产品</td>
                        <td align="center">{{newownerTableData.featuredProducts||'无'}}</td>
                        <td align="center">{{oldownerTableData.featuredProducts||'无'}}</td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">信用等级</td>
                        <td align="center">{{newownerTableData.creditLevel||'无'}}</td>
                        <td align="center">{{oldownerTableData.creditLevel||'无'}}</td>
                    </tr>
                    <tr>
                        <td width="100px" height="50px" align="center">备注</td>
                        <td align="center">{{newownerTableData.comment||'无'}}</td>
                        <td align="center">{{oldownerTableData.comment||'无'}}</td>
                    </tr>
                </table>
            </div>
            <!-- <el-table v-if="tempProductTableData.length" :data="tempProductTableData" stripe style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="水产品名称">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                            <el-form-item label="所属种类">
                                <span>{{ props.row.type }}</span>
                            </el-form-item>                            
                            <el-form-item label="描述">
                                <span>{{ props.row.description }}</span>
                            </el-form-item>                            
                            <el-form-item label="图片">
                                <img style="width:90px" :src="props.row.imgUrl" alt="">
                            </el-form-item>                            
                            <el-form-item label="养殖方式">
                                <span>{{ props.row.breedMethod }}</span>
                            </el-form-item>                            
                            <el-form-item label="养殖技术">
                                <span>{{ props.row.breedTech }}</span>
                            </el-form-item>                            
                            <el-form-item label="病害">
                                <span>{{ props.row.diseases }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width"
                    v-for="(item,index) in productTableItem" 
                    :key="index"
                >
                    <template slot-scope="scope">
                        <img v-if="item.prop=='imgUrl'" :src="scope.row.imgUrl" alt="" width="90">
                        <div v-else>{{scope.row[item.prop]}}</div>
                    </template>
                </el-table-column>
            </el-table>
            <el-table v-if="temppondTableData.length" :data="temppondTableData" stripe style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="区块编号">
                                <span>{{ props.row.number }}</span>
                            </el-form-item>                            
                            <el-form-item label="纬度">
                                <span>{{ props.row.lat }}</span>
                            </el-form-item>                            
                            <el-form-item label="经度">
                                <span>{{ props.row.lng }}</span>
                            </el-form-item>                            
                            <el-form-item label="面积">
                                <span>{{ props.row.area }}</span>
                            </el-form-item>                            
                            <el-form-item label="估算面积">
                                <span>{{ props.row.estimateArea }}</span>
                            </el-form-item>                            
                            <el-form-item label="所在区/县">
                                <span>{{ props.row.county }}</span>
                            </el-form-item>                            
                            <el-form-item label="所在镇">
                                <span>{{ props.row.town }}</span>
                            </el-form-item>                            
                            <el-form-item label="所在村">
                                <span>{{ props.row.village }}</span>
                            </el-form-item>
                            <el-form-item label="多边形">
                                <span>{{ props.row.polygon }}</span>
                            </el-form-item>                            
                            <el-form-item label="拥有者">
                                <span>{{ props.row.ownerId }}</span>
                            </el-form-item>                           
                            <el-form-item label="养殖品种">
                                <span>{{ props.row.productId }}</span>
                            </el-form-item>                            
                            <el-form-item label="留言">
                                <span>{{ props.row.comment }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width"
                    v-for="(item,index) in pondTableItem" 
                    :key="index"
                >
                    <template slot-scope="scope">
                        <img v-if="item.prop=='imgUrl'" :src="scope.row.imgUrl" alt="" width="90">
                        <div v-else>{{scope.row[item.prop]}}</div>
                    </template>
                </el-table-column>
            </el-table>
            <el-table v-if="tempownerTableData.length" :data="tempownerTableData" stripe style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="名称/法人">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>                        
                        <el-form-item label="联系电话">
                            <span>{{ props.row.mobile }}</span>
                        </el-form-item>                        
                        <el-form-item label="出生年月">
                            <span>{{ props.row.birthday }}</span>
                        </el-form-item>                        
                        <el-form-item label="性别">
                            <span>{{ props.row.sex }}</span>
                        </el-form-item>                        
                        <el-form-item label="图片">
                            <img style="width:90px" :src="props.row.imgUrl" alt="">
                        </el-form-item>                        
                        <el-form-item label="家庭住址">
                            <span>{{ props.row.address }}</span>
                        </el-form-item>                        
                        <el-form-item label="所在区/县">
                            <span>{{ props.row.county }}</span>
                        </el-form-item>                        
                        <el-form-item label="所在镇">
                            <span>{{ props.row.town }}</span>
                        </el-form-item>                        
                        <el-form-item label="所在村">
                            <span>{{ props.row.village }}</span>
                        </el-form-item>                        
                        <el-form-item label="从业时间">
                            <span>{{ props.row.engagedTime }}</span>
                        </el-form-item>                        
                        <el-form-item label="文化程度">
                            <span>{{ props.row.educationLevel }}</span>
                        </el-form-item>                        
                        <el-form-item label="农民头衔">
                            <span>{{ props.row.farmerTitle }}</span>
                        </el-form-item>                        
                        <el-form-item label="组织机构代码">
                            <span>{{ props.row.departmentId }}</span>
                        </el-form-item>                        
                        <el-form-item label="类型">
                            <span>{{ props.row.discriminator }}</span>
                        </el-form-item>                        
                        <el-form-item label="公司">
                            <span>{{ props.row.companyName }}</span>
                        </el-form-item>                        
                        <el-form-item label="成立时间">
                            <span>{{ props.row.establishedTime }}</span>
                        </el-form-item>                        
                        <el-form-item label="固定资产">
                            <span>{{ props.row.fixedAssets }}</span>
                        </el-form-item>                        
                        <el-form-item label="经营内容">
                            <span>{{ props.row.businessContents }}</span>
                        </el-form-item>                        
                        <el-form-item label="无公害基地">
                            <span>{{ props.row.isBaseOfEmployee }}</span>
                        </el-form-item>                        
                        <el-form-item label="员工人数">
                            <span>{{ props.row.numberOfEmployee }}</span>
                        </el-form-item>                        
                        <el-form-item label="特色产品">
                            <span>{{ props.row.featuredProducts }}</span>
                        </el-form-item>                        
                        <el-form-item label="信用等级">
                            <span>{{ props.row.creditLevel }}</span>
                        </el-form-item>                        
                        <el-form-item label="备注">
                            <span>{{ props.row.comment }}</span>
                        </el-form-item>                        


                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width"
                    v-for="(item,index) in ownerTableItem" 
                    :key="index"
                >
                    <template slot-scope="scope">
                        <img v-if="item.prop=='imgUrl'" :src="scope.row.imgUrl" alt="" width="90">
                        <div v-else>{{scope.row[item.prop]}}</div>
                    </template>
                </el-table-column>
            </el-table> -->

            <span slot="footer" class="dialog-footer">
                <el-button v-if="(CheckingData.checkStatus=='未通过'||CheckingData.checkStatus=='未审核')&&CheckingData.type!='删除'" type="primary" @click="pass()">通  过</el-button>
                <el-button v-if="(CheckingData.checkStatus=='已通过'||CheckingData.checkStatus=='未审核')&&CheckingData.type!='删除'" type="danger" @click="deny()">不通过</el-button>
                
                <el-button v-if="CheckingData.type=='删除'&&CheckingData.checkStatus=='已通过'" type="primary" @click="restore">还  原</el-button>
                <el-button v-if="CheckingData.type=='删除'&&(CheckingData.checkStatus=='未审核'||CheckingData.checkStatus=='未通过')" type="danger" @click="comfirmDelete">确认删除</el-button>
                <el-button v-if="CheckingData.type=='删除'&&CheckingData.checkStatus=='未审核'" type="primary" @click="denyDelete">不通过删除</el-button>

            </span>
        </el-dialog>
    </div>
</template>

<script>
import time from '../../api/time'
export default {
    name:"Main",
    data(){
        return{
            tableItem:[
                {'id':'1',prop:'uid',label:'提交人',width:'150'},
                {'id':'2',prop:'type',label:'类型',width:'100'},
                {'id':'3',prop:'op_obj',label:'操作对象',width:'150'},
                {'id':'4',prop:'checkStatus',label:'审核情况',width:'100'},
                {'id':'5',prop:'checkResult',label:'审核结果',width:'200'},
                {'id':'6',prop:'time',label:'时间',width:'200'}, 
            ],

            length:0,
            dialogVisible:false,
            //池塘 
            pondTableItem:[
                {'id':'1',prop:'number',label:'区块编号',width:'150'},
                {'id':'2',prop:'lat',label:'纬度',width:'150'},
                {'id':'3',prop:'lng',label:'经度',width:'150'},
                {'id':'4',prop:'area',label:'面积',width:'150'},
                {'id':'5',prop:'estimateArea',label:'估算面积',width:'150'},
                {'id':'6',prop:'county',label:'所在区/县',width:'150'},
                {'id':'7',prop:'town',label:'所在镇',width:'150'},
                {'id':'8',prop:'village',label:'所在村',width:'150'},
                {'id':'9',prop:'polygon',label:'多边形',width:'150'},
                {'id':'10',prop:'ownerId',label:'拥有者',width:'150'},
                {'id':'11',prop:'productId',label:'养殖品种',width:'150'},
                {'id':'12',prop:'comment',label:'留言',width:'150'},
            ],
            newpondTableData:{},
            oldpondTableData:{},
            //拥有者
            ownerTableItem:[
                {'id':'1',prop:'name',label:'名称/法人',width:'150'},
                {'id':'2',prop:'mobile',label:'联系电话',width:'150'},
                {'id':'3',prop:'birthday',label:'出生年月',width:'150'},
                {'id':'4',prop:'sex',label:'性别',width:'150'},
                {'id':'5',prop:'imgUrl',label:'图片',width:'150'},
                {'id':'6',prop:'address',label:'家庭住址',width:'150'},
                {'id':'7',prop:'county',label:'所在区/县',width:'150'},
                {'id':'8',prop:'town',label:'所在镇',width:'150'},
                {'id':'9',prop:'village',label:'所在村',width:'150'},
                {'id':'10',prop:'engagedTime',label:'从业时间',width:'150'},
                {'id':'11',prop:'educationLevel',label:'文化程度',width:'150'},
                {'id':'12',prop:'farmerTitle',label:'农民头衔',width:'150'},
                {'id':'13',prop:'departmentId',label:'组织机构代码',width:'150'},
                {'id':'14',prop:'discriminator',label:'类型',width:'150'},
                {'id':'15',prop:'companyName',label:'公司',width:'150'},
                {'id':'16',prop:'establishedTime',label:'成立时间',width:'150'},
                {'id':'17',prop:'fixedAssets',label:'固定资产',width:'150'},
                {'id':'18',prop:'businessContents',label:'经营内容',width:'150'},
                {'id':'18',prop:'isBaseOfEmployee',label:'无公害基地',width:'150'},
                {'id':'20',prop:'numberOfEmployee',label:'员工人数',width:'150'},
                {'id':'21',prop:'featuredProducts',label:'特色产品',width:'150'},
                {'id':'22',prop:'creditLevel',label:'信用等级',width:'150'},
                {'id':'23',prop:'comment',label:'备注',width:'150'},

            ],
            newownerTableData:{},
            oldownerTableData:{},

            //水产品
            productTableItem:[
                {'id':'1',prop:'name',label:'水产品名称',width:'150'},
                {'id':'2',prop:'type',label:'所属种类',width:'150'},
                {'id':'3',prop:'description',label:'描述',width:'150'},
                {'id':'4',prop:'imgUrl',label:'图片',width:'150'},
                {'id':'5',prop:'breedMethod',label:'养殖方式',width:'150'},
                {'id':'6',prop:'breedTech',label:'养殖技术',width:'150'},
                {'id':'7',prop:'diseases',label:'病害',width:'150'},
            ],
            newProductTableData:{},
            oldProductTableData:{},

        }
    },
    methods:{
        getDialog(){
            let data=this.qs.stringify({
                front:(this.CurrentPage-1)*this.Pagesize,
                end:this.CurrentPage*this.Pagesize
            })
            // console.log(data);
            this.$axios({
                url:'/api/dialog/getAll',
                method:'POST',
                data:data
            }).then(res=>{
                // console.log(res.data);
                if(res.data.status==200){
                    this.$store.commit('dialog/setTableData',res.data.data.data)
                    this.length=res.data.data.length
                }
            })
        },
        search(){
            
            let data=this.qs.stringify({
                uid: this.Form.uid,
                username:this.Form.username,
                type:this.Form.type,
                op_obj:this.Form.op_obj,
                front:(this.CurrentPage-1)*this.Pagesize,
                end:this.CurrentPage*this.Pagesize,
            })
            // console.log(data);

            this.$axios({
                url:"/api/dialog/search",
                method:"POST",
                data:data
            }).then(res=>{
                console.log(res.data);
                if(res.data.status==200){
                    this.$message.success(res.data.data.msg);
                    if(res.data.data.has==0){
                        return
                    }
                    this.$store.commit('dialog/setTableData',res.data.data.data)
                    this.length=res.data.data.slength
                    // this.$store.commit('dialog/setSearch',false)
                    this.$store.commit('dialog/setForm',{...this.Form,search:'None'})


                }
            })
        },
        getUser(){
            this.$axios({
                url:'/api/user/getAll',
                method:'GET'
            }).then(res=>{
                // console.log(res.data);
                if(res.data.status==200){
                    this.$store.commit('dialog/setUserData',res.data.data.data)
                    this.getAllTown()
                    this.getALlVillage()
                    this.getProduct()
                    this.getOwner()
                    this.getDialog()

                }
            })
        },
        //获取所有的镇和村
        getAllTown(){
            if(localStorage.getItem('town')){
                this.$store.commit('dialog/setTownData')
            }else{
                this.$axios({
                    url:'/api/area/getAllTown',
                    method:'GET',
                }).then(res=>{
                    if(res.data.status==200){
                        //赋值
                        this.$store.commit('dialog/setTownData',res.data.data.data)
                    }
                })
            }
            
        },
        getALlVillage(){
            if(localStorage.getItem('village')){
                this.$store.commit('dialog/setVillageData')
            }else{
                this.$axios({
                    url:'/api/area/getAllVillage',
                    method:'GET',
                }).then(res=>{
                    if(res.data.status==200){
                        //赋值
                        this.$store.commit('dialog/setVillageData',res.data.data.data)
                    }
                })
            }

        },
        //获取product
        getProduct(){
            this.$axios({
                url:'/api/products/getAll',
                method:"GET",
            }).then(res=>{
                if(res.data.status==200){
                    this.$store.commit('dialog/setProductData',res.data.data.data)
                }
            })
        },
        //获取owner
        getOwner(){
            this.$axios({
                url:'/api/owner/getAll',
                method:"GET",
            }).then(res=>{
                if(res.data.status==200){
                    this.$store.commit('dialog/setOwnerData',res.data.data.data)
                }
            })
        },        
        handleSizeChange (size) {
            this.pagesize = size;
            this.getDialog()
        },
        handleCurrentChange (currentPage) {
            this.$store.commit('dialog/setCurrentPage',currentPage)
            if(this.Search){
                this.search()
            }else{
                this.getDialog()                
            }

        },
        check(item){
            // console.log(item);
            this.dialogVisible=true
            
            // console.log(JSON.parse(decodeURIComponent(item.old_obj)));

            this.newpondTableData={}
            this.oldpondTableData={}
            this.newownerTableData={}
            this.oldownerTableData={}
            this.newProductTableData={}
            this.oldProductTableData={}

            this.$store.commit('dialog/setCheckingData',item)
            if(item.new_obj){
                // console.log(item);
                let new_obj=JSON.parse(decodeURIComponent(item.new_obj))
                // console.log(new_obj);
                //城镇信息
                this.CountyData.forEach((ci,cv)=>{
                    if(ci.id==new_obj.county){
                        new_obj.county=ci.county
                    }
                })
                this.TownData.forEach((ti,tv)=>{
                    if(ti.id==new_obj.town){
                        new_obj.town=ti.town
                    }
                })           
                this.VillageData.forEach((vi,vv)=>{
                    if(vi.id==new_obj.village){
                        new_obj.village=vi.village
                    }
                })
                //修改用户
                this.OwnerData.forEach((oi,ov)=>{
                    if(oi.id==new_obj.ownerId){
                        new_obj.ownerId=oi.name
                    }
                })
                //水产品
                this.ProductData.forEach((pi,pv)=>{
                    if(pi.id==new_obj.productId){
                        new_obj.productId=pi.name
                    }
                })

                if(item.op_obj=='池塘信息'){
                    this.newpondTableData=new_obj
                }else if(item.op_obj=='拥有者信息'){
                    this.newownerTableData=new_obj
                }else if(item.op_obj=='水产品信息'){
                    this.newProductTableData=new_obj
                }
            }
            if(item.old_obj){
                let old_obj=JSON.parse(decodeURIComponent(item.old_obj))
                //城镇信息
                this.CountyData.forEach((ci,cv)=>{
                    if(ci.id==old_obj.county){
                        old_obj.county=ci.county
                    }
                })
                this.TownData.forEach((ti,tv)=>{
                    if(ti.id==old_obj.town){
                        old_obj.town=ti.town
                    }
                })           
                this.VillageData.forEach((vi,vv)=>{
                    if(vi.id==old_obj.village){
                        old_obj.village=vi.village
                    }
                })
                //修改用户
                this.OwnerData.forEach((oi,ov)=>{
                    if(oi.id==old_obj.ownerId){
                        old_obj.ownerId=oi.name
                    }
                })
                //水产品
                this.ProductData.forEach((pi,pv)=>{
                    if(pi.id==old_obj.productId){
                        old_obj.productId=pi.name
                    }
                })

                if(item.op_obj=='池塘信息'){
                    this.oldpondTableData=old_obj
                }else if(item.op_obj=='拥有者信息'){
                    this.oldownerTableData=old_obj
                }else if(item.op_obj=='水产品信息'){
                    this.oldProductTableData=old_obj
                }
            }
            
        },
        pass(){
            let data=this.qs.stringify({
                id:this.CheckingData.id,
                checkStatus:1,
                op_obj:this.CheckingData.op_obj,
                op_obj_id:this.CheckingData.op_obj_id,
                type:this.CheckingData.type,
                CS:this.CheckingData.checkStatus
            })
            //修改
            this.$axios({
                url:'/api/dialog/pass',
                method:'POST',
                data:data
            }).then(res=>{
                console.log(res.data);
                if(res.data.status==200){
                    this.dialogVisible=false
                    if(res.data.deleteStatus==1){
                        return this.$message.warning('当前对象已被删除');
                    }
                    
                    this.$message.success('已通过');
                    this.TableData.forEach((i,v)=>{
                        if(i.id==this.CheckingData.id){
                            i.checkStatus='已通过'
                        }
                    })
                }
            })
        },
        deny(){
            let data=this.qs.stringify({
                id:this.CheckingData.id,
                checkStatus:2,
                op_obj:this.CheckingData.op_obj,
                op_obj_id:this.CheckingData.op_obj_id,
                type:this.CheckingData.type,
                CS:this.CheckingData.checkStatus
            })
            //修改
            this.$axios({
                url:'/api/dialog/deny',
                method:'POST',
                data:data
            }).then(res=>{
                console.log(res.data);
                if(res.data.status==200){
                    this.dialogVisible=false
                    if(res.data.deleteStatus==1){
                        return this.$message.warning('当前对象已被删除');
                    }
                    this.$message.success('已拒绝');
                    this.TableData.forEach((i,v)=>{
                        if(i.id==this.CheckingData.id){
                            i.checkStatus='未通过'
                        }
                    })
                }
            })
        },
        restore(){
            let data=this.qs.stringify({
                id:this.CheckingData.id,
                checkStatus:1,
                op_obj:this.CheckingData.op_obj,
                op_obj_id:this.CheckingData.op_obj_id
            })
            //修改
            this.$axios({
                url:'/api/dialog/restore',
                method:'POST',
                data:data
            }).then(res=>{
                console.log(res.data);
                if(res.data.status==200){
                    this.dialogVisible=false
                    this.$message.success('已还原');
                    this.$store.commit('dialog/deleteRestoredData')
                }
            })
        },
        comfirmDelete(){
            let data=this.qs.stringify({
                id:this.CheckingData.id,
                checkStatus:1,
                op_obj:this.CheckingData.op_obj,
                op_obj_id:this.CheckingData.op_obj_id
            })
            this.$axios({
                url:'/api/dialog/confirmDelete',
                method:'POST',
                data:data
            }).then(res=>{
                console.log(res.data);
                if(res.data.status==200){
                    this.dialogVisible=false
                    this.$message.warning(res.data.data.msg);
                    this.TableData.forEach((i,v)=>{
                        if(i.id==this.CheckingData.id){
                            i.checkStatus='已通过'
                        }
                    })
                }
            })
        },
        denyDelete(){
            let data=this.qs.stringify({
                id:this.CheckingData.id,
                checkStatus:2,
            })
            this.$axios({
                url:'/api/dialog/denyDelete',
                method:'POST',
                data:data
            }).then(res=>{
                console.log(res.data);
                if(res.data.status==200){
                    this.dialogVisible=false
                    this.$message.warning(res.data.data.msg);
                    this.TableData.forEach((i,v)=>{
                        if(i.id==this.CheckingData.id){
                            i.checkStatus='未通过'
                        }
                    })
                }
            })
        }

    },
    created(){
        this.getUser()
    },
    computed:{
        Search(){
            return this.$store.state.dialog.search
        },
        Form(){
            return this.$store.state.dialog.form
        },
        TableData(){
            return this.$store.state.dialog.tableData
        },
        CurrentPage(){
            return this.$store.state.dialog.currentPage
        },        
        Pagesize(){
            return this.$store.state.dialog.pageSize
        },
        UserData(){
            return this.$store.state.dialog.userData
        },
        ProductData(){
            return this.$store.state.dialog.productData
        },
        OwnerData(){
            return this.$store.state.dialog.ownerData
        },
        CountyData(){
            return this.$store.state.dialog.countyData
        },
        TownData(){
            return this.$store.state.dialog.townData
        },
        VillageData(){
            return this.$store.state.dialog.villageData
        },
        CheckingData(){
            return this.$store.state.dialog.checkingData
        }
    },
    watch:{
        Search(n){
            if(!n){
                this.getDialog()
            }
        },
        Form(n){
            if(n.search=='None')return
            this.search()
            
        }
    }
}   
</script>

<style lang="less" scoped>
    .main{
        width: 100%;
        height: 100%;
    }

    .demo-table-expand {
        font-size: 0;
    }
    ::v-deep .demo-table-expand label {
        width: 100px;
        color: #e98000;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 100%;
    }
    table {
        border-collapse: collapse;
    }
</style>