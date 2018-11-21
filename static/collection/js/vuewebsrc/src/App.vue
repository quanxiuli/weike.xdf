<template>

  <div class="GlobalSettingBox" id="app">


    <div class="GlobalSettingContent">
      <!--内容 开始-->
      <div class="section">
        <ContactComponent @conitorcontactcomponent="contactComponentClick"
                          @conitorcontactfooter="contactComponentFooter"
                          :enable_image="enable_image"
                          :enable_attachment="enable_attachment"
                          :schoolid="schoolid"
        ></ContactComponent>
   
        <div class="sectionZ">
          <div class="sectionZBox scroll">
            <h2 class="imglogo"></h2>
            <div class="banner" @click="openBannerClick" v-if="globalSet.template>1">
              <img :src="banner.imgURL?banner.imgURL:staticURL+'/public/collection/images/MobileImg/banner.jpg'" alt=""/>
            </div>
            <div class="BT" >
              <p  @click="openHeadClick" class="sectionZBox1 BTpName">{{globalSet.label?globalSet.label:"这里是表单名称"}}</p>
<!--
              <p class="sectionZBox2">{{globalSet.content?globalSet.content:"这里是表单描述"}}</p>
-->
              <div ref="mybtquill" id="btquill" style="background: white;z-index: 10;position: relative;height: 199px">
                <quill-editor v-model="globalSet.content"
                              ref="myQuillEditor"
                              :options="editorOption"
                              @blur="onEditorBlur($event)"
                              @focus="onEditorFocus($event)"
                              @ready="onEditorReady($event)"
                style="height: 133px;">
                </quill-editor>
              </div>

            </div>

            <form>
              <div class="formAll">
                <Container v-if="formList.length>0" @drop="onDrop('formList', $event)" :group-name="'1'"
                           :get-child-payload="getChildPayloadu">
                  <Draggable v-for="(item,index) in formList" :key="index">
                    <div class="formGroup clear" v-if="item.type=='input'" style="box-sizing: content-box"
                    >
                      <div class="formGroupL" @click="formInputClick(index,item)">
                        <label for=""> {{item.label?item.label:"单行文本"}}<b v-if="item.required">*</b></label>
                        <input type="text" id="name" v-bind:placeholder="item.placeholder" readonly="readonly">
                          <div class="validatemobile" v-if="item.verification&&item.alt=='mobile'">
                            <label for="CellPhoneNumber">短信验证码<b>*</b></label>
                            <input type="text"  class="validatenum">
                            <div class="validate">
                                <input type="button" value="获取验证码" class="validatebtn">
                            </div>
                          </div>
                      </div>
                      <p class="formGroupR" @click.stop="removeForm(index)"><span></span></p>
                    </div>

                    <!--性别-->
                    <div v-else-if="item.type=='sex'" class="formGroup clear">
                      <div class="formGroupL" @click="formInputClick(index,item)">
                        <label for="">{{item.label}}<b v-if="item.required">*</b></label>
                        <div class="formGroupL_XB">
                          <input type="radio" id="nan" name="sex" value="1" v-model="item.picked"
                                 class="choice-box_hind">
                          <label name="choice-box_Na" for="nan" class="checked choice-box-Na"></label><span>男</span>
                          <input type="radio" id="nv" name="sex" value="0" v-model="item.picked"
                                 class="choice-box_hind">
                          <label name="choice-box_Na" for="nv"
                                 class="choice-box-Na1 choice-box_hind_R"></label><span>女</span>
                        </div>
                      </div>
                      <p class="formGroupR" @click.stop="removeForm(index)"><span></span></p>
                    </div>
                    <!--出生日期-->
                    <div v-else-if="item.type=='dateBirth'" class="formGroup clear" @click="formInputClick(index,item)">
                      <div class="formGroupL">
                        <label for="">出生日期<b v-if="item.required">*</b></label>
                        <div class="formGroupL_CSRQ">
                          <input type="date" placeholder="请选择出生日期" class="CSRQ" id="DateOfBirth" readonly="readonly"/>
                          <span></span>

                        </div>
                      </div>
                      <p class="formGroupR" @click.stop="removeForm(index)"><span></span></p>
                    </div>
                    <!--年龄-->
                    <div v-else-if="item.type=='selectoptions'" class="formGroup clear"
                         @click="formInputClick(index,item)">
                      <div class="formGroupL">
                        <label for="">{{item.label}}<b v-if="item.required">*</b></label>
                        <select name="age" id="age" v-model="item.picked">
                          
                           <option  v-bind:value="item.defaultValues.value">{{item.defaultValues.value}}</option>
                          <option v-for="options in item.values" v-bind:value="options.value" >{{options.value}}</option>
                        </select>
                      </div>
                      <p class="formGroupR" @click.stop="removeForm(index)"><span></span></p>
                    </div>
                    <!--校区-->
                    <div v-else-if="item.type=='selectoptionsXQ'&&schoolid!==1" class="formGroup clear"
                         @click="formInputClick(index,item)">
                      <div class="formGroupL">
                        <label for="">{{item.label}}<b v-if="item.required">*</b></label>
                        <select name="age" id="age">
                          <option v-for="options in item.values" v-bind:value="options.sCode">{{options.sName}}</option>
                        </select>
                      </div>
                      <p class="formGroupR" @click.stop="removeForm(index)"><span></span></p>
                    </div>
                    <!-- 北京校区 -->
                      <div v-else-if="item.type=='selectoptionsXQ'&&schoolid==1&&item.bindType=='selectTwo'"  class="formGroup clear" @click="formInputClick(index,item)">
                        <div class="formGroupL">
                            <label for="campusEJ">校区<b v-if="item.required">*</b></label>
                            <div class="formGroupL_EJLD">
                                <select name="campusEJ" id="campusEJ" v-model="formList[index].selectthis">
                                    <option value='请选择城区'>请选择城区</option>
                                    <option v-for="options in item.values" v-bind:value="options">{{options.firstSelect.name}}</option>
                                </select>
                                <select name="campusEJ" id="campusEJ1">
                                    <option value='请选择校区'>请选择校区</option>
                                    <option v-for="optionstwo in formList[index].selectthis.secondSelect">{{optionstwo.school_name}}</option>
                                </select>
                            </div>
                        </div>
                        <p class="formGroupR"><span @click.stop="removeForm(index)"></span></p>
                    </div>
                      <!--校区-->
                    <div v-else-if="item.type=='selectoptionsXQ'&&schoolid==1&&item.bindType=='select'" class="formGroup clear"
                         @click="formInputClick(index,item)">
                      <div class="formGroupL">
                        <label for="">{{item.label}}<b v-if="item.required">*</b></label>
                        <select name="age" id="age">
                          <option v-for="options in item.values" v-bind:value="options.sCode">{{options.sName}}</option>
                        </select>
                      </div>
                      <p class="formGroupR" @click.stop="removeForm(index)"><span></span></p>
                    </div>
                    <!--下拉框-->
                    <div v-else-if="item.type=='selectoptionsdynamic'" class="formGroup clear"
                         @click="formInputClick(index,item)">
                      <div class="formGroupL">
                        <label for="">{{item.label?item.label:"下拉框"}}<b v-if="item.required">*</b></label>
                        <select name="age" id="age" v-model="item.picked">
                          <option v-for="options in item.values" v-bind:value="options.value">{{options.name}}</option>
                        </select>
                      </div>
                      <p class="formGroupR" @click.stop="removeForm(index)"><span></span></p>
                    </div>
                    <!--行政区-->
                    <div v-else-if="item.type=='selectPMC'" class="formGroup clear"
                         @click="formInputClick(index,item)">
                      <div class="formGroupL">
                        <label for="">{{item.label}}<b v-if="item.required">*</b></label>
                        <div class="formGroupL_XZQ">
                          <select name="AdministrativeArea" id="AdministrativeArea">
                            <option>省</option>
                          </select>
                          <select name="AdministrativeArea1" id="AdministrativeArea1">
                            <option>市</option>
                          </select>
                          <select name="AdministrativeArea2" id="AdministrativeArea2" class="AdministrativeArea2">
                            <option>行政区</option>
                          </select>
                        </div>
                      </div>
                      <p class="formGroupR" @click.stop="removeForm(index)"><span></span></p>
                    </div>
                    <!--年级-->
                    <div v-else-if="item.type=='radioandcheckbox'" class="formGroup clear"
                         @click="formInputClick(index,item)">
                      <div class="formGroupL">
                        <label for="">{{item.label}} ( <span>{{item.picked==1?"多选":"单选"}}</span> )<b
                          v-if="item.required">*</b></label>
                        <div class="XQAndCon XQAndCon_XG">
                          <div class="XQAndCon2 clear" v-if="item.picked==1">
                            <div>
                              <input type="checkbox" name="choice-box-XQ" id="NJDX_bOX99" class="choice-box_hind"
                              >
                              <label for="NJDX_bOX99" class="choice-box-XQ"></label><span>全选</span>
                            </div>
                            <div v-for="(currentitem,index) in item.values">
                              <input type="checkbox" name="choice-box-XQ" v-bind:id="'NJDX_bOX'+index"
                                     class="choice-box_hind"

                              >
                              <!--  v-model="item.values"
                                     v-bind:value="currentitem"-->
                              <label v-bind:for="'NJDX_bOX'+index"
                                     class="choice-box-XQ"></label><span>{{currentitem}}</span>
                            </div>

                          </div>
                          <div class="XQAndCon3 clear" v-if="item.picked==2">
                            <div v-for="(currentitem,index) in item.values" v-bind:key="index">
                              <input type="radio" v-bind:id="'NJDX1_SF'+index" name="NJDX_SF" class="choice-box_hind"
                              >
                              <!-- v-model="item.values"
                                     v-bind:value="currentitem"-->
                              <label v-bind:for="'NJDX1_SF'+index" class="checked choice-box-NJDX"></label><span>{{currentitem}}</span>
                            </div>

                          </div>
                        </div>
                      </div>
                      <p class="formGroupR" @click.stop="removeForm(index)"><span></span></p>
                    </div>
                    <!--课程-->
                    <div v-else-if="item.type=='curriculum'" class="formGroup clear"
                         @click="formInputClick(index,item)">
                      <div class="formGroupL">
                        <label for="">{{item.label}} ( <span>{{item.picked==1?"多选":"单选"}}</span> )<b
                          v-if="item.required">*</b></label>
                        <div class="XQAndCon XQAndCon_XG">
                          <div class="XQAndCon2 clear" v-if="item.picked==1">
                            <!-- <div>
                              <input type="checkbox" name="choice-box-XQ" id="NJDX_bOX99" class="choice-box_hind"
                              >
                              <label for="NJDX_bOX99" class="choice-box-XQ"></label><span>全选</span>
                            </div> -->
                            <div v-for="(currentitem,index) in item.values">
                              <input type="checkbox" name="choice-box-XQ" v-bind:id="'NJDX_bOX'+index"
                                     class="choice-box_hind"

                              >
                              <!--  v-model="item.values"
                                     v-bind:value="currentitem"-->
                              <label v-bind:for="'NJDX_bOX'+index"
                                     class="choice-box-XQ"></label><span>{{currentitem.name}}</span>
                            </div>

                          </div>
                          <div class="XQAndCon3 clear" v-if="item.picked==2">
                            <div v-for="(currentitem,index) in item.values">
                              <input type="radio" v-bind:id="'NJDX1_SF'+index" name="NJDX_SF" class="choice-box_hind"
                              >
                              <!-- v-model="item.values"
                                     v-bind:value="currentitem"-->
                              <label v-bind:for="'NJDX1_SF'+index" class="checked choice-box-NJDX"></label><span>{{currentitem.name}}</span>
                            </div>

                          </div>
                          <div class="XQAndCon1 clear" v-if="item.picked==3">
                          
                            <select name="age" id="age" >
                               <option v-for="options in item.values" v-bind:value="options">{{options.name}}</option>
                            </select>

                          
                          </div>
                        </div>
                      </div>
                      <p class="formGroupR" @click.stop="removeForm(index)"><span></span></p>
                    </div>
                    <!--多选-->
                    <div v-else-if="item.type=='checkbox'" class="formGroup clear" @click="formInputClick(index,item)">
                      <div class="formGroupL">
                        <label for="">{{item.label?item.label:"多选框"}} ( <span>多选{{item.choiceNumber?'，可选'+item.choiceNumber+'个':""}}</span>
                          )<b
                            v-if="item.required">*</b></label>
                        <div class="XQAndCon XQAndCon_XG">
                          <div class="XQAndCon2 clear">
                            <!-- <div>
                               <input type="checkbox" name="choice-box-XQ" id="NJDX_bOX1" class="choice-box_hind"
                               >
                               <label for="NJDX_bOX1" class="choice-box-XQ"></label><span>全选</span>
                             </div>-->
                            <div v-for="currentitem in item.values">
                              <input type="checkbox" name="choice-box-XQ" id="NJDX_bOX2" class="choice-box_hind">
                              <label for="NJDX_bOX2" class="choice-box-XQ"></label><span>{{currentitem.name}}</span>
                            </div>

                          </div>
                        </div>
                      </div>
                      <p class="formGroupR" @click.stop="removeForm(index)"><span></span></p>
                    </div>
                    <!--单选-->
                    <div v-else-if="item.type=='radio'" class="formGroup clear" @click="formInputClick(index,item)">
                      <div class="formGroupL">
                        <label for="">{{item.label?item.label:"单选框"}} ( <span>单选</span> )<b
                          v-if="item.required">*</b></label>
                        <div class="XQAndCon XQAndCon_XG">
                          <div class="XQAndCon3 clear">
                            <div v-for="(currentitem,index) in item.values">
                              <input type="radio" v-bind:id="'NJDX1_SF'+index" v-bind:name="'NJDX_SF'+index"
                                     class="choice-box_hind"
                                     v-model="currentitem.name">
                              <label v-bind:for="'NJDX1_SF'+index" class="checked choice-box-NJDX"></label><span>{{currentitem.name}}</span>
                            </div>

                          </div>
                        </div>
                      </div>
                      <p class="formGroupR" @click.stop="removeForm(index)"><span></span></p>
                    </div>


                    <!--多行文本-->
                    <div v-else-if="item.type=='textarea'" class="formGroup clear" @click="formInputClick(index,item)">
                      <div class="formGroupL">
                        <label for="">{{item.label?item.label:"多行文本"}}<b v-if="item.required">*</b></label>
                        <textarea rows="5" id="MultilineText" v-bind:placeholder="item.placeholder"
                                  readonly="readonly"></textarea>
                      </div>
                      <p class="formGroupR" @click.stop="removeForm(index)"><span></span></p>
                    </div>

                    <!--提交-->
                    <div v-else-if="item.type=='submit'" @click="submitEdit(index,item,'formList')"
                         class="formGroup clear">
                      <div class="formGroupL">
                        <label for="formGroupBtn">提交<b>*</b></label>
                        <div class="formGroupBtn" id="formGroupBtn">{{item.type=="submit"?submitObj.label:item.label}}
                        </div>
                      </div>
                    </div>

                    <!--日期-->
                    <div v-else-if="item.type=='dateTime'" class="formGroup clear"
                         @click="formInputClick(index,item)">
                      <div class="formGroupL">
                        <label for="">{{item.label?item.label:"日期"}}<b v-if="item.required">*</b></label>
                        <div class="formGroupL_CSRQ_RQ" v-if="item.bindType=='date'">
                          <div>
                            <input type="date" class="CSRQ" id="Date" readonly="readonly"/>
                            <span class="DataImg"></span>
                          </div>

                        </div>
                        <div class="formGroupL_CSRQ_RQ" v-if="item.bindType=='time'">

                          <div>
                            <input type="time" class="CSRQ" id="Time" readonly="readonly"/>
                            <span class="TimeImg"></span>
                          </div>
                        </div>
                        <div class="formGroupL_CSRQ_RQ" v-if="item.bindType=='datetime'">
                          <div>
                            <input type="date" class="CSRQ" id="Date" readonly="readonly"/>
                            <span class="DataImg"></span>
                          </div>
                          <div>
                            <input type="time" class="CSRQ" id="Time" readonly="readonly"/>
                            <span class="TimeImg"></span>
                          </div>
                        </div>
                      </div>
                      <p class="formGroupR" @click.stop="removeForm(index)"><span></span></p>
                    </div>
                    <!--二级联动-->
                    <div  v-else-if="item.type=='selectTwo'"  @click="formInputClick(index,item)" class="formGroup clear">
                      <div class="formGroupL">
                        <label for="Twolevellinkage">{{formList[index].label}}<b v-if="item.required">*</b></label>
                        <div class="formGroupL_EJLD">
                          <select name="Twolevellinkage" id="Twolevellinkage"  v-model="formList[index].selectthis">
                            <option value='请选择'>{{formList[index].defaultValues.name}}</option>
                            <option v-for="options in item.values" v-bind:value="options">{{options.firstSelect.name}}</option>
                          </select>
                          <select name="Twolevellinkage" id="Twolevellinkage1">
                            <option value='请选择'>{{formList[index].defaultValuesSeconde.name}}</option>
                            <option v-if="formList[index].selectthis.secondSelect" v-for="optionstwo in formList[index].selectthis.secondSelect">{{optionstwo.name}}</option>
                          </select>
                        </div>
                      </div>
                      <p class="formGroupR" @click.stop="removeForm(index)"><span></span></p>
                    </div>
                    <!-- 评分 -->
                       <div class="formGroup clear" v-else-if="item.type=='score'" @click="formInputClick(index,item)">
                                <div class="formGroupL">
                                    <label for="campus">{{item.label}}<b v-if="item.required">*</b></label>
                                    <p class="score">{{item.describe}}</p>
                                    <transition
                                      name="fadeUp"
                                      mode="out-in"
                                      >
                                    <p v-if="item.fullMarksStyle=='stars'" key="stars" style="animation-duration: 0.3s"><span class="stars " :class="{'stars_light':index==0}" v-for="(current,index) in item.fullmarks" :key="index"></span></p>
                                  
                                    <p v-if="item.fullMarksStyle=='heart'"  key="heart" style="animation-duration: 0.3s"><span class="heart " :class="{'heart_light':index==0}" v-for="(current,index) in item.fullmarks" :key="index"></span></p>
                                   
                                    <p v-if="item.fullMarksStyle=='good'"  key="good" style="animation-duration: 0.3s"><span class="good " :class="{'good_light':index==0}" v-for="(current,index) in item.fullmarks" :key="index"></span></p>
                                  
                                    
                                    <p v-if="item.fullMarksStyle=='rose'"  key="rose" style="animation-duration: 0.3s"><span class="rose " :class="{'rose_light':index==0}" v-for="(current,index) in item.fullmarks" :key="index"></span></p>
                                   
                                    <p v-if="item.fullMarksStyle=='xpression'"  key="xpression" style="animation-duration: 0.3s"><span class="xpression " :class="{'xpression_light':index==0}" v-for="(current,index) in item.fullmarks" :key="index"></span></p>
                                  </transition>
                                </div>
                                 <p class="formGroupR" @click.stop="removeForm(index)"><span></span></p>
                            </div>
                    <!--描述-->
                    <div class="formGroup clear"
                         v-else-if="item.type=='describe'"
                         @click="formInputClick(index,item)">

                      <div class="formGroupL">
                        <label for="">{{item.label?item.label:"描述"}}<b v-if="item.required">*</b></label>
                        <textarea rows="5" id="describe" style="word-wrap: break-word;" v-bind:placeholder="item.placeholder"
                                  readonly="readonly"></textarea>
                      </div>
                      <p class="formGroupR" @click.stop="removeForm(index)"><span></span></p>
                    </div>

                      <!--描述P-->
                    <div class="formGroup clear"
                         v-else-if="item.type=='p'"
                         @click="formInputClick(index,item)">

                      <div class="formGroupL">
                        <label for="">{{item.label?item.label:"描述"}}<b v-if="item.required">*</b></label>
                        <p class="miaoshu" id="describe" style="word-wrap: break-word;" 
                                  readonly="readonly">{{item.value}}</p>
                      </div>
                      <p class="formGroupR" @click.stop="removeForm(index)"><span></span></p>
                    </div>


                    <div v-else-if="item.type=='imgupload'"
                         @click="formInputClick(index,item)"
                         class="formGroup clear">
                      <div class="formGroupL">
                        <label for="">{{item.label?item.label:"图片上传"}}<b v-if="item.required">*</b><span
                          class="formGroupL_Span_TPSC">支持JPG\JPEG\PNG格式，大小不超过4M</span></label>
                        <div class="PictureUploading" id="PictureUploading">
                          <div class="PictureUploading_L"><img src="../../../images/QJSZImg/ImgBG2Img.png" alt=""/>
                          </div>
                          <div class="PictureUploading_R">
                            <input type="file" name="fileName"><span></span>
                          </div>
                        </div>
                      </div>
                      <p class="formGroupR" @click.stop="removeForm(index)"><span></span></p>
                    </div>


                    <div v-else-if="item.type=='fileupload'"
                         @click="formInputClick(index,item)"
                         class="formGroup clear">
                      <div class="formGroupL">
                        <label for="">{{item.label?item.label:"附件上传"}}<b v-if="item.required">*</b><span
                          class="formGroupL_Span_TPSC">支持文件类型：.doc(.docx)\.xls(.xlsx)\.zip,大小不超过4M</span></label>
                        <div class="PictureUploading" id="AttachmentsUpload">
                          <div class="PictureUploading_L"><img src="../../../images/QJSZImg/ImgBG3Img.png" alt=""/>
                          </div>
                          <div class="PictureUploading_R">
                            <input type="file" name="fileName"><span></span>
                          </div>
                        </div>
                      </div>
                      <p class="formGroupR" @click.stop="removeForm(index)"><span></span></p>
                    </div>
                  </Draggable>
                </Container>
                <!--没有添加任何组件的时候显示-->
                <div v-if="formList.length<1" style="height: 240px"></div>
                <!--提交按钮-->
                <div v-for="(item,index) in formSubmit" :key="index" class="formGroup clear"
                     @click="submitEdit(index,item,'formSubmit')">
                  <div class="formGroupL">
                    <label for="formGroupBtn">提交<b>*</b></label>
                    <div class="formGroupBtn" id="formGroupBtn">{{item.type=="submit"?submitObj.label:item.label}}
                    </div>
                  </div>
                </div>

                <!--底部-->
                <Container @drop="onDrop('formFooter', $event)" :group-name="'3'"
                           :get-child-payload="getChildPayloadFooter">
                  <Draggable v-for="(item,index) in formFooter" :key="index">
                    <div @click="formFooterClick(index,item)" class="formGroup clear">
                      <div class="formGroupL" v-if="item.values=='img'">
                        <label for="">底部<b>*</b></label>
                        <div class="bottomFoot" id="bottomFoot">
                          <img :src="item.imgURL?item.imgURL:staticURL+'/public/collection/images/QJSZImg/ImgBGImg.png'"
                               alt=""/>
                        </div>
                      </div>
                      <div class="formGroupL" v-if="item.values=='imgandtext'">
                        <label for="">底部<b>*</b></label>
                        <div class="bottomFoot_TuAndWZ" id="bottomFoot_TuAndWZ">
                          <div class="bottomFoot_TuAndWZ_L"><img
                            :src="item.imgURL?item.imgURL:'../../../public/collection/images/QJSZImg/ImgBGImg.png'"
                            alt=""/></div>
                          <div class="bottomFoot_TuAndWZ_R">
                            <div>
                              <h3>{{item.title?item.title:"请输入标题"}}</h3>
                              <p>{{item.content?item.content:"请输入文字内容"}}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="formGroupL" v-if="item.values=='text'">
                        <label for="">底部<b>*</b></label>
                        <div class="bottomFoot_WZ" id="bottomFoot_WZ">
                          <h3>{{item.title?item.title:"请输入标题"}}</h3>
                          <p>{{item.content?item.content:"请输入文字内容"}}</p>
                        </div>
                      </div>
                      <div class="formGroupL" v-if="item.values=='describe'">
                        <label for="">底部<b>*</b></label>
                        <div class="bottomFoot_WZ" id="bottomFoot_WZ">

                          <p>{{item.describe?item.describe:"请输入文字内容"}}</p>
                        </div>
                      </div>
                      <p class="formGroupR" @click.stop="removeFooter(index)"><span></span></p>
                    </div>
                  </Draggable>
                </Container>
                <div class="formGroup clear" @click="formCopyrightClick">
                  <div class="formGroupL">
                    <label for="bottomFoot">版权<b>*</b></label>
                    <div class="banquan" style="text-align: center;padding-bottom: 10px;">
                      <p>{{formCopyright.groupName}}</p>
                      <p>{{formCopyright.recordNumber}}</p>
                      <p>{{formCopyright.hotName}}<span>{{formCopyright.tel}}</span></p>
                    </div>
                  </div>
                </div>
              </div>

            </form>

          </div>
        </div>
        <div class="sectionR">
          <div class="sectionRBox">
            <div class="sectionRBoxUP clear">
              <a href="#" @click="openGlobalSetClick">全局设置</a>
              <a href="#" @click="collectionSave" v-loading.fullscreen.lock="fullscreenLoading">保存</a>
              <a href="#" @click="preview" v-loading.fullscreen.lock="fullscreenLoading">预览</a>
              <a href="#" class="sectionRBoxUPLast" @click="exit" v-loading.fullscreen.lock="fullscreenLoading">退出</a>
            </div>
            <div class="sectionRBoxDown">
              <ul class="sectionRBoxDownBox scroll">
                <!--input-->
                <li v-if="currentItemType=='input'&&currentItemInput.group=='basics'">
                  <p>
                    <em></em>{{formList[currentItemInputIndex].label}}
                      <span class="sectionRBoxDownBoxSpan2"><!-- v-bind:checked="formList[currentItemInputIndex].required"-->
                          <input type="checkbox" name="choice-box" id="XM_bOX" class="choice-box_hind"
                                 v-model="formList[currentItemInputIndex].required">
                          <label for="XM_bOX" class="choice-box"></label>
                      </span>
                    <span class="sectionRBoxDownBoxSpan1">这个是必填项</span>
                  </p>
                  <div class="sectionRBoxDownBoxCon">
                    <!--@input="maxStringLength(formList[currentItemInputIndex],'placeholder',10)"-->
                    <input type="text" placeholder="请输入提示语" v-model="formList[currentItemInputIndex].placeholder"
                    />
                    <div class="YXAndDW">
                      <!--<span>{{formList[currentItemInputIndex].placeholder.length}}</span>/<span>10</span>--></div>
                  </div>
                      <div class="QJSZ_BOX_TS" v-if="formList[currentItemInputIndex].alt=='mobile'">
                        <div>
                            <span>是否开启短信验证</span>
                            <input type="checkbox" id="mobilever" name="sfsdddfs" class="choice-box_hind" v-model='formList[currentItemInputIndex].verification'>
                            <label class="slider-v1" for="mobilever"></label>
                        </div>
                        <p><span></span>开启后，用户需要输入短信验证码验证手机号。</p>
                    </div>
                </li>

                <li v-if="currentItemType=='sex'||currentItemType=='dateBirth'">
                  <p>
                    <em></em>{{formList[currentItemInputIndex].label}}
                                    <span class="sectionRBoxDownBoxSpan2">
                                        <input type="checkbox" name="choice-box" id="XB_bOX" class="choice-box_hind"
                                               v-model="formList[currentItemInputIndex].required">
                                        <label for="XB_bOX" class="choice-box"></label>
                                    </span>
                    <span class="sectionRBoxDownBoxSpan1">这个是必填项</span>
                  </p>

                </li>

                <li v-if="currentItemType=='selectoptions'&&currentItemInput.group=='basics'">
                  <p>
                    <em></em>年龄
                                    <span class="sectionRBoxDownBoxSpan2">
                                        <input type="checkbox" name="choice-box" id="NL_bOX" class="choice-box_hind"
                                               v-model="formList[currentItemInputIndex].required">
                                        <label for="NL_bOX" class="choice-box"></label>
                                    </span>
                    <span class="sectionRBoxDownBoxSpan1">这个是必填项</span>
                  </p>
                  <div class="sectionRBoxDownBoxCon">
                    <!--  <p>请选择年龄</p>-->
                    <!--<div class="NlAndTJ">
                      <input type="text" placeholder="请选择" class="sectionRBoxDownBoxCon_NL"/>
                      <em class="emJIA" @click="addSelectOptions"></em>
                    </div>-->
                    <div class="NlAndTJ" v-for="(item,index) in formList[currentItemInputIndex].values">
                      <input type="text" placeholder="请输入年龄" v-model="item.value"
                             class="sectionRBoxDownBoxCon_NL"/>
                      <em class="emJIA" @click="addSelectOptions(index)"></em>
                      <em class="emJIAN" @click="removeSelectOptions(index)" v-if="index>0"></em>
                    </div>

                  </div>
                  <div class="QJSZ_BOX" style="margin-top: 80px">自定义选择默认文案</div>
                  <div class="sectionRBoxDownBoxCon">
                    <input type="text" placeholder="请在这里输入默认选项" v-model="formList[currentItemInputIndex].defaultValues.value"
                    />
                    <div class="YXAndDW"><!--<span>{{globalSet.label.length}}</span>/<span>25</span>--></div>
                  </div>
                </li>
                <li v-if="currentItemType=='selectPMC'&&currentItemInput.group=='basics'">
                  <p>
                    <em></em>行政区
                                    <span class="sectionRBoxDownBoxSpan2">
                                        <input type="checkbox" name="choice-box" id="XZQ_bOX" class="choice-box_hind"
                                               v-model="formList[currentItemInputIndex].required">
                                        <label for="XZQ_bOX" class="choice-box"></label>
                                    </span>
                    <span class="sectionRBoxDownBoxSpan1">这个是必填项</span>
                  </p>
                  <div class="XZQAndCon">
                    <p>选择范围<b>*</b></p>
                    <div class="XZQAndCon1">
                      <input type="radio" id="XZQ_BXD" name="XZQ" class="choice-box_hind" value="0"
                             v-model="formList[currentItemInputIndex].picked">
                      <label for="XZQ_BXD" class="checked choice-box-XZQ"></label><span>不限定</span>
                      <input type="radio" id="XZQ_SF" name="XZQ" class="choice-box_hind" value="1"
                             v-model="formList[currentItemInputIndex].picked">
                      <label for="XZQ_SF" class="checked choice-box-XZQ choice-box-XZQ_R"></label><span>指定省份</span>
                      <input type="radio" id="XZQ_SS" name="XZQ" class="choice-box_hind" value="2"
                             v-model="formList[currentItemInputIndex].picked">
                      <label for="XZQ_SS" class="choice-box-XZQ choice-box-XZQ_R"></label><span>指定省—市</span>
                    </div>
                    <div class="XZQAndCon2" v-if="formList[currentItemInputIndex].picked==1">
                      <select v-model="formList[currentItemInputIndex].ProvinceAppoint" @change="provinceChange">


                        <option v-for="(item,index) in formList[currentItemInputIndex].province" v-bind:value="index">
                          {{item[index]}}
                        </option>
                      </select>
                    </div>
                    <div class="XZQAndCon3" v-if="formList[currentItemInputIndex].picked==2">
                      <select v-model="formList[currentItemInputIndex].ProvinceAppoint"
                              @change="provinceChange">
                        <option v-for="(item,index) in formList[currentItemInputIndex].province" v-bind:value="index">
                          {{item[index]}}
                        </option>
                      </select>
                      <select v-model="formList[currentItemInputIndex].cityAppoint">
                        <option v-for="(item,index) in formList[currentItemInputIndex].cityList" v-bind:value="item">
                          {{item}}
                        </option>
                      </select>
                    </div>
                  </div>
                </li>
                <!--校区-->
                <li v-if="currentItemType=='selectoptionsXQ'&&currentItemInput.group=='basics'&&schoolid!==1">
                  <p>
                    <em></em>校区
                                    <span class="sectionRBoxDownBoxSpan2">
                                        <input type="checkbox" name="choice-box" id="XQ_bOX" class="choice-box_hind"
                                               v-model="formList[currentItemInputIndex].required">
                                        <label for="XQ_bOX" class="choice-box"></label>
                                    </span>
                    <span class="sectionRBoxDownBoxSpan1">这个是必填项</span>
                  </p>
                  <div class="sectionRBoxDownBoxCon">
                    <input type="text" placeholder="请在这里输入标题" v-model="formList[currentItemInputIndex].label"
                    />
                    <div class="YXAndDW">
                      <!--<span>{{formList[currentItemInputIndex].label.length}}</span>/<span>10</span>--></div>
                  </div>
                  <div class="XQAndCon">
                    <p>选项内容<span>与搜课平台关联，以搜课数据为准。</span></p>
                    <div class="XQAndCon1" v-show="current_schoolid==0">
                      <select v-model="formList[currentItemInputIndex].schoolAppoint" @change="schoolChange">
                        <option v-for="(shcool,key,index) in formList[currentItemInputIndex].schoolList"
                                v-bind:value="key">{{shcool}}
                        </option>
                      </select>
                    </div>
                    <div class="XQAndCon2 clear">
                    
                      <div v-if="formList[currentItemInputIndex].schoolarea.length>0">
                        <input type="checkbox" name="choice-box-XQ" id="XQ_bOX1" class="choice-box_hind"
                               v-model="formList[currentItemInputIndex].allselect"
                               @change="allselectChange">
                        <label for="XQ_bOX1" class="choice-box-XQ"></label><span>全选</span>
                      </div>
                      <div v-for="(area,index) in formList[currentItemInputIndex].schoolarea">
                        <input type="checkbox" name="choice-box-XQ" v-bind:id="area.sCode" class="choice-box_hind"
                               v-bind:value="area"
                               v-model="formList[currentItemInputIndex].values">
                        <label v-bind:for="area.sCode" class="choice-box-XQ"></label><span>{{area.sName}}</span>
                      </div>

                    </div>
                  </div>
                </li>
                  <!--校区-->
                <li v-if="currentItemType=='selectoptionsXQ'&&currentItemInput.group=='basics'&&schoolid==1&&currentItemInput.bindType=='select'">
                  <p>
                    <em></em>校区
                                    <span class="sectionRBoxDownBoxSpan2">
                                        <input type="checkbox" name="choice-box" id="XQ_bOX" class="choice-box_hind"
                                               v-model="formList[currentItemInputIndex].required">
                                        <label for="XQ_bOX" class="choice-box"></label>
                                    </span>
                    <span class="sectionRBoxDownBoxSpan1">这个是必填项</span>
                  </p>
                  <div class="sectionRBoxDownBoxCon">
                    <input type="text" placeholder="请在这里输入标题" v-model="formList[currentItemInputIndex].label"
                    />
                    <div class="YXAndDW">
                      <!--<span>{{formList[currentItemInputIndex].label.length}}</span>/<span>10</span>--></div>
                  </div>
                  <div class="XQAndCon">
                    <p>选项内容<span>与搜课平台关联，以搜课数据为准。</span></p>
                    <div class="XQAndCon1" v-show="current_schoolid==0">
                      <select v-model="formList[currentItemInputIndex].schoolAppoint" @change="schoolChange">
                        <option v-for="(shcool,key,index) in formList[currentItemInputIndex].schoolList"
                                v-bind:value="key">{{shcool}}
                        </option>
                      </select>
                    </div>
                    <div class="XQAndCon2 clear">
                    
                      <div v-if="formList[currentItemInputIndex].schoolarea.length>0">
                        <input type="checkbox" name="choice-box-XQ" id="XQ_bOX1" class="choice-box_hind"
                               v-model="formList[currentItemInputIndex].allselect"
                               @change="allselectChange">
                        <label for="XQ_bOX1" class="choice-box-XQ"></label><span>全选</span>
                      </div>
                      <div v-for="(area,index) in formList[currentItemInputIndex].schoolarea">
                        <input type="checkbox" name="choice-box-XQ" v-bind:id="area.sCode" class="choice-box_hind"
                               v-bind:value="area"
                               v-model="formList[currentItemInputIndex].values">
                        <label v-bind:for="area.sCode" class="choice-box-XQ"></label><span>{{area.sName}}</span>
                      </div>

                    </div>
                  </div>
                </li>
                <!-- 北京校区 -->
                  <transition name="fade" >
                <AreaBjcomponent v-if="currentItemType=='selectoptionsXQ'&&currentItemInput.group=='basics'&&schoolid==1&&currentItemInput.bindType=='selectTwo'"
                :currentitemitem="formList[currentItemInputIndex]"
                v-on:getedititem='setedititem'
                ></AreaBjcomponent>
                  </transition>
                <!-- <li v-if="currentItemType=='selectoptionsXQ'&&currentItemInput.group=='basics'&&schoolid==1">
                  <p>
                      <em></em>校区
                      <span class="sectionRBoxDownBoxSpan2">
                          <input type="checkbox" name="choice-box" id="XQ_bOXTwo" class="choice-box_hind" checked="checked">
                          <label for="XQ_bOXTwo" class="choice-box"></label>
                      </span>
                      <span class="sectionRBoxDownBoxSpan1">这个是必填项</span>
                  </p>
                  <div class="XQAndCon">
                      <p>选项内容<span class="BJspan">校区数据与北京学校同步。</span></p>
                      <div class="XQAndCon1">
                          <select v-model="formList[currentItemInputIndex].departmentSelect">
                              <option v-for="(item,index) in formList[currentItemInputIndex].department" :key='index'>{{item.name}}</option>
                          </select>
                      </div>
                      <p>不是全部校区参与，请点击<a href="#">手动设置</a></p>
                      <div class="XQAndCon2 clear">
                          <div>
                              <input type="checkbox" name="choice-box-XQ" id="XQ_bOXTwo1" class="choice-box_hind" checked="checked">
                              <label for="XQ_bOXTwo1" class="choice-box-XQ"></label><span>全选</span>
                          </div>
                          <div>
                            <div>
                              <input type="checkbox" name="choice-box-XQ" id="XQ_bOXTwo2" class="choice-box_hind" checked="checked">
                              <label for="XQ_bOXTwo2" class="choice-box-XQ" style="float:left"></label><span style="margin-left:10px">中关村校区</span>
                              </div>
                              <div style="    margin-left: 20px;margin-top: 3px;">
                                <input type="checkbox" name="choice-box-XQ" id="XQ_bOXTwo3" class="choice-box_hind" checked="checked">
                                <label for="XQ_bOXTwo3" class="choice-box-XQ" style="float:left"></label><span style="clear:both;margin-left:10px">石景山校区</span>
                              </div>
                              <div style="    margin-left: 20px;margin-top: 3px;">
                                <input type="checkbox" name="choice-box-XQ" id="XQ_bOXTwo3" class="choice-box_hind" checked="checked">
                                <label for="XQ_bOXTwo3" class="choice-box-XQ" style="float:left"></label><span style="clear:both;margin-left:10px">石景山校区</span>
                              </div>
                              <div style="    margin-left: 20px;margin-top: 3px;">
                                <input type="checkbox" name="choice-box-XQ" id="XQ_bOXTwo3" class="choice-box_hind" checked="checked">
                                <label for="XQ_bOXTwo3" class="choice-box-XQ" style="float:left"></label><span style="clear:both;margin-left:10px">石景山校区</span>
                              </div>
                          </div>
                          <div>
                              <input type="checkbox" name="choice-box-XQ" id="XQ_bOXTwo3" class="choice-box_hind" checked="checked">
                              <label for="XQ_bOXTwo3" class="choice-box-XQ"></label><span>石景山校区</span>
                          </div>
                          <div>
                              <input type="checkbox" name="choice-box-XQ" id="XQ_bOXTwo4" class="choice-box_hind" checked="checked">
                              <label for="XQ_bOXTwo4" class="choice-box-XQ"></label><span>海淀校区</span>
                          </div>
                          <div>
                              <input type="checkbox" name="choice-box-XQ" id="XQ_bOXTwo5" class="choice-box_hind" checked="checked">
                              <label for="XQ_bOXTwo5" class="choice-box-XQ"></label><span>长阳校区</span>
                          </div>
                      </div>
                  </div>
              </li> -->
                <!--年级-->
                <li v-if="currentItemType=='radioandcheckbox'&&currentItemInput.group=='basics'">
                  <p>
                    <em></em>年级
                                    <span class="sectionRBoxDownBoxSpan2">
                                        <input type="checkbox" name="choice-box" id="NJ_bOX" class="choice-box_hind"
                                               v-model="formList[currentItemInputIndex].required">
                                        <label for="NJ_bOX" class="choice-box"></label>
                                    </span>
                    <span class="sectionRBoxDownBoxSpan1">这个是必填项</span>
                  </p>
                  <div class="XQAndCon">
                    <p>选择框类型</p>
                    <div class="XQAndCon1">
                      <select v-model="formList[currentItemInputIndex].picked" @input="njchange">
                        <option v-bind:value="1">多选框</option>
                        <option v-bind:value="2">单选框</option>
                      </select>
                    </div>
                    <div class="XQAndCon2 clear">
                      <div>
                        <input type="checkbox" name="choice-box-XQ" id="NJ_bOX1" class="choice-box_hind"
                               v-model="formList[currentItemInputIndex].allselect"
                               @change="allselectGradeChange">
                        <label for="NJ_bOX1" class="choice-box-XQ"></label><span>全选</span>
                      </div>
                      <div v-for="(item,index) in formList[currentItemInputIndex].valuesys">
                        <input type="checkbox" name="choice-box-XQ" v-bind:id="'NJ_bOXE'+index" class="choice-box_hind"
                               v-bind:value="item"
                               v-model="formList[currentItemInputIndex].values">
                        <label v-bind:for="'NJ_bOXE'+index" class="choice-box-XQ"></label><span>{{item}}</span>
                      </div>

                    </div>

                  </div>
                </li>
                <!--课程-->
                <li v-if="currentItemType=='curriculum'&&currentItemInput.group=='basics'">
                  <p>
                    <em></em>课程
                                    <span class="sectionRBoxDownBoxSpan2">
                                        <input type="checkbox" name="choice-box" id="NJ_bOX" class="choice-box_hind"
                                               v-model="formList[currentItemInputIndex].required">
                                        <label for="NJ_bOX" class="choice-box"></label>
                                    </span>
                    <span class="sectionRBoxDownBoxSpan1">这个是必填项</span>
                  </p>
                  <div class="XQAndCon">
                    <p>选择框类型</p>
                    <div class="XQAndCon1">
                      <select v-model="formList[currentItemInputIndex].picked" @change="kcchange">
                        <option v-bind:value="1">多选框</option>
                        <option v-bind:value="2">单选框</option>
                         <option v-bind:value="3">下拉框</option>
                      </select>
                    </div>
                  </div>
                  <div class="sectionRBoxDownBoxCon">
                    <p>选项内容</p>
                    <div class="NlAndTJ clear" v-for="(item,index) in formList[currentItemInputIndex].values">
                      <input type="text" placeholder="请输入课程" class="sectionRBoxDownBoxCon_NL" v-model="item.name"/>
                      <em class="emJIA" @click="addSelectOptionsCurriculum(index)"></em>
                       <em class="emJIAN" @click="delSelectOptionsCurriculum(index)" v-if="index>0"></em>
                    </div>
                  </div>
                  <div class="sectionRBoxDownBoxCon" v-if="formList[currentItemInputIndex].picked==3">
                    <p>自定义选择默认文案</p>
                  </div>
                  <div class="sectionRBoxDownBoxCon" v-if="formList[currentItemInputIndex].picked==3">
                    <input class="inputZDY" type="text" placeholder="请选择课程" v-model="formList[currentItemInputIndex].defaultValues.value"/>
                  </div>
                </li>
                <!--单行文本-->
                 <transition
                    name="fade"
                     mode="out-in"
                    >
                <li v-if="currentItemType=='input'&&currentItemInput.group=='dynamic'" key="inputdynamic" style="animation-duration: 0.3s">
                  <p>
                    <em></em>单行文本
                      <span class="sectionRBoxDownBoxSpan2">
                          <input type="checkbox" name="choice-box" id="DXWB_bOX" class="choice-box_hind"
                                 v-model="formList[currentItemInputIndex].required">
                          <label for="DXWB_bOX" class="choice-box"></label>
                      </span>
                    <span class="sectionRBoxDownBoxSpan1">这个是必填项</span>
                  </p>
                  <div class="sectionRBoxDownBoxCon">
                    <input type="text" placeholder="请在这里输入标题" v-model="formList[currentItemInputIndex].label"
                          />
                    <div class="YXAndDW">
                      <!--<span>{{formList[currentItemInputIndex].label.length}}</span>/<span>10</span>--></div>
                  </div>
                  <div class="sectionRBoxDownBoxCon">
                    <input type="text" placeholder="请在这里输入提示语" v-model="formList[currentItemInputIndex].placeholder"
                           @input="maxStringLength(formList[currentItemInputIndex],'placeholder',10)"/>
                    <div class="YXAndDW">
                      <!--<span>{{formList[currentItemInputIndex].placeholder.length}}</span>/<span>10</span>--></div>
                  </div>
                </li>
               
                <!--多行文本-->
                
                <li v-if="currentItemType=='textarea'&&currentItemInput.group=='dynamic'" key="textareadynamic" style="animation-duration: 0.3s">
                  <p>
                    <em></em>多行文本
                                    <span class="sectionRBoxDownBoxSpan2">
                                        <input type="checkbox" name="choice-box" id="DXWB2_bOX" class="choice-box_hind"
                                               v-model="formList[currentItemInputIndex].required">
                                        <label for="DXWB2_bOX" class="choice-box"></label>
                                    </span>
                    <span class="sectionRBoxDownBoxSpan1">这个是必填项</span>
                  </p>
                  <div class="sectionRBoxDownBoxCon">
                    <input type="text" placeholder="请在这里输入标题" v-model="formList[currentItemInputIndex].label"
                    />
                    <div class="YXAndDW">
                      <!--     <span>{{formList[currentItemInputIndex].label.length}}</span>/<span>10</span>-->
                    </div>
                  </div>
                  <div class="sectionRBoxDownBoxCon">
                    <input type="text" placeholder="请在这里输入提示语" v-model="formList[currentItemInputIndex].placeholder"
                    />
                    <div class="YXAndDW">
                      <!--<span>{{formList[currentItemInputIndex].placeholder.length}}</span>/<span>10</span>--></div>
                  </div>
                  <div class="XQAndCon sectionRBoxDownBoxCon ">
                    <p>限制数字</p>
                    <div class="NlAndTJ">
                      <input type="text" placeholder="请输入限制字数" class="sectionRBoxDownBoxCon_NL" style="width: 260px;"
                             v-model="formList[currentItemInputIndex].choiceNumber"
                             @input="isnum"/>
                    </div>
                    <!--  <div class="XQAndCon1">

                        <select>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select>
                      </div>-->
                  </div>
                </li>
              
                <!--单选框-->
              
                <li v-if="currentItemType=='radio'&&currentItemInput.group=='dynamic'" key="radiodynamic" style="animation-duration: 0.3s">
                  <p>
                    <em></em>单选框
                      <span class="sectionRBoxDownBoxSpan2">
                          <input type="checkbox" name="choice-box" id="DXK_bOX" class="choice-box_hind"
                                 v-model="formList[currentItemInputIndex].required">
                          <label for="DXK_bOX" class="choice-box"></label>
                      </span>
                    <span class="sectionRBoxDownBoxSpan1">这个是必填项</span>
                  </p>
                  <div class="sectionRBoxDownBoxCon">
                    <div class="NlAndTJ">
                      <input type="text" placeholder="请输入选项标题" class="sectionRBoxDownBoxCon_NL"
                             v-model="formList[currentItemInputIndex].label"/>

                    </div>
                         <transition-group name="fade"  tag="div">
                    <div class="NlAndTJ" v-for="(item,index) in formList[currentItemInputIndex].values" :key='item.id' style="animation-duration: 0.3s">
                      <input type="text" placeholder="请输入选项内容" class="sectionRBoxDownBoxCon_NL" v-model="item.name"/>
                      <em class="emJIA" @click="addRaido(index)"></em>
                      <em class="emJIAN"
                          @click="delRaido(index)"
                          v-if="index!=0"></em>
                    </div>
                    </transition-group>
                  </div>
                </li>

                <!--多选框-->
               


                <li v-if="currentItemType=='checkbox'&&currentItemInput.group=='dynamic'"  key="checkboxdynamic" style="animation-duration: 0.3s">
                  <p>
                    <em></em>多选框
                                    <span class="sectionRBoxDownBoxSpan2">
                                        <input type="checkbox" name="choice-box" id="DXK2_bOX" class="choice-box_hind"
                                               v-model="formList[currentItemInputIndex].required">
                                        <label for="DXK2_bOX" class="choice-box"></label>
                                    </span>
                    <span class="sectionRBoxDownBoxSpan1">这个是必填项</span>
                  </p>
                  <div class="sectionRBoxDownBoxCon clear">
                    <div class="NlAndTJ">
                      <input type="text" placeholder="请输入标题" class="sectionRBoxDownBoxCon_NL"
                             v-model="formList[currentItemInputIndex].label"/>
                    </div>
                    <transition-group name="fade"  tag="div">
                    
                        <div class="NlAndTJ" v-for="(currentitem,index) in formList[currentItemInputIndex].values" :key='currentitem.id' style="animation-duration: 0.3s">
                          <input type="text" placeholder="请输入选项内容" class="sectionRBoxDownBoxCon_NL"
                                v-model="currentitem.name"/>
                          <em class="emJIA" @click="addCheckbox(index)"></em>
                          <em class="emJIAN" @click="delCheckbox(index)"
                              v-if="index!=0"></em>
                        </div>
                     </transition-group>
                  </div>
                  <div class="XQAndCon sectionRBoxDownBoxCon ">
                    <p>可选数量限制</p>
                    <div class="NlAndTJ">
                      <input type="text" placeholder="请输入可选数量" class="sectionRBoxDownBoxCon_NL"
                             v-model="formList[currentItemInputIndex].choiceNumber"
                             @input="isnum"/>
                    </div>
                    <!--  <div class="XQAndCon1">

                        <select>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select>
                      </div>-->
                  </div>
                </li>
              
                <!--下拉框-->
               
                <li v-if="currentItemType=='selectoptionsdynamic'&&currentItemInput.group=='dynamic'" key="selectoptionsdynamicdynamic" style="animation-duration: 0.3s">
                  <p>
                    <em></em>下拉框
                        <span class="sectionRBoxDownBoxSpan2">
                            <input type="checkbox" name="choice-box" id="XLK_bOX" class="choice-box_hind"
                                   v-model="formList[currentItemInputIndex].required">
                            <label for="XLK_bOX" class="choice-box"></label>
                        </span>
                    <span class="sectionRBoxDownBoxSpan1">这个是必填项</span>
                  </p>
                  <div class="sectionRBoxDownBoxCon clear">
                    <div class="NlAndTJ">
                      <input type="text" placeholder="请输入标题" class="sectionRBoxDownBoxCon_NL"
                             v-model="formList[currentItemInputIndex].label"/>
                    </div>
                    <div class="NlAndTJ" v-for="(currentitem,index) in formList[currentItemInputIndex].values">
                      <input type="text" placeholder="请输入选项内容" class="sectionRBoxDownBoxCon_NL"
                             v-model="currentitem.name"/>
                      <em class="emJIA" @click="addSelectBasics(index)"></em>
                      <em class="emJIAN" @click="delSelectBasics(index)" v-if="index>0"></em>
                    </div>

                  </div>
                  <div class="QJSZ_BOX" style="margin-top: 30px">自定义选择默认文案</div>
                  <div class="sectionRBoxDownBoxCon">
                    <input type="text" placeholder="请在这里输入默认选项" v-model="formList[currentItemInputIndex].defaultValues.value"
                    />
                    <div class="YXAndDW"><!--<span>{{globalSet.label.length}}</span>/<span>25</span>--></div>
                  </div>
                </li>
              
                <!--日期-->
               
                <li v-if="currentItemType=='dateTime'&&currentItemInput.group=='dynamic'" key="dateTime" style="animation-duration: 0.3s">
                  <p>
                    <em></em>日期
                                    <span class="sectionRBoxDownBoxSpan2">
                                        <input type="checkbox" name="choice-box" id="RQ_bOX" class="choice-box_hind"
                                               v-model="formList[currentItemInputIndex].required">
                                        <label for="RQ_bOX" class="choice-box"></label>
                                    </span>
                    <span class="sectionRBoxDownBoxSpan1">这个是必填项</span>
                  </p>
                  <div class="sectionRBoxDownBoxCon">
                    <input type="text" placeholder="请在这里输入标题" v-model="formList[currentItemInputIndex].label"
                           @input="maxStringLength(formList[currentItemInputIndex],'label',10)"/>
                    <div class="YXAndDW">
                      <!--<span>{{formList[currentItemInputIndex].label.length}}</span>/<span>25</span>--></div>
                  </div>
                  <div class="XQAndCon">
                    <p>日期类型<b>*</b></p>
                    <div class="XQAndCon1">
                      <select v-model="formList[currentItemInputIndex].bindType">
                        <option value="datetime">日期+时间</option>
                        <option value="date">日期</option>
                        <option value="time">时间</option>
                      </select>
                    </div>
                  </div>
                </li>
                  <!-- </transition>
                
                <transition
                    name="fadeUp"
                     mode="out-in"
                    > -->
                <li v-if="currentItemType=='selectTwo'&&currentItemInput.group=='dynamic'" key="selectTwo" style="animation-duration: 0.3s">
                  <p>
                    <em></em>二级联动
                                    <span class="sectionRBoxDownBoxSpan2">
                                        <input type="checkbox" v-model="formList[currentItemInputIndex].required" name="choice-box" id="EJLD_bOX" class="choice-box_hind" >
                                        <label for="EJLD_bOX" class="choice-box"></label>
                                    </span>
                    <span class="sectionRBoxDownBoxSpan1">这个是必填项</span>
                  </p>
                  <div class="sectionRBoxDownBoxCon">
                    <input type="text" v-model="formList[currentItemInputIndex].label" placeholder="二级联动"/>
                  </div>
                  <div class="sectionRBoxDownBoxCon">
                    <p>选项</p>
                    <div class="sectionRBoxDownBoxCon" v-for="(item,index) in formList[currentItemInputIndex].values ">
                      <div class="NlAndTJ clear">
                        <input type="text" placeholder="一级选项" class="sectionRBoxDownBoxCon_NL" v-model="item.firstSelect.name"/>
                        <em class="emJIA" @click="addSelectTwoOptions(index)"></em>
                        <em class="emJIAN" @click="delSelectTwoOptions(index)" v-show="index>0"></em>
                      </div>
                      <div class="ERJL clear" v-for="(currentitem,itemindex) in item.secondSelect ">
                        <input type="text" placeholder="二级选项" v-model="currentitem.name" class="sectionRBoxDownBoxCon_NL"/>
                        <em class="emJIA" @click="addSelectTwoEecondOptions(index,itemindex)"></em>
                        <em class="emJIAN" @click="delSelectTwoEecondOptions(index,itemindex)" v-show="itemindex>0"></em>
                      </div>
                    </div>
                  </div>
                  <div class="sectionRBoxDownBoxCon">
                    <p>自定义选择默认文案</p>
                  </div>
                  <div class="sectionRBoxDownBoxCon">
                    <p>一级选项</p>
                  </div>
                  <div class="sectionRBoxDownBoxCon">
                    <input class="inputZDY" type="text" placeholder="请选择" v-model="formList[currentItemInputIndex].defaultValues.name"/>
                  </div>
                  <div class="sectionRBoxDownBoxCon">
                    <p>二级选项</p>
                  </div>
                  <div class="sectionRBoxDownBoxCon">
                    <input class="inputZDY" type="text" placeholder="请选择" v-model="formList[currentItemInputIndex].defaultValuesSeconde.name"/>
                  </div>
                </li>
                 <!-- </transition>
 
  <transition
                    name="fade"
                    > -->
                <li v-if="currentItemType=='score'&&currentItemInput.group=='dynamic'" key="scoredynamic" style="animation-duration: 0.3s">
                  <p>
                      <em></em>评分
                      <span class="sectionRBoxDownBoxSpan2">
                          <input type="checkbox" name="choice-box" id="PF_bOX" class="choice-box_hind"  v-model="formList[currentItemInputIndex].required">
                          <label for="PF_bOX" class="choice-box"></label>
                      </span>
                      <span class="sectionRBoxDownBoxSpan1">这个是必填项</span>
                  </p>
                  <div class="sectionRBoxDownBoxCon">
                      <input type="text" placeholder="评分" v-model="formList[currentItemInputIndex].label"/>
                  </div>
                  <div class="sectionRBoxDownBoxCon">
                      <p>满分</p>
                      <p class="fennum"><span v-on:click="fullMarksClick(3)" v-bind:class="{curfen:formList[currentItemInputIndex].fullmarks==3}" class="" >3</span ><span v-on:click="fullMarksClick(5)" v-bind:class="{curfen:formList[currentItemInputIndex].fullmarks==5}">5</span><span v-on:click="fullMarksClick(10)" v-bind:class="{curfen:formList[currentItemInputIndex].fullmarks==10}">10</span></p>
                  </div>
                  <div class="sectionRBoxDownBoxCon">
                      <p>外观</p>
                      <p class="waiguang"><span v-on:click="fullMarksStyleClick('stars')" v-bind:class="{curwai:formList[currentItemInputIndex].fullMarksStyle=='stars'}" class="wai1"></span><span v-on:click="fullMarksStyleClick('heart')" v-bind:class="{curwai:formList[currentItemInputIndex].fullMarksStyle=='heart'}" class="wai2"></span><span v-on:click="fullMarksStyleClick('good')" v-bind:class="{curwai:formList[currentItemInputIndex].fullMarksStyle=='good'}" class="wai3"></span><span v-on:click="fullMarksStyleClick('rose')" v-bind:class="{curwai:formList[currentItemInputIndex].fullMarksStyle=='rose'}" class="wai4"></span><span v-on:click="fullMarksStyleClick('xpression')" v-bind:class="{curwai:formList[currentItemInputIndex].fullMarksStyle=='xpression'}" class="wai5"></span></p>
                  </div>
                  <div class="sectionRBoxDownBoxCon">
                      <p>描述</p>
                  </div>
                  <div class="sectionRBoxDownBoxCon">
                      <textarea rows="5" id="PFMS_BOX" placeholder="在这里输入评分描述" v-model="formList[currentItemInputIndex].describe"></textarea>
                  </div>
              
                            
              </li>
             
              <!-- <component v-bind:is="componentsFoEdit" v-bind:currentitem="formList[currentItemInputIndex]" v-on:getedititem='setedititem'></component> -->
              <!-- <ScoreComponent v-if="currentItemType=='score'&&currentItemInput.group=='dynamic'" v-bind:currentitem="formList[currentItemInputIndex]" v-on:getedititem='setedititem'></ScoreComponent> -->
              
                <li v-if="currentItemType=='describe'&&currentItemInput.group=='dynamic'" key="describedynamic" style="animation-duration: 0.3s">
                  <p>
                    <em></em>描述
                  </p>
                  <div class="sectionRBoxDownBoxCon">
                    <textarea rows="5" id="MS_BOX" placeholder="在这里输入描述内容"
                              v-model="formList[currentItemInputIndex].placeholder"
                              @input="maxStringLength(formList[currentItemInputIndex],'placeholder',160)"></textarea>
                    <div class="YXAndDW1">
                      <!--<span>{{formList[currentItemInputIndex].placeholder.length}}</span>/<span>160</span>--></div>
                  </div>
                </li>
                <!-- 描述p -->
                  <li v-if="currentItemType=='p'&&currentItemInput.group=='dynamic'" key="describedynamic" style="animation-duration: 0.3s">
                  <p>
                    <em></em>描述
                  </p>
                  <div class="sectionRBoxDownBoxCon">
                    <textarea rows="5" id="MS_BOX" placeholder="在这里输入描述内容"
                              v-model="formList[currentItemInputIndex].value"
                              @input="maxStringLength(formList[currentItemInputIndex],'placeholder',160)"></textarea>
                    <div class="YXAndDW1">
                      <!--<span>{{formList[currentItemInputIndex].placeholder.length}}</span>/<span>160</span>--></div>
                  </div>
                </li>
                 
                <!--t提交按钮编辑-->
               
                <li v-if="currentItemType=='submit'" key="submit"  style="animation-duration: 0.3s">
                  <p>
                    <em></em>提交按钮
                  </p>
                  <div class="sectionRBoxDownBoxCon">
                    <input type="text" placeholder="请输入按钮文字" v-model="submitObj.label"
                           @input="maxStringLength(submitObj,'label',10)"/>
                    <div class="YXAndDW"><!--<span>{{submitObj.label.length}}</span>/<span>10</span>--></div>
                  </div>
                  <div class="sectionRBoxDownBoxCon">
                    <input type="text" placeholder="请输入成功标题" v-model="submitObj.popupTitle"
                    />
                    <div class="YXAndDW"><!--<span>{{submitObj.popupTitle.length}}</span>/<span>10</span>--></div>
                  </div>
                  <div class="sectionRBoxDownBoxCon sectionRBoxDownBoxCon_TJ">
                    <textarea rows="5" id="TJ_BOX" placeholder="请输入成功提示" v-model="submitObj.popupContent"
                    ></textarea>
                    <div class="YXAndDW1"><!--<span>{{submitObj.popupContent.length}}</span>/<span>160</span>--></div>
                  </div>
                  <div class="sectionRBoxDownBoxCon">
                    <p>跳转链接</p>
                    <input type="text" placeholder="提交成功后可跳转到指定链接，为空不跳转" class="sectionRBoxDownBoxCon_NL"
                           v-model="submitObj.hrefURI"
                    />
                  </div>
                </li>
               
                <!--底部-->
                 
                <li v-if="currentItemType=='footer'" key="footer" style="animation-duration: 0.3s">
                  <p>
                    <em></em>底部
                  </p>
                  <div class="DBAndCon">
                    <span>类型选择</span>
                    <select v-model="formFooter[currentItemInputIndex].values">>
                      <option v-bind:value="'img'">图片样式</option>
                      <option v-bind:value="'imgandtext'"> 图文样式</option>
                      <option v-bind:value="'text'">文字样式</option>
                      <option v-bind:value="'describe'">描述样式</option>
                    </select>
                  </div>
                  <div class="DBAndCon_2"
                       v-if="formFooter[currentItemInputIndex].values=='img'||formFooter[currentItemInputIndex].values=='imgandtext'">
                    <!--图片样式-->
                    <div class="DBAndCon_2_Img">
                      <img
                        :src="formFooter[currentItemInputIndex].imgURL?formFooter[currentItemInputIndex].imgURL:staticURL+'/public/collection/images/QJSZImg/ImgBGImg.png'"
                        alt=""/>
                    </div>
                    <p>支持jpg、png格式，图片尺寸620x172px</p>
                    <p>大小不超过100KB</p>
                    <div class="SCBtnImg">
                      <!--    <input type="file" name="fileName"/><span></span>-->
                      <el-upload
                        class="avatar-uploader"
                        action="/collection/ajax_collectionuploadimage"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">

                        <button>上传文件</button>
                        <span></span>
                      </el-upload>

                    </div>

                    <div class="DBAndCon_ZX">
                      <span>图片说明</span>
                      <input type="text" placeholder="请输入" v-model="formFooter[currentItemInputIndex].description"/>
                    </div>
                  </div>
                  <div class="DBAndCon_1"
                       v-if="formFooter[currentItemInputIndex].values=='text'||formFooter[currentItemInputIndex].values=='imgandtext'">
                    <!--文字样式-->
                    <div class="DBAndCon_1_Con">
                      <input type="text" placeholder="请输入标题" v-model="formFooter[currentItemInputIndex].title"
                             />
                      <div class="YXAndDW">
                        <!--<span>{{formFooter[currentItemInputIndex].title.length}}</span>/<span>20</span>--></div>
                    </div>
                    <div class="DBAndCon_1_Con">
                      <textarea rows="5" id="DB_BOX" placeholder="请输入内容描述"
                                v-model="formFooter[currentItemInputIndex].content"
                                ></textarea>
                      <div class="YXAndDW1">
                        <!--<span>{{formFooter[currentItemInputIndex].content.length}}</span>/<span>40</span>--></div>
                    </div>
                  </div>
                  <div class="DBAndCon_1"
                       v-if="formFooter[currentItemInputIndex].values=='describe'">
                    <!--文字描述-->

                    <div class="DBAndCon_1_Con">
                      <textarea rows="5" id="DB_BOX" placeholder="请输入内容描述"
                                v-model="formFooter[currentItemInputIndex].describe"
                                > </textarea>
                      <div class="YXAndDW1">
                        <!--<span>{{formFooter[currentItemInputIndex].describe.length}}</span>/<span>40</span>--></div>
                    </div>
                  </div>
                </li>
                
                <li v-if="currentItemType=='imgupload'&&currentItemInput.group=='dynamic'" key="imguploaddynamic" style="animation-duration: 0.3s">
                  <p>
                    <em></em>图片上传
                      <span class="sectionRBoxDownBoxSpan2">
                          <input type="checkbox" name="choice-box" id="TPSC_bOX" class="choice-box_hind"
                                 v-model="formList[currentItemInputIndex].required">
                          <label for="TPSC_bOX" class="choice-box"></label>
                      </span>
                    <span class="sectionRBoxDownBoxSpan1">这个是必填项</span>
                  </p>
                  <div class="sectionRBoxDownBoxCon">
                    <input type="text" placeholder="请输入标题" v-model="formList[currentItemInputIndex].label"
                           @input="maxStringLength(formList[currentItemInputIndex],'label',10)"/>
                    <div class="YXAndDW">
                      <!--<span>{{formList[currentItemInputIndex].label.length}}</span>/<span>10</span>--></div>
                  </div>
                </li>
              
                <li v-if="currentItemType=='fileupload'&&currentItemInput.group=='dynamic'" key="fileuploaddynamic" style="animation-duration: 0.3s">
                  <p>
                    <em></em>附件上传
                                    <span class="sectionRBoxDownBoxSpan2">
                                        <input type="checkbox" name="choice-box" id="FJSC_bOX" class="choice-box_hind"
                                               v-model="formList[currentItemInputIndex].required">
                                        <label for="FJSC_bOX" class="choice-box"></label>
                                    </span>
                    <span class="sectionRBoxDownBoxSpan1">这个是必填项</span>
                  </p>
                  <div class="sectionRBoxDownBoxCon">
                    <!-- @input="maxStringLength(formList[currentItemInputIndex],'label',10)"-->
                    <input type="text" placeholder="请输入标题" v-model="formList[currentItemInputIndex].label"
                    />
                    <div class="YXAndDW">
                      <!--<span>{{formList[currentItemInputIndex].label.length}}</span>/<span>10</span>--></div>
                  </div>
                </li>
                 
                <li v-if="isOpenBanner" key="isOpenBanner" style="animation-duration: 0.3s">
                  <p>
                    <em></em>BANNER
                  </p>
                  <div class="DBAndCon_2"><!--图片样式-->
                    <div class="DBAndCon_2_Img">
                      <img :src="banner.imgURL?banner.imgURL:staticURL+'/public/collection/images/MobileImg/banner.jpg'"
                           alt=""/>
                    </div>
                    <p>支持jpg、png格式，图片尺寸750x330px</p>
                    <p>大小不超过100KB</p>
                    <div class="SCBtnImg">
                      <!--  <input type="file" name="fileName"/><span></span>-->
                      <el-upload
                        class="avatar-uploader"
                        action="/collection/ajax_collectionuploadimage"
                        :show-file-list="false"
                        :on-success="bannerHandleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar">-->
                        <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                        <button>上传文件</button>
                        <span></span>
                      </el-upload>
                    </div>
                    <div class="DBAndCon_ZX">
                      <span>图片说明</span>
                      <input type="text" placeholder="请输入" v-model="banner.Explain"/>
                    </div>
                  </div>
                </li>
                 </transition>
                <li v-if="isOpenGlobalSet==true">
                  <p>
                    <em></em>全局设置
                  </p>

                  <div class="QJSZ_BOX">收集项名称<b>*</b></div>
                  <div class="sectionRBoxDownBoxCon">
                    <input type="text" placeholder="请在这里输入标题" v-model="globalSet.label"
                    />
                    <div class="YXAndDW"><!--<span>{{globalSet.label.length}}</span>/<span>25</span>--></div>
                  </div>
               <!--   <div class="QJSZ_BOX">收集项描述</div>
                  <div class="sectionRBoxDownBoxCon sectionRBoxDownBoxCon_TJ">
                    <textarea rows="5" id="QJ_BOX" placeholder="请输入收集项描述" v-model="globalSet.content"
                    ></textarea>
                    <div class="YXAndDW1">&lt;!&ndash;<span>{{globalSet.content.length}}</span>/<span>30</span>&ndash;&gt;</div>
                  </div>-->

                  <div class="XQAndCon">
                    <p>收集项类型<b>*</b></p>
                    <div class="XQAndCon1">
                      <select v-model="globalSet.type">
                        <option value="0">请选择</option>
                        <option value="1">营销类</option>
                        <option value="2">服务类</option>
                        <option value="3">其他</option>
                      </select>
                    </div>
                  </div>

                  <div class="QJSZ_BOX">采集时间</div>

                  <el-date-picker
                    style="width: 281px; margin: 12px 13px 0 15px;height: 39px"
                    v-model="globalSet.time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy - MM - dd  "
                    value-format="timestamp">
                  </el-date-picker>
                  <div class="QJSZ_BOX">关键词设置<b style="display: none">*</b></div>
                  <div class="sectionRBoxDownBoxCon">
                    <input type="text" placeholder="输入关键词  用逗号‘,’分开  建议3个" v-model="globalSet.keyWorld"/>
                  </div>
                  <div class="QJSZ_BOX">主题色</div>
                  <div class="QJSZ_BOX_CJSJ_YS">
                    <div @click="themeColorClick('#298dd4')" class="QJSZ_BOX_CJSJ_YSL"><img
                      src="../../../images/QJSZImg/LZTSImg.png" alt=""/><span
                      v-bind:class="{QJSZYSSpan:globalSet.themeColor=='#298dd4'}"></span></div>
                    <div @click="themeColorClick('#e57a3e')" class="QJSZ_BOX_CJSJ_YSR"><img
                      src="../../../images/QJSZImg/HZTSImg.png" alt=""/>
                      <span v-bind:class="{QJSZYSSpan:globalSet.themeColor=='#e57a3e'}"></span></div>
                  </div>
                  <div class="QJSZ_BOX_CJSJ_YS QJSZ_BOX_CJSJ_YS_Mg">
                    <div @click="themeColorClick('#ffa900')" class="QJSZ_BOX_CJSJ_YSL"><img
                      src="../../../images/QJSZImg/HSZTSImg.png" alt=""/>
                      <span v-bind:class="{QJSZYSSpan:globalSet.themeColor=='#ffa900'}"></span></div>
                    <div @click="themeColorClick('#00ba97')" class="QJSZ_BOX_CJSJ_YSR"><img
                      src="../../../images/QJSZImg/LVZTSImg.png" alt=""/>
                      <span v-bind:class="{QJSZYSSpan:globalSet.themeColor=='#00ba97'}"></span></div>
                  </div>

                  <div class="QJSZ_BOX">反馈设置<b>*</b></div>
                  <div class="DBAndCon">
                    <span>邮件频率</span>
                    <select v-model="globalSet.emailFrequency">
                      <option value="0">请选择</option>
                      <option value="1">不发送提醒</option>
                      <option value="2">按天接收邮件提醒</option>
                      <!--<option value="3">按条发送提醒</option>-->

                    </select>
                  </div>
                  <div class="DBAndCon">
                    <span>查重方式</span>
                    <select v-model="globalSet.viewMode">
                      <option value="0">请选择</option>
                      <option value="1">不查重</option>
                      <option value="2">姓名+电话</option>
                      <option value="3">姓名</option>
                      <option value="4">电话</option>
                    </select>
                  </div>

                  <div class="QJSZ_BOX_TS">
                    <div>
                      <span>推送设置</span>
                      <input type="checkbox" id="s1" class="choice-box_hind" v-model="globalSet.isPush">
                      <label class="slider-v1" for="s1"></label>
                    </div>
                    <p>选择开，数据将于每日推送到crm。</p>
                  </div>
                </li>
                <li v-if="isOpenHead">
                  <p>
                    <em></em>表头设置
                  </p>


                  <div class="sectionRBoxDownBoxCon">
                    <input type="text" placeholder="请在这里输入标题" v-model="globalSet.label"
                    />
                    <div class="YXAndDW"><!--<span>{{globalSet.label.length}}</span>/<span>25</span>--></div>
                  </div>
                 <!-- <div class="sectionRBoxDownBoxCon sectionRBoxDownBoxCon_TJ">
                    <textarea rows="5" id="QJ_BOX" placeholder="请输入收集项描述" v-model="globalSet.content"
                    ></textarea>
                    <div class="YXAndDW1">&lt;!&ndash;<span>{{globalSet.content.length}}</span>/<span>30</span>&ndash;&gt;</div>
                  </div>-->


                </li>
                <!--版权-->
                <li v-if="currentItemType=='copyright'">
                  <p>
                    <em></em>版权

                  </p>
                  <div class="sectionRBoxDownBoxCon">
                    <input type="text" placeholder="请在这里输入电话号码" v-model="formCopyright.tel"
                    />
                    <div class="YXAndDW">
                      <!--<span>{{formList[currentItemInputIndex].label.length}}</span>/<span>10</span>--></div>
                  </div>

                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
    <!--底部 开始-->
    <div class="footer">
      Copyright 2011-2016 Neworiental Corporation, All Rights Reserve
    </div>
    <!--底部 结束-->
    <transition name="el-fade-in-linear">
      <div v-show="isSuccess" class="ModalFrame" id="ModalFrame" style="display: block">
        <div class="ModalFrameBox">
          <div class="ModalFrameBox1"><span id="Close" @click="successComplete"></span></div>
          <div class="ModalFrameBox2"><span @click="successComplete"></span></div>
          <div class="ModalFrameBox3">
            <h4>提交成功</h4>
            <p>辛苦啦～您的信息已经成功提交！</p>
          </div>
          <div class="ModalFrameBox4" @click="successComplete">完成</div>
        </div>
      </div>
    </transition>
    <transition name="el-fade-in-linear">
      <div v-show="isSetGlobal" class="ModalFrame_FB" id="ModalFrame_FB" style="display: block">
        <div class="ModalFrameBox_FB" style="border-radius: 15px;">
          <div class="ModalFrameBox1_FB"></div>
          <div class="ModalFrameBox2_TTSY_CGT"></div>
          <div class="ModalFrameBox3_FB">
            <!--     <h4>确定要发布吗？</h4>-->
            <p>{{isSetGlobalTitle}}</p>
          </div>
          <div class="ModalFrameBox4_FB"><span @click="goSetGlobal(true)">去设置</span><span class="ModalFrameBox4_span_FB"
                                                                                          @click="goSetGlobal(false)">返回</span>
          </div>
        </div>
      </div>
    </transition>
    <!--未设置placeholder选项时弹出提示-->
    <transition name="el-fade-in-linear">
      <div v-show="isnoplaceholder" class="ModalFrame_FB" id="ModalFrame_FB" style="display: block">
        <div class="ModalFrameBox_FB" style="border-radius: 15px;">
          <div class="ModalFrameBox1_FB"></div>
          <div class="ModalFrameBox2_TTSY_CGT"></div>
          <div class="ModalFrameBox3_FB">
            <!--     <h4>确定要发布吗？</h4>-->
            <p style="padding: 0 15px;"><span v-for="item in noPlaceholder">[<span style="color: red">{{item.label}}</span>]</span>的提示文字没有编辑，会影响参与人员的查看。确定要继续吗？</p>
          </div>
          <div class="ModalFrameBox4_FB"><span @click="noSetPlaceholder">继续</span><span class="ModalFrameBox4_span_FB"
                                                                                          @click="yesSetPlaceholder">去设置</span>
          </div>
        </div>
      </div>
    </transition>
    <transition name="el-fade-in-linear">
      <div v-show="isExit" class="ModalFrame_FB" id="ModalFrame_FB" style="display: block">
        <div class="ModalFrameBox_FB">
          <div class="ModalFrameBox1_FB"></div>
          <div class="ModalFrameBox2_TTSY_CGT"></div>
          <div class="ModalFrameBox3_FB">
            <!--     <h4>确定要发布吗？</h4>-->
            <p>是否保存更改内容</p>
          </div>
          <div class="ModalFrameBox4_FB"><span @click="goSave(true)">保存</span><span class="ModalFrameBox4_span_FB"
                                                                                    @click="goSave(false)">不保存</span>
          </div>
        </div>
      </div>
    </transition>

    <transition name="el-zoom-in-center">
      <div v-show="dialogVisible" class="ModalFrame_FB" id="ModalFrame_FB" style="display: block">
      <span @click="closeDialogVisible"
            style="position: fixed;top:10px;right: 20px;width: 17px;height: 17px;z-index: 10000;color: #fff;cursor: pointer;"><img
        src="../../../images/SCTKImg_B.png" alt=""></span>
        <iframe :src="previewSRC" style="width: 100%;height:100%" frameborder="0"></iframe>
      </div>
    </transition>
  </div>


