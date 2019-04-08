define(['mui'], function(mui) {
    function init() {
        addfind()
    }

    function addfind() {
        const btn = document.querySelector('footer>div')
        btn.addEventListener('tap', tianjia)
    }

    function tianjia() {
        let user = document.querySelector('.user').value.trim()
        let tel = document.querySelector('.tel').value.trim()
        let ads = document.querySelector('.ads').value.trim()
        console.log(user, tel, ads)
        mui.ajax('/api/addfind', {
            type: 'post',
            data: {
                user: user,
                tel: tel,
                ads: ads
            },
            success(re) {
                console.log(re)
                if (re.code == 1) {
                    location.href = '../../index.html'
                }
            }
        })
    }

    init()
});