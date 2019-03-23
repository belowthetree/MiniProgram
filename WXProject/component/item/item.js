// component/item/item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content:{
      type:String,
      value:"Hello",
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  attached:function(){
    console.log("attached")
  },

  detached:function(){
    console.log("detached")
  },

  /**
   * 组件的方法列表
   */
  methods: {
    OnClick:function(){
      const myEventDetail = {} // detail对象，提供给事件监听函数
      const myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    }
  }
})