</template>

<script>
  import { Container, Draggable } from "vue-smooth-dnd";
  import { applyDrag, generateItems } from "./utils";

  import ContactComponent from './components/ContactComponent.vue'
  import ScoreComponent from './components/edit-components/ScoreComponent.vue'
  import AreaBjcomponent from './components/edit-components/AreaBjcomponent.vue'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import 'vue2-animate/dist/vue2-animate.min.css'

  import { quillEditor,Quill } from 'vue-quill-editor'
   import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'

  Quill.register('modules/ImageExtend', ImageExtend)
  export default {
    name: 'app',
    components: {Container, Draggable,ContactComponent,quillEditor,ScoreComponent,AreaBjcomponent},
    data: function () {
      return {
        content: '',
        editorOption: {
          placeholder:"这里是表单描述",
          modules:{
             ImageExtend: {
              loading: true,
              name: 'img',
              action: '/collection/ajax_collectionuploadimage',
              response: (res) => {
                return this.staticURL+'/public/uploads/collection/'+res.data.path
              }
            },
            toolbar:{
              container:[
              ['bold', 'italic', 'underline'/*, 'strike'*/],
              [{ 'color': [] }, { 'background': [] }],
              /*   [{ 'direction': 'rtl' }],*/
              [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                  // dropdown with defaults from theme
              [{ 'font': [] }],
              [{ 'align': [] }],
              ['link', 'image'/*,'video'*/],
              ['clean']
            ],
             handlers: {
                'image': function () {
                  QuillWatch.emit(this.quill.id)
                }
              }
            }
          },
          bounds:"#btquill"

          // some quill options
        },
        componentsFoEdit:null,
        staticURL:globalOpt.publicserver,
        numberID: 0,
        schoolid: Number(globalOpt.schoolid),
        current_schoolid: globalOpt.current_schoolid,
        enable_image: globalOpt.enable_image,//是否准许添加图片上传组件  只有1可以添加
        enable_attachment: globalOpt.enable_attachment,//是否准许添加附件上传组件  只有1可以添加
        formList: [],//组件列表，除底部组件，
        formFooter: [],//底部组件。列表
        formCopyright:{
          groupName:"新东方教育科技集团有限公司",
          recordNumber:"京ICP备05067667",
          hotName:"咨询热线：",
          tel:"本地区号-********"
        },//固定底部版权信息，电话可修改
        formSubmit: [{
          group: "",//基础组件还是非基础组件
          label: "tijiao",//组件名字
          type: "submit",//组件类型
          id: 1,
          placeholder: '0',
          required: false,//是否必选，默认非必选,
          popupTitle: "",//弹出框标题
          popupContent: ""//弹出框提示内容
        }],//提交按钮，退拽用到
        currentItemInput: {},
        currentItemType: "",//当前选中的表单类型
        currentItemInputIndex: -1,//当前选中的表单在this.formList中的索引
        selectedXQ: {number: 1},//编辑年级表单时候判断是单选还是复选
        submitObjKey: "",
        submitObj: {//提交按钮设置
          group: "",//基础组件还是非基础组件
          label: "提交按钮",//组件名字
          type: "submit",//组件类型
          id: 0,
          placeholder: '0',
          required: true,//是否必选，默认非必选,
          popupTitle: "",//弹出框标题
          popupContent: "",//弹出框提示内容
          hrefURI: ""
        },
        noPlaceholder:[],//需要设置paceholder未设置的列表集合
        saveOrPreview:"",//save,preview
        isOpenGlobalSet: true,//打开全局设置 默认打开
        //全局设置
        globalSet: {
          label: "",
          content: "",
          type: "0",
          time: "",
          keyWorld: "",
          color: "",
          emailFrequency: "2",//邮件频率
          viewMode: "4",
          isPush: false,
          themeColor: "#00ba97",
          themeColorList: ["#298dd4", "#e57a3e", "#ffa900", "#00ba97"],
          template: "1"
        },

        isOpenBanner: false,//编辑banner
        isOpenHead: false,//编辑表头
        isSuccess: false,//成功弹窗
        isSetGlobal: false,//未完成全局设置提示框

        isSetGlobalTitle: "全局设置还没有完成，请先去设置",//未完成全局设置提示框文字提示
        isnoplaceholder:false,//未设置placeholder时弹窗提示
        isExit: false,//退出时提示是否保存弹窗
        dialogVisible: false,//预览
        fullscreenLoading: false,//保存loading
        previewSRC: '/collection/preview?id=' + globalOpt.id,
        banner: {
          Explain: "",//图片说明
          imgURL: "",
          urlRoute: ""
        }

      }
    },
    methods: {
      onEditorBlur(quill) {
        console.log('editor blur!', quill);
        this.editorOption.hounds=this.$refs.mybtquill
       
      },
      onEditorFocus(quill) {
        this.editorOption.hounds=this.$refs.mybtquill

      },
      onEditorReady(quill) {
      },
      onEditorChange({ quill, html, text }) {
        this.content = html
      },
      //input输入数字限制
      maxStringLength: function (item, key, maxLength) {
        var len = maxLength - item[key].length
        if (len < 0) {
          item[key] = item[key].substring(0, maxLength)
        }
      },

      ageAddNuberValidate: function (item, val, index) {
        var isnum = isNaN(val);
        if (isnum) {
          item[index] = ""
          this.$message({
            showClose: true,
            message: '请输入有效数字',
            type: 'warning'
          });

        } else {

        }
      },
      //多选框组件，验证有效数字
      isnum: function () {
        var item = this.formList[this.currentItemInputIndex]
        var isn = isNaN(item.choiceNumber);
        if (isn) {
          item.choiceNumber = "";
          this.$message({
            showClose: true,
            message: '请输入有效数字',
            type: 'warning'
          });

        } else {

        }
      },
      //年级改变radio或者CheckBox
      njchange: function () {
        if (this.formList[this.currentItemInputIndex].picked == 1) {
          this.formList[this.currentItemInputIndex].bindType = 'radio'
        } else if (this.formList[this.currentItemInputIndex].picked == 2){
          this.formList[this.currentItemInputIndex].bindType = 'checkbox'
        }else if (this.formList[this.currentItemInputIndex].picked == 3){
          this.formList[this.currentItemInputIndex].bindType = '"select"'
        }
      },
      //年级改变radio或者CheckBox
      kcchange: function () {
        if (this.formList[this.currentItemInputIndex].picked == 2) {
          this.formList[this.currentItemInputIndex].bindType = 'radio'
        } else if (this.formList[this.currentItemInputIndex].picked == 1){
          this.formList[this.currentItemInputIndex].bindType = 'checkbox'
        }else if (this.formList[this.currentItemInputIndex].picked == 3){
          this.formList[this.currentItemInputIndex].bindType = 'select'
        }
      },
      themeColorClick: function (color) {//主题色设置
        this.globalSet.themeColor = color;
      },
      //联系人组件增加，增加基础组件
      contactComponentClick: function (type, namevalue, group, alt, bindType) {//联系人组件增加，增加基础组件
        var isComponentExistence = this.componentExistence(namevalue);
        if (isComponentExistence) {
          this.$message.error('联系人组件不能重复添加');
          return
        }
        this.numberID=this.numberID+1
        var obj = {
          group: group,//基础组件还是非基础组件
          label: namevalue,//组件名字
          type: type,//组件类型
          bindType: bindType,
          id: this.numberID,
          placeholder: '',
          alt: alt,//联系人组件输入框类型  如 姓名--name 手机--mobile
          required: false,//是否必选，默认非必选
          choiceNumber: ""//多选框设置可选数量。默认为空，不限制勾选数量
       
        };
        if (type == "input") {
            if(alt=='mobile'){
              obj.verification=false
            }  
        } else if (type == "sex") {
          obj.values = [{
            "name": "男",
            "value": 1
          },
            {
              "name": "女",
              "value": 0
            }
          ];
          obj.picked = "0"//默认转中value

        } else if (type == "dateBirth") {

        } else if (type == "selectoptions") {//年龄、
          obj.values = [
            {
              value: "",
            }
          ];
          obj.defaultValues={
            value: "请选择年龄"
          }
          obj.picked =  obj.defaultValues.value;

        } else if (type == "selectoptionsXQ") {//
        
         if(this.schoolid!==1){
 obj.values = [

          ];
          obj.schoolList = [];
          obj.schoolAppoint = "";
          obj.schoolarea = [];
          obj.values = [ {
            sCode:"请选择校区",
            sName:"请选择校区"
          }];
          obj.allselect = false;

          $.ajax(
            {
              url: "/collection/ajax_school",
              method: "GET",
              dataType: "json",
              data: ""
            }
          ).then(function (data) {
            obj.schoolList = data.data;
            obj.schoolAppoint = globalOpt.current_schoolid == 0 ? 1 : globalOpt.current_schoolid;
            var that = this;
            $.ajax(
              {
                url: "/collection/ajax_schoolarea",
                method: "GET",
                dataType: "json",
                data: {schoolid: obj.schoolAppoint}
              }
            ).then(function (data) {
//schoolarea

              obj.schoolarea = data.data;


            }, function (err) {

            })
          }, function (err) {

          })
         }else{//北京校区
           //部门集合
           obj.allselect=true;
           obj.selectthis='请选择城区';
           obj.isNew=true;
           obj.department=[
             {
               name:"优能中学部",
               url:"http://bj.xdf.cn/school/schoolinfbycode?code=414"
             }, {
               name:"泡泡少儿部",
               url:"http://bj.xdf.cn/school/schoolinfbycode?code=40,318"
             }, {
               name:"所有校区",
               url:"http://bj.xdf.cn/school/schoolinfbycode?code="
             }, {
               name:"英联邦项目部",
               url:"http://bj.xdf.cn/school/schoolinfbycode?code=186,412 "
             }, {
               name:"英语学习部",
               url:"http://bj.xdf.cn/school/schoolinfbycode?code=6"
             }, {
               name:"国内考试部",
               url:"http://bj.xdf.cn/school/schoolinfbycode?code=20"
             }, {
               name:"小语种项目",
               url:"http://bj.xdf.cn/school/schoolinfbycode?code=79"
             }, {
               name:"北美项目部",
               url:"http://bj.xdf.cn/school/schoolinfbycode?code=151,165,155,156,362,164,410,166,411,167,157 "
             },
           ];
           //选中的部门
           obj.departmentSelect="请选择";
           obj.values=[
             
           ];
        /**{//values值样式
               firstSelect:{
                 name:""
               },
               secondSelect:[
                 {
                   name:""
                 }
               ]
             } */
            obj.getvalues=[
             {
               firstSelect:{
                 name:""
               },
               secondSelect:[
                 {
                   name:""
                 }
               ]
             }
           ];

         }
         
        } else if (type == "selectPMC") {//行政区
          obj.province = [];//省列表
          obj.ProvinceAppoint = "";//默认省份

          obj.cityAppoint = "";
          obj.cityList = [];//市列表
          obj.picked = "0"//是否限定省市0：不限定 1指定省  2：指定市

          $.ajax(
            {
              url: "/collection/ajax_province",
              method: "GET",
              dataType: "json",
              data: ""
            }
          ).then(function (data) {
            obj.province = data.data;

            obj.ProvinceAppoint = 0;
            let that = this;
            $.ajax(
              {
                url: "/collection/ajax_city",
                method: "GET",
                dataType: "json",
                data: {id: obj.ProvinceAppoint}
              }
            ).then(function (data) {
              obj.cityList = data.data;
              obj.cityAppoint = data.data[0];

            }, function (err) {

            })
          }, function (err) {

          })
        } else if (type == "checkbox") {//多选
          obj.values = [];
          obj.values.push({
            name: "",
            id:new Date().getTime()
          });

        } else if (type == "radio") {//单选
          obj.values = [];
          obj.values.push({
            name: "",
            id:new Date().getTime()
          });

        } else if (type == "radioandcheckbox") {//年级
          obj.picked = 2;//1复选，2单选
          obj.allselect = false
          obj.values = [];
          //obj.bindvalues=obj.values;
          obj.valuesys = ["1年级", "2年级", "3年级", "4年级", "5年级", "6年级", "7年级", "8年级", "9年级", "高一", "高二", "高三", "高考复习", "大一", "大二", "大三", "大四", "大五", "研一", "研二", "研三", "博一", "博二", "6年级（初中）", "在职", "学前-幼儿园", "中学生（无法区分初高中）"]

        }else if (type == "curriculum") {//课程
          obj.picked = 3;//1复选，2单选,3下拉
          obj.allselect = false
          obj.values = [
            {
              name:""
            }
          ];
          obj.defaultValues={
            value: "请选择课程"
          }
          //obj.bindvalues=obj.values;
          obj.valuesys = []

        }
        else if (type == "textarea") {//多行文本


        } else if (type == "describe") {//年级


        }else if (type == "p") {//年级
           obj.value="";

        } 
        else if (type == "selectoptionsdynamic") {//下拉框
          obj.values = [];
          obj.values.push({
            name: ""
          });
          obj.defaultValues={
            value: "请选择"
          }

        } else if (type == "dateTime") {//基础类组件日期
          obj.values = "date";
        }else if (type == "selectTwo") {//二级联动
        obj.defaultValues={name:"请选择"};
        obj.defaultValuesSeconde={name:"请选择"};
        obj.selectthis='请选择';
          obj.values = [
            {
              firstSelect:{name:""},
              secondSelect:[{name:""}]
            }
          ];
        }else if (type == "score") {//评分
          obj.describe="";
          obj.fullmarks=5;//3.5.10
          obj.fullMarksStyle='stars'//stars星星，heart心 good 拇指 rose玫瑰，xpression表情
         
        }  else if (type == "imgupload") {//图片上传
          if (this.enable_image != 1) {
            this.$message.error('权限没有开通，请发送邮件联系管理员sunqing8@xdf.cn申请开通。');
            return
          } else if (this.componentExistenceImgOrFile("imgupload")) {
            this.$message.error('图片或文件上传组件只能添加一次');
            return
          }
          obj.values = "";

        } else if (type == "fileupload") {//文件上传
          if (this.enable_attachment != 1) {
            this.$message.error('权限没有开通，请发送邮件联系管理员sunqing8@xdf.cn申请开通。');
            return
          } else if (this.componentExistenceImgOrFile("fileupload")) {
            this.$message.error('图片或文件上传组件只能添加一次');
            return
          }
          obj.values = "";


        }
        this.formList.push(obj)
      },
      setedititem:function (item){
        this.formList[this.currentItemInputIndex]=item;
      },
     /* //联系人组件增加，增加基础组件
      contactComponent: function (type, namevalue, group, alt, bindType) {//联系人组件增加，增加基础组件
        var isComponentExistence = this.componentExistence(namevalue);
        if (isComponentExistence) {
          this.$message.error('联系人组件不能重复添加');
          return
        }
        var obj = {
          group: group,//基础组件还是非基础组件
          label: namevalue,//组件名字
          type: type,//组件类型
          bindType: bindType,
          id: ++this.numberID,
          placeholder: '',
          alt: alt,//联系人组件输入框类型  如 姓名--name 手机--mobile
          required: false,//是否必选，默认非必选
          choiceNumber: ""//多选框设置可选数量。默认为空，不限制勾选数量
        };
        if (type == "input") {

        } else if (type == "sex") {
          obj.values = [{
            "name": "男",
            "value": 1
          },
            {
              "name": "女",
              "value": 0
            }
          ];
          obj.picked = "0"//默认转中value

        } else if (type == "dateBirth") {

        } else if (type == "selectoptions") {//年龄、
          obj.values = [
            {
              value: "",
            }
          ];

          obj.picked = "0";

        } else if (type == "selectoptionsXQ") {//校区
          obj.values = [

          ];
          obj.schoolList = [];
          obj.schoolAppoint = "";
          obj.schoolarea = [];
          obj.values = [ {
            sCode:"请选择校区",
            sName:"请选择校区"
          }];
          obj.allselect = false;

          $.ajax(
            {
              url: "/collection/ajax_school",
              method: "GET",
              dataType: "json",
              data: ""
            }
          ).then(function (data) {
            obj.schoolList = data.data;
            obj.schoolAppoint = globalOpt.current_schoolid == 0 ? 1 : globalOpt.current_schoolid;
            var that = this;
            $.ajax(
              {
                url: "/collection/ajax_schoolarea",
                method: "GET",
                dataType: "json",
                data: {schoolid: obj.schoolAppoint}
              }
            ).then(function (data) {
//schoolarea

              obj.schoolarea = data.data;


            }, function (err) {

            })
          }, function (err) {

          })
        } else if (type == "selectPMC") {//行政区
          obj.province = [];//省列表
          obj.ProvinceAppoint = "";//默认省份

          obj.cityAppoint = "";
          obj.cityList = [];//市列表
          obj.picked = "0"//是否限定省市0：不限定 1指定省  2：指定市

          $.ajax(
            {
              url: "/collection/ajax_province",
              method: "GET",
              dataType: "json",
              data: ""
            }
          ).then(function (data) {
            obj.province = data.data;

            obj.ProvinceAppoint = 0;
            let that = this;
            $.ajax(
              {
                url: "/collection/ajax_city",
                method: "GET",
                dataType: "json",
                data: {id: obj.ProvinceAppoint}
              }
            ).then(function (data) {
              obj.cityList = data.data;
              obj.cityAppoint = data.data[0];

            }, function (err) {

            })
          }, function (err) {

          })
        } else if (type == "checkbox") {//多选
          obj.values = [];
          obj.values.push({
            name: ""
          });

        } else if (type == "radio") {//单选
          obj.values = [];
          obj.values.push({
            name: ""
          });

        } else if (type == "radioandcheckbox") {//年级
          obj.picked = 2;//1复选，2单选
          obj.allselect = false
          obj.values = [];
          //obj.bindvalues=obj.values;
          obj.valuesys = ["1年级", "2年级", "3年级", "4年级", "5年级", "6年级", "7年级", "8年级", "9年级", "高一", "高二", "高三", "高考复习", "大一", "大二", "大三", "大四", "大五", "研一", "研二", "研三", "博一", "博二", "6年级（初中）", "在职", "学前-幼儿园", "中学生（无法区分初高中）"]

        } else if (type == "textarea") {//年级


        } else if (type == "describe") {//年级


        } else if (type == "selectoptionsdynamic") {//下拉框
          obj.values = [];
          obj.values.push({
            name: ""
          });


        } else if (type == "dateTime") {//基础类组件日期
          obj.values = "date";
        }else if (type == "imgupload") {//图片上传
          if (this.enable_image != 1) {
            this.$message.error('权限没有开通，请发送邮件联系管理员sunqing8@xdf.cn申请开通。');
            return
          } else if (this.componentExistenceImgOrFile("imgupload")) {
            this.$message.error('图片或文件上传组件只能添加一次');
            return
          }
          obj.values = "";

        } else if (type == "fileupload") {//文件上传
          if (this.enable_attachment != 1) {
            this.$message.error('权限没有开通，请发送邮件联系管理员sunqing8@xdf.cn申请开通。');
            return
          } else if (this.componentExistenceImgOrFile("fileupload")) {
            this.$message.error('图片或文件上传组件只能添加一次');
            return
          }
          obj.values = "";


        }
        this.formList.push(obj)
      },*/
      //判断联系人组件是否重复添加了
      componentExistence: function (namevalue) {
        var list = this.formList;
        var isboolen = false;
        if (namevalue.length > 0) {
          for (var i = 0; i < list.length; i++) {
            var obj = list[i];
            if (obj.label == namevalue && obj.group == "basics") {
              isboolen = true;
              break;
            }
          }
        }
        return isboolen

      },
      //判断基础类组件的图片上传和文件上传是否重复添加了
      componentExistenceImgOrFile: function (type) {
        var list = this.formList;
        var isboolen = false;
        if (type.length > 0) {
          for (var i = 0; i < list.length; i++) {
            var obj = list[i];
            if ((obj.type == 'imgupload'||obj.type == 'fileupload' )&& obj.group == "dynamic") {
              isboolen = true;
              break;
             /* if (obj.type == 'imgupload'||obj.type == 'fileupload') {
                isboolen = true;
                break;
              } else if (obj.type == 'fileupload') {
                isboolen = true;
                break;
              }*/

            }
          }
        }
        return isboolen

      },
      //footer底部组件新增
      contactComponentFooter: function () {
        this.numberID=this.numberID+1
        var obj = {
          group: "",//基础组件还是非基础组件
          label: "",//组件名字
          type: "footer",//组件类型
          id: this.numberID,
          placeholder: '0',
          required: true,//是否必选，默认非必选
          select: ["img", "text", "imgandtext", "describe"],
          values: "img",
          imgURL: "",
          urlRoute: "",
          content: "",
          title: "",
          description: "",//图片说明，为了seo
          describe: ""//文字描述
        };
        this.formFooter.push(obj)
      },
      //已添加的组件点击后在在右侧进行编辑
      formInputClick: function (index, item) {

        this.currentItemInput = item;
        this.currentItemInputIndex = index;
        this.currentItemType = item.type;
        this.isOpenGlobalSet = false
        this.isOpenBanner = false
        this.isOpenHead = false;
        this.componentsFoEdit=null
        if(item.type=='score'){
          this.componentsFoEdit="ScoreComponent"

        }
      },
      //已添加的底部Footer组件点击后在在右侧进行编辑
      formFooterClick: function (index, item) {
        this.currentItemInput = item;
        this.currentItemInputIndex = index;
        this.currentItemType = item.type;
        this.isOpenGlobalSet = false;
        this.isOpenBanner = false;
        this.isOpenHead = false;
      },
      //banner设置
      openBannerClick: function () {
        this.isOpenBanner = true;
        this.isOpenHead = false;
        this.isOpenGlobalSet = false;
        this.currentItemInputIndex = -1;

        this.currentItemType = ""
      },
      //打开全局设置
      openGlobalSetClick: function () {
        this.isOpenGlobalSet = true;
        this.isOpenBanner = false;
        this.isOpenHead = false;
        this.currentItemInputIndex = -1;
        this.currentItemType = ""
      },
      //设置表头信息
      openHeadClick: function () {
        this.isOpenHead = true;
        this.isOpenBanner = false;
        this.isOpenGlobalSet = false;
        this.currentItemInputIndex = -1;
        this.currentItemType = ""
      },
      //提交按钮编辑click
      submitEdit: function (index, item, submitObjKey) {
        this.currentItemInput = item;
        this.currentItemInputIndex = index;
        this.currentItemType = item.type;
        this.submitObjKey = submitObjKey;
        this.isOpenGlobalSet = false;
        this.isOpenBanner = false;
        this.isOpenHead = false;
      },
      formCopyrightClick: function () {
        this.isOpenGlobalSet = false;
        this.isOpenBanner = false;
        this.isOpenHead = false;
        this.currentItemInputIndex = -1;
        this.currentItemType = "copyright"
      },
      //删除联系人组件
      removeForm: function (index) {//删除标签项
        this.formList.splice(index, 1);
        this.isOpenHead = false;
        this.isOpenBanner = false;
        this.isOpenGlobalSet = true;
        this.currentItemInputIndex = -1;
        this.currentItemType = "";

      },
      //删除Footer底部组件
      removeFooter: function (index) {//删除标签项
        this.formFooter.splice(index, 1);
        this.isOpenHead = false;
        this.isOpenBanner = false;
        this.isOpenGlobalSet = true;
        this.currentItemInputIndex = -1;
        this.currentItemType = "";

      },
      provinceChange: function () {
        let that = this;
        $.ajax(
          {
            url: "/collection/ajax_city",
            method: "GET",
            dataType: "json",
            data: {id: this.formList[this.currentItemInputIndex].ProvinceAppoint}
          }
        ).then(function (data) {
          that.formList[that.currentItemInputIndex].cityList = data.data;
          that.formList[that.currentItemInputIndex].cityAppoint = data.data[0];

        }, function (err) {

        })

      },

      
      addSelectOptions: function (index) {
        var obj = {};
        obj.value = "";
        //obj.name=obj.value;
        this.formList[this.currentItemInputIndex].values.splice(++index, 0, obj)
      },
      addSelectOptionsCurriculum: function (index) {
        var obj = {};
        obj.name = "";
        //obj.name=obj.value;
        this.formList[this.currentItemInputIndex].values.splice(++index, 0, obj)
      },
      delSelectOptionsCurriculum: function (index) {
        var obj = {};
        obj.name = "";
        //obj.name=obj.value;
        this.formList[this.currentItemInputIndex].values.splice(index, 1);
      },
      //增加二级联动的一级选项
      addSelectTwoOptions: function (index) {
        var obj =   {
            firstSelect:{name:""},
            secondSelect:[{name:""}]
          };

        this.formList[this.currentItemInputIndex].values.splice(++index, 0, obj)
      },
      //删除二级联动的一级选项
      delSelectTwoOptions: function (index) {
        var obj =   {
          firstSelect:{name:""},
          secondSelect:[{name:""}]
        };

        this.formList[this.currentItemInputIndex].values.splice(index, 1)
      },
    //增加二级联动的二级选项
    addSelectTwoEecondOptions: function (index,itemindex) {

      this.formList[this.currentItemInputIndex].values[index].secondSelect.splice(++itemindex, 0, {name:""})
     // this.formList[this.currentItemInputIndex].values.splice(++index, 0, obj)
    },
    //评分
      fullMarksClick: function (index){
        this.formList[this.currentItemInputIndex].fullmarks=index;
      },
      fullMarksStyleClick:function(style){
          this.formList[this.currentItemInputIndex].fullMarksStyle=style;
      },
      delSelectTwoEecondOptions: function (index,itemindex) {

        this.formList[this.currentItemInputIndex].values[index].secondSelect.splice(itemindex, 1)
        // this.formList[this.currentItemInputIndex].values.splice(++index, 0, obj)
      },
      
      schoolChange: function () {
        var that = this;
        $.ajax(
          {
            url: "/collection/ajax_schoolarea",
            method: "GET",
            dataType: "json",
            data: {schoolid: this.formList[this.currentItemInputIndex].schoolAppoint}
          }
        ).then(function (data) {
//schoolarea
          that.formList[that.currentItemInputIndex].allselect=false;//取消全选
          that.formList[that.currentItemInputIndex].values=[ {
            sCode:"请选择校区",
            sName:"请选择校区"
          }];//清空编辑区已经选择的选项
          that.formList[that.currentItemInputIndex].schoolarea = data.data;


        }, function (err) {

        })
      },
      allselectChange: function () {
        var objshcool = this.formList[this.currentItemInputIndex]
        if (objshcool.allselect) {

          for (var i = 0; i < objshcool.schoolarea.length; i++) {
            var obj = objshcool.schoolarea[i];
            objshcool.values.push(obj)
          }
        } else {
          objshcool.values = [
            {
              sCode:"请选择校区",
              sName:"请选择校区"
            }
          ];
        }

      },
      allselectGradeChange: function () {
        var objshcool = this.formList[this.currentItemInputIndex]
        if (objshcool.allselect) {

          for (var i = 0; i < objshcool.valuesys.length; i++) {
            var obj = objshcool.valuesys[i];
            objshcool.values.push(obj)
          }
        } else {
          objshcool.values = [];
        }

      },
      //单选框选项新增
      addRaido: function (index) {
        this.formList[this.currentItemInputIndex].values.splice(++index, 0, {name: "",id:new Date().getTime()})
      },
      //单选框选项删除
      delRaido: function (index) {
        this.formList[this.currentItemInputIndex].values.splice(index, 1)
      },

      addCheckbox: function (index) {
        this.formList[this.currentItemInputIndex].values.splice(++index, 0, {name: "",id:new Date().getTime()});

      },
      delCheckbox: function (index) {
        this.formList[this.currentItemInputIndex].values.splice(index, 1)
      },
      addSelectBasics: function (index) {
        this.formList[this.currentItemInputIndex].values.splice(++index, 0, {name: ""})
      },
      delSelectBasics: function (index) {
        this.formList[this.currentItemInputIndex].values.splice(index, 1)
      },
      removeSelectOptions: function (index) {
        this.formList[this.currentItemInputIndex].values.splice(index, 1)
      },
      //一下四个function是拖拽使用
      onDrop: function (collection, dropResult) {//拖拽表单排序
        this[collection] = applyDrag(this[collection], dropResult);
        this.isOpenGlobalSet = true;
        this.isOpenBanner = false;
        this.isOpenHead = false;
        this.currentItemInputIndex = -1;
        this.currentItemType = ""
      },
      onDroptwo: function (dropResult) {//拖拽表单排序
        this.formSubmit = applyDrag(this.formSubmit, dropResult);
      },
      getChildPayloadu: function (i) {
        return this.formList[i]
      },
      getChildPayloadp: function (i) {
        return this.formSubmit[i]
      },
      getChildPayloadFooter: function (i) {
        return this.formFooter[i]
      },
      //底部组件图片上传
      handleAvatarSuccess(res, file) {
        if(res.errno==0){
          this.formFooter[this.currentItemInputIndex].imgURL = this.staticURL+"/public/uploads/collection/" + res.data.path;
          this.formFooter[this.currentItemInputIndex].urlRoute = res.data;
        }else{
          this.$message.error(res.msg);
        }

        //this.formFooter[this.currentItemInputIndex].imgURL = URL.createObjectURL(file.raw);


      },
      //banner组件图片上传
      bannerHandleAvatarSuccess(res, file) {
        if(res.errno==0){
          this.banner.imgURL = this.staticURL+"/public/uploads/collection/" + res.data.path;
          this.banner.urlRoute = res.data;
        }else{
          this.$message.error(res.msg);
        }
        //this.banner.imgURL = URL.createObjectURL(file.raw);


      },
      //验证文件大小
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        //const isLt2M = file.size / 1024 / 1024 < 2;
        const isLt2M = file.size / 1024 < 100;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 100K!');
        }
        return isJPG && isLt2M;
      },
      //预览关闭按钮
      closeDialogVisible: function () {
        this.dialogVisible = false;
      },
      //预览
      preview: function () {
        var that = this;
        let globalIsOk=this.saveVerificationGlobal();
        if(globalIsOk){
          this.isSetGlobal=true;
          this.isSetGlobalTitle=globalIsOk;
          return
        };
        let placeholderIsOk=this.saveVerificationNoplaceholder();
        //专题模板才验证表单是否都添加了placeholder提示语
        if(this.globalSet.template=='2'&&placeholderIsOk){
          this.saveOrPreview="preview";
          this.isnoplaceholder=true;
          return
        }
        this.ajaxSavePush(function (data) {
          that.dialogVisible = true;
          that.previewSRC = '/collection/preview?id=' + globalOpt.id + '&time=' + new Date().getTime()
          //window.location.href='/collection/preview?id='+globalOpt.id;
        })

      },
      //退出
      exit: function () {
        this.isExit = true;
      },
      //保存
      goSave: function (issave) {
        var that = this;

        if (issave) {
          this.isExit = false;
          this.ajaxSavePush(function (data) {
            window.location.href = '/collection/mycollection'
          })
        } else {
          window.location.href = '/collection/mycollection'
        }
      },
      //验证Global
      saveVerificationGlobal: function () {


        if (this.globalSet.label.length < 1) {

          this.isSetGlobalTitle = "请设置收集项名称";
          return "请设置收集项名称"
        } else if (this.globalSet.type == '0') {

          this.isSetGlobalTitle = "请选择收集项类型";
          return "请选择收集项类型"
        } /*else if (this.globalSet.keyWorld.length < 1) {
         this.isSetGlobal = true;
         this.isSetGlobalTitle = "请设置关键词";
         return
         }*/ else if (this.globalSet.emailFrequency == '0') {

          this.isSetGlobalTitle = "请设置邮件频率";
          return "请设置邮件频率"
        } else if (this.globalSet.viewMode == '0') {

          this.isSetGlobalTitle = "请设置查重方式";
          return "请设置查重方式"
        }
        return "";
      },
      //验证Noplaceholder
      saveVerificationNoplaceholder: function () {
        this.noPlaceholder=[];
        let noPlaceholderList=[];
        for (var i = 0; i < this.formList.length; i++) {
          var obj = this.formList[i];
          if(obj.group=="basics"){
            if(obj.alt=="name"||obj.alt=="mobile"||obj.alt=="email"||obj.alt=="wechat"||obj.alt=="qq"){
              if(!obj.placeholder){
                this.noPlaceholder.push(obj);
                noPlaceholderList.push(obj);
              }
            }
          }else{
            if(obj.type=="input"||obj.type=="textarea"||obj.type=="describe"){
              if(!obj.placeholder){
                this.noPlaceholder.push(obj);
                noPlaceholderList.push(obj);
              }
            }
          }

        }
        if(this.noPlaceholder.length>0){


          return noPlaceholderList
        }else {
          return false
        }
      },
      //确定发布不设置提示语placeholder；
      noSetPlaceholder: function () {
        let that=this;

        this.isnoplaceholder=false;
        if(this.saveOrPreview=="save"){
          this.ajaxSavePush(function (data) {

            that.isSuccess = true
          })
        }else {
          this.ajaxSavePush(function (data) {
            that.dialogVisible = true;
            that.previewSRC = '/collection/preview?id=' + globalOpt.id + '&time=' + new Date().getTime()
            //window.location.href='/collection/preview?id='+globalOpt.id;
          })
        }
      },
      yesSetPlaceholder: function () {
        this.isnoplaceholder=false;
      },
      //保存数据
      ajaxSavePush: function (callback) {
       /* if (this.globalSet.label.length < 1) {
          this.isSetGlobal = true;
          this.isSetGlobalTitle = "请设置收集项名称";
          return
        } else if (this.globalSet.type == '0') {
          this.isSetGlobal = true;
          this.isSetGlobalTitle = "请选择收集项类型";
          return
        } /!*else if (this.globalSet.keyWorld.length < 1) {
          this.isSetGlobal = true;
          this.isSetGlobalTitle = "请设置关键词";
          return
        }*!/ else if (this.globalSet.emailFrequency == '0') {
          this.isSetGlobal = true;
          this.isSetGlobalTitle = "请设置邮件频率";
          return
        } else if (this.globalSet.viewMode == '0') {
          this.isSetGlobal = true;
          this.isSetGlobalTitle = "请设置查重方式";
          return
        }

        let noPlaceholder=[];
        for (var i = 0; i < this.formList.length; i++) {
          var obj = this.formList[i];
          if(obj.group=="basics"){
            if(obj.alt=="name"||obj.alt=="mobile"||obj.alt=="email"||obj.alt=="wechat"||obj.alt=="qq"){
              if(!obj.placeholder){
                this.noPlaceholder.push(obj);
              }
            }
          }else{
              if(obj.type=="imput"||obj.type=="textarea"||obj.type=="describe"){
                if(!obj.placeholder){
                  this.noPlaceholder.push(obj);
                }
              }
          }

        }
        if(this.noPlaceholder.length>0){
this.isnoplaceholder=true;

          return
        }



*/
        this.fullscreenLoading = true;
        this.globalSet.keyWorld = this.globalSet.keyWorld.replace(/\，/g, ",");
        var that = this;
        $.post("/collection/ajax_collectionsave", {
          id: globalOpt.id,
          content: JSON.stringify({
            formList: this.formList,
            formFooter: this.formFooter,
            submitObj: this.submitObj,
            globalSet: this.globalSet,
            banner: this.banner,
            formCopyright:this.formCopyright
          }),
          banner: this.banner,
          title: this.globalSet.label,
          collectiontype: this.globalSet.type,
          begin_time: this.globalSet.time[0] / 1000,
          end_time: this.globalSet.time[1] / 1000,

          keyword: this.globalSet.keyWorld,
          notify: this.globalSet.emailFrequency,
          duplicate_check: this.globalSet.viewMode,
          is_push: this.globalSet.isPush ? 1 : 0,
        }, function (data) {
          that.fullscreenLoading = false;
          if (data.errno == 0) {

            callback();
          } else {
            that.$message.error(data.msg);
            return
          }

        });
      },
      collectionSave: function () {
        var that = this;

        let globalIsOk=this.saveVerificationGlobal();
        if(globalIsOk){
          this.isSetGlobal=true;
          this.isSetGlobalTitle=globalIsOk;
          return
        };
        let placeholderIsOk=this.saveVerificationNoplaceholder();
 //专题模板才验证表单是否都添加了placeholder提示语
        if(this.globalSet.template=='2'&&placeholderIsOk){
          this.saveOrPreview="save";
          this.isnoplaceholder=true;
          return
        }

        this.ajaxSavePush(function (data) {

          that.isSuccess = true
        })
        /*  $.ajax(
         {
         url: "/collection/ajax_collectionsave",
         method: "POST",
         dataType: "JSON",
         data: JSON.stringify({
         id:2,
         content:JSON.stringify({
         formList:JSON.stringify(this.formList),
         formFooter:JSON.stringify(this.formFooter),
         submitObj:JSON.stringify(this.submitObj),
         globalSet:JSON.stringify(this.globalSet)
         })
         })
         }
         ).then(function (data) {

         console.log(data);
         }, function (err) {
         console.log(err);
         })*/
      },
      successComplete: function () {
        this.isSuccess = false;
        window.location.href = '/collection/mycollection';
      },
      goSetGlobal: function (val) {
        if (val) {
          this.isOpenHead = false;
          this.isOpenBanner = false;
          this.isOpenGlobalSet = true;
          this.currentItemInputIndex = -1;
          this.currentItemType = "";

        } else {

        }
        this.isSetGlobal = false;
      }
    },
    computed: {
      inpNum: {
        get: function () {
          return this.formList[this.currentItemInputIndex].choiceNumber;

        },
        set: function (newValue) {
          //this.oldNum=newValue.replace(/[^\d]/g,'');
          this.formList[this.currentItemInputIndex].choiceNumber = newValue.replace(/[^\d]/g, '');
        }
      }
    },
    mounted: function () {
      var that = this;
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      $.ajax(
        {
          url: "/collection/ajax_collectiondetail",
          method: "GET",
          dataType: "json",
          data: {id: globalOpt.id}
        }
      ).then(function (data) {
        loading.close();
        if (data.errno == 0 && data.data.content.length > 0) {
          var content = JSON.parse(data.data.content);
          that.formList = content.formList;
          that.formFooter = content.formFooter;
          that.submitObj = content.submitObj;
          that.globalSet = content.globalSet;
          that.banner = content.banner;
          if(content.formCopyright){
            that.formCopyright= content.formCopyright
          }

        }


        that.globalSet.label = data.data.title;

        that.globalSet.time = [];
        that.globalSet.time[0] = data.data.begin_time * 1000;
        that.globalSet.time[1] = data.data.end_time * 1000;
        that.globalSet.type = data.data.collectiontype;
        that.globalSet.keyWorld = data.data.keyword,
          that.globalSet.emailFrequency = data.data.notify,
          that.globalSet.viewMode = data.data.duplicate_check,
          that.globalSet.isPush = data.data.is_push == 1 ? true : false,
          that.globalSet.template = data.data.template

      }, function (err) {

      })
    }
  }
  $(function () {
    /*根据浏览器窗口的变化，动态添加高度*/
    $(window).resize(function () {
      var h = $(window).height() - 42;
      var w = $(".GlobalSettingContent").width() - 602;
      var h1 = h - 54;
      $(".section").css("height", h + "px");
      $(".sectionRBoxDown").css("height", h1 + "px");
      $(".sectionZ").css("width", w + "px");
    }).resize();

  });
  $(document).ready(function () {
    /*模态框关闭*/
    $("#Close").click(function () {
      $("#ModalFrame").hide();
    })
  });
