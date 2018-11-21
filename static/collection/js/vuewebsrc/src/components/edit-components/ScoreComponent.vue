<template>
  <li >
        <p>
            <em></em>评分
            <span class="sectionRBoxDownBoxSpan2">
                <input type="checkbox" name="choice-box" id="PF_bOX" class="choice-box_hind"  v-model="currentItem.required" @input="emitClick">
                <label for="PF_bOX" class="choice-box"></label>
            </span>
            <span class="sectionRBoxDownBoxSpan1">这个是必填项</span>
        </p>
        <div class="sectionRBoxDownBoxCon">
            <input type="text" placeholder="评分" v-model="currentItem.label" />
        </div>
        <div class="sectionRBoxDownBoxCon">
            <p>满分</p>
            <p class="fennum"><span class="curfen">3</span><span>5</span><span>10</span></p>
        </div>
        <div class="sectionRBoxDownBoxCon">
            <p>外观</p>
            <p class="waiguang"><span class="wai1 curwai"></span><span class="wai2"></span><span class="wai3"></span><span class="wai4"></span><span class="wai5"></span></p>
        </div>
        <div class="sectionRBoxDownBoxCon">
            <p>描述</p>
        </div>
        <div class="sectionRBoxDownBoxCon">
            <textarea rows="5" id="PFMS_BOX" placeholder="在这里输入评分描述" v-model="currentItem.describe"  @input="emitClick"></textarea>
        </div>
    </li>
</template>
<script>
    export default{
        props: ['currentitem'],
        data: function(){
            return {
                currentItem:this.currentitem
            }
        },
        methods: {
         emitClick:function(){

            
         }
        },
        mounted(){
            console.log(this.currentitem)
            
//this.currentItem=this.currentitem
        },
        computed:{
            label:{
                get(){
                    return this.currentitem.label;
                },
                set(newVal){
                     console.log(newVal) ;
                     this.currentItem.label=newVal;
                    //this.$emit('getedititem',newVal,'label')      
                }
            }
        },
//         beforeCreate(){
//             console.log(this.currentitem)
//         },
//         created(){
//             console.log(this.currentitem)
//         },
//         beforeUpdate(){
//            console.log(this.currentitem)
//         },
         updated(){
   console.log(this.currentitem)
          
         },
//         activated(){
//             console.log(this.currentitem)
//         },
//         deactivated (){
//               console.log(this.currentitem)
//         }
        
    }
</script>
<style>

</style>
