<template>
  <li >
    <p>
        <em></em>校区
        <span class="sectionRBoxDownBoxSpan2">
            <input type="checkbox" name="choice-box" id="XQ_bOXTwo" class="choice-box_hind"  v-model="currentItem.required">
            <label for="XQ_bOXTwo" class="choice-box"></label>
        </span>
        <span class="sectionRBoxDownBoxSpan1">这个是必填项</span>
    </p>
    <div class="XQAndCon">
        <p>选项内容<span class="BJspan">校区数据与北京学校同步。</span></p>
        <div class="XQAndCon1"> 
            <select v-model="currentItem.departmentSelect" @change="emitClick">
                 <option :value="'请选择'">请选择</option>
                <option v-for="(item,index) in currentItem.department" :key='index'>{{item.name}}</option>
            </select>
        </div>
        <p>不是全部校区参与，请点击<a href="#" @click="manual=!manual">手动设置</a></p>
        <transition name="bounceUp" >
        <div class="XQAndCon2 clear" v-if="manual" >
            <div>
                <input @change="changeAll" v-model="currentItem.allselect" type="checkbox" name="choice-box-XQ" id="XQ_bOXTwo1" class="choice-box_hind" checked="checked">
                <label for="XQ_bOXTwo1" class="choice-box-XQ"></label><span>全选</span>
            </div>
            <div v-for="(item,index) in currentItem.getvalues" :key="index">
                 <div>
                    <input 
                    v-model="currentItem.values[index].checked"
                    @change="changeAllQu(currentItem.values[index].checked,index)"
                     type="checkbox" name="choice-box-XQ" :id="'forqu'+index" class="choice-box_hind" >
                    <label :for="'forqu'+index" class="choice-box-XQ" style="float:left"></label><span style="margin-left:10px">{{item.firstSelect.name}}</span>
                </div>
                <div v-for="(secondSelect,indexs) in item.secondSelect" :key="secondSelect['school_id']" style="margin-left: 20px;margin-top: 3px;">
                    <input 
                    v-model="currentItem.values[index].secondSelect"
                      v-bind:value="secondSelect" 
                      type="checkbox" name="choice-box-XQ"
                       :id="secondSelect['school_id']" 
                       class="choice-box_hind" >
                    <label :for="secondSelect['school_id']" class="choice-box-XQ" style="float:left"></label><span style="clear:both;margin-left:10px">{{secondSelect.school_name}}</span>
                </div>
              
            </div>
          
        </div>
        </transition>
    </div>
</li>
</template>
<script>
    export default{
        props: ['currentitemitem'],
        data: function(){
            return {
                currentItem:this.currentitemitem,
                manual:false
            }
        },
        methods: {
         emitClick:function(){
            this.$emit('getedititem',this.currentItem);
            var that=this;
            that.currentItem.values=[];
            that.currentItem.getvalues=[]
            $.ajax(
              {
                url: this.geturls(),
                method: "GET",
                dataType: "jsonp",
                data: {}
              }
            ).then(function (data) {
            
                for(let i=0;i<data.areaList.length;i++){
                    let obj=data.areaList[i];
                    if(!data.schoolMap[obj.areaId]){
continue
                    }


                    let arr=[];
                    for (let l = 0; l < data.schoolMap[obj.areaId].length; l++) {
                        let thatSecond = data.schoolMap[obj.areaId][l];
                        let obj2={
                            area_id:thatSecond.area_id,
                            school_name:thatSecond.school_name,
                            school_id:thatSecond.school_id
                        }
                        arr.push(obj2);
                        
                    }
                    let setObjval={
                        checked:true,
                        firstSelect:{
                            
                            name:obj.areaName,
                            
                            
                        },
                        secondSelect:arr

                    
                    }
                    let setObj={
                         checked:true,
                        firstSelect:{
                            name:obj.areaName,
                           
                        },
                        secondSelect:arr

                    
                    }
                    that.currentItem.selectthis="请选择城区"
                    that.currentItem.getvalues.push(setObj);
                    that.currentItem.values.push(setObjval);
                }
                that.currentItem.allselect=true;
                that.$emit('getedititem',that.currentItem);
               


            }, function (err) {

            })    
            
         },
         changeAllQu:function(index,s){
                console.log(index);
                if(index){
                    this.currentItem.values[s].secondSelect=[];
                        for(let i=0;i<this.currentItem.getvalues[s].secondSelect.length;i++){
                            let obj=this.currentItem.getvalues[s].secondSelect[i];
                            this.currentItem.values[s].secondSelect.push(obj);
                        }
                        this.isall()?this.currentItem.allselect=true:this.currentItem.allselect=false;

                }else{
                    this.currentItem.values[s].secondSelect=[];
                     this.currentItem.allselect=false
                }
         },
          changeAll:function(index){
               for(let i=0;i<this.currentItem.values.length;i++){
                            let obj=this.currentItem.values[i];
                           
                            if(this.currentItem.allselect){
                                obj.checked=true        
                            this.allselectfa(true,i);
                            }else{
                                 obj.checked=false      
                                this.allselectfa(false,i);
                            }
                    }   
                
               
         },
         allselectfa:function(index,s){
              if(index){
                    this.currentItem.values[s].secondSelect=[];
                        for(let i=0;i<this.currentItem.getvalues[s].secondSelect.length;i++){
                            let obj=this.currentItem.getvalues[s].secondSelect[i];
                            this.currentItem.values[s].secondSelect.push(obj);
                        }
                       

                }else{
                    this.currentItem.values[s].secondSelect=[];
                     
                }
         },
         isall:function(){
             let isallqu=true;
             for(let i=0;i<this.currentItem.values.length;i++){
                let obj=this.currentItem.values[i];
                if(obj.checked){

                }else{
                    isallqu=false;
                    break;
                }
                
            }    
            return isallqu;
         },
         geturls:function(){
                for(let i=0 ;i<this.currentItem.department.length;i++){
                    let obj=this.currentItem.department[i];
                
                    if(obj.name==this.currentItem.departmentSelect){
                        return obj.url
                    }
                }
            }
        },
        mounted(){
            console.log(this.currentitem)
            
//this.currentItem=this.currentitem
        },
        computed:{
            geturl(){
                for(let i=0 ;i<this.currentItem.department.length;i++){
                    let obj=this.currentItem.department[i];
                
                    if(obj.name==this.currentItem.departmentSelect){
                        return obj.url
                    }
                }
            }
        },

        
    }
</script>
<style>

</style>