</script>

<style>
  .smooth-dnd-container div.formGroup {
    box-sizing: content-box;
  }
 .sectionRBoxDownBoxCon>div > div.NlAndTJ {
    width: 280px;
    clear: both;
}



.sectionRBoxDownBoxCon >div > div.NlAndTJ > input {
    margin-top: 10px;
    float: left;
    display: inline-block;
    border: 1px solid #dfdfdf;
    width: 196px;
    height: 30px;
    padding-left: 9px;
    padding-right: 9px;
    color: #333;
    font-size: 12px;
}
.sectionRBoxDownBoxCon >div > input {
    margin-top: 10px;
}
.sectionRBoxDownBoxCon >div > div.NlAndTJ > em {
    margin-top: 14px;
    /*margin-bottom: 50px;*/
    float: left;
    display: inline-block;
    width: 21px;
    height: 21px;
}

.sectionRBoxDownBoxCon >div > div.NlAndTJ > em.emJIA {
    margin-left: 12px;
    background: url(../../../images/QJSZImg/JIAImg.png) no-repeat center center;
}

.sectionRBoxDownBoxCon >div > div.NlAndTJ > em.emJIAN {
    margin-left: 10px;
    background: url(../../../images/QJSZImg/JIANImg.png) no-repeat center center;
}
</style>
