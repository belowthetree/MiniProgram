// component/sharebar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src:{
      type:String,
      value:'/icons/人名.png',
    },
    text:{
      type:String,
      value: '介绍： 精心挑选百首百位:〔实力派&开口脆〕',
    },
    user:{
      type:String,
      value:"小小小",
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    src:"",
    text:"",
    user:"",
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  created:function(e){
    this.data.src = this.properties.src
    this.data.text = this.properties.text
    this.data.user = this.properties.user
  }
})
