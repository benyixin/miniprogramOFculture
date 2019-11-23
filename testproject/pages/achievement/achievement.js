// pages/achievement/achievement.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        gone_spots: {
            open: false,
            id:'gone_spots',
            name:'已通关的地点',
            done: false,
        },
        gone_list:[
            {
                id: 'dongbei',
                name: '东北地区',
                done: false
            },
            {
                id: 'huazhong',
                name: '华中地区',
                done: false
            },
            {
                id: 'huadong',
                name: '华东地区',
                done: false
            },
            {
                id: 'huanan',
                name: '华南地区',
                done: false
            },
            {
                id: 'huabei',
                name: '华北地区',
                done: false
            },
            {
                id: 'xinan',
                name: '西南地区',
                done: false
            },
            {
                id: 'xibei',
                name: '西北地区',
                done: false
            }
        ],
        list: [
            {
                id: 'firstSpot',
                name: '首次完成',
                done: false
            },
            {
                id: 'firstFile',
                name: '初次上传',
                done: false
            },
            {
                id: 'firstFriend',
                name: '初次交友',
                done: false
            },
            {
                id: 'poemKing',
                name: '诗词之王',
                done: true
            }
        ]
    },
    kindToggle(e) {
        const id = e.currentTarget.id
        this.data.gone_spots.open = !this.data.gone_spots.open
    }
})
