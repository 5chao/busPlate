// components/select/select.ts
Component({
    externalClasses: ["custom-class"],
    /**
     * 组件的属性列表
     */
    properties: {
        data: {
            type: Array,
            value: [],
        },
        showOption: {
            type: Boolean,
            value: false,
        },
        selected: {
            type: String,
            value: "",
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        selected: "",
    },

    /**
     * 组件的方法列表
     */
    methods: {
        toggleHandle: function() {
            /*this.setData({
                showOption: !this.data.showOption,
            });*/
            this.triggerEvent("tap", {});
        },
        selectHandle: function(e: any) {
            if (e.target.dataset.data) {
                this.setData({
                    showOption: false,
                    selected: e.target.dataset.data,
                });
                this.triggerEvent("select", e.target.dataset.data);
            }
        },
    }
})
