// components/searchPlate/searchPlate.ts
import {PlateAreaData} from  '../../const/plateAreaData';
import {ParserPlateHtml} from '../../utils/plateUtil';
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        
    },

    /**
     * 组件的初始数据
     */
    data: {
        showCode: false,
        showSubCode: false,
        showBelong: false,
        showDetailResult: false,
        selectedCode: "",
        selectedSubCode: "",
        data: [],
        subData: [],
        plateNumber: "",
        localPlateName: '',
        plateDetail: null,
    },

    lifetimes: {
        attached: function() {
            this.initData();
        },
    },

    /**
     * 组件的方法列表
     */
    methods: {
        initData: function() {
            
            let _data = [];
            Object.keys(PlateAreaData).map((item: string) => {
                _data.push({
                    name: item,
                    area: item,
                });
            })
            this.setData({
                data: _data,
                selectedCode: _data[0].name,
            }, this.changeSubData);
        },
        areaCodeHandle: function() {
            this.setData({
                showCode: true,
                showSubCode: false,
            });
        },
        areaCodeSelect: function(e: any) {
            this.setData({
                showCode: false,
                showSubCode: false,
                selectedCode: e.detail.name,
                selectedSubCode: '',
            }, this.changeSubData);
          
        },
        areaSubCodeSelect: function(e: any) {
            this.setData({
                showCode: false,
                showSubCode: false,
                selectedSubCode: e.detail.name,
            });
        },
        areaSubCodeHandle: function() {
            this.setData({
                showCode: false,
                showSubCode: true,
            });
        },
        changeSubData: function() {
            let _data = PlateAreaData[this.data.selectedCode];
            if (_data) {
                this.setData({
                    subData: _data.list
                });
            }
        },
        belongHandle: function() {
            if (!this.data.selectedCode || !this.data.selectedSubCode) {
                return wx.showToast({
                    icon: "none",
                    title: "请选择区号",
                });
            }
            let _data = PlateAreaData[this.data.selectedCode];
            let _location = _data.province;
            let _city = '';

            _data.list.map((item: any) => {
                if (item.name == this.data.selectedSubCode) {
                    _city = item.area;
                }
            });

            this.setData({
                showBelong: true,
                showDetailResult: false,
                localPlateName: _location + _city,
            });
        },
        numberInputHandle: function(e: any) {
            this.setData({
                plateNumber: e.detail.value,
            })
        },
        belongDetailHandle: function () {
            if (!this.data.selectedCode || !this.data.selectedSubCode) {
                return wx.showToast({
                    icon: "none",
                    title: "请选择区号",
                });
            }

            if (!this.data.plateNumber) {
                return wx.showToast({
                    icon: "none",
                    title: "请输入牌号",
                });
            }

            let _data = PlateAreaData[this.data.selectedCode];
            let shortName = _data.shortName;
            
            wx.request({
                url: "https://www.paodingche.com/carnumber/licenseno/" + shortName + this.data.selectedSubCode + this.data.plateNumber,
                success: (res) =>{
               
                    let _result = ParserPlateHtml(res.data);
                    this.setData({
                        showBelong: false,
                        showDetailResult: true,
                        plateDetail: _result,
                    });
                }
            });
        }
    }
})
