// pages/province/province.js
let province = null

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // province_name: '陕西',
        // poem_name: '和贾舍人早朝大明宫之作',
        // author: '王维',
        // poem_content: '绛帻鸡人送晓筹，尚衣方进翠云裘。\n' +
        //     '九天阊阖开宫殿，万国衣冠拜冕旒。\n' +
        //     '日色才临仙掌动，香烟欲傍衮龙浮。\n' +
        //     '朝罢须裁五色诏，佩声归向凤池头。\n',
        // translation: '戴着红巾的卫士在宫门报晓，尚衣官员向天子进上绣着翠云的皮袍。层层叠叠的宫殿如九重天门迤逦打开，异邦万国的使臣一齐向着皇帝跪见朝拜。日色刚刚照临到殿堂，仪仗已排列成扇形屏障。御炉中香烟袅袅，缭绕着天子的龙袍浮动飘忽。早朝过后中书省的官员退到凤凰池上，用五色彩纸起草皇上的诏书。',
        // introduction: '王维，唐代诗人。字摩诘。原籍祁（今属山西），其父迁居蒲州（治今山西永济西），遂为河东人。开元（唐玄宗年号，713—741）进士。累官至给事中。安禄山叛军陷长安时曾受职，乱平后，降为太子中允。后官至尚书右丞，故亦称王右丞。晚年居蓝田辋川，过着亦官亦隐的优游生活。诗与孟浩然齐名，并称“王孟”。前期写过一些以边塞题材的诗篇，但其作品最主要的则为山水诗，通过田园山水的描绘，宣扬隐士生活和佛教禅理；体物精细，状写传神，有独特成就。兼通音乐，工书画。有《王右丞集》。 \n',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this
        province = options.name
        wx.request({
            url: getApp().globalData.url + '/api/get_poem',
            data: {
                province: province
            },
            method: 'GET',
            header: {
                'content-type': 'application/json' //默认值
            },
            success: function (res) {
                const data = res.data
                if (res.data.status) {
                    that.setData({
                        province_name: data['name'],
                        poem_name: data['poem_name'],
                        author: data['author'],
                        poem_content: data['poem_content'],
                        translation: data['translation'],
                        introduction: data['introduction']
                    });
                    // console.log(that.data.poem_name);
                } else {
                    console.log('sadad')
                }
            },
            fail: function (res) {
                console.log(res.state)
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    goTest: function () {
        wx.navigateTo({
            url: '../test/test?name=' + province
        })
    }
})
