define(['mui'], function(mui) {
    let _id = JSON.parse(localStorage.getItem('id'))
    console.log(_id)

    function init() {
        getfind(_id)
        delEvent()
    }

    function getfind(id) {
        mui.ajax('/api/getfind', {
            data: {
                id: id
            },
            success(re) {
                console.log(re.data)
                render(re.data)
            }
        })
    }

    function render(data) {
        document.querySelector('.user').value = data[0].user
        document.querySelector('.tel').value = data[0].tel
        document.querySelector('.ads').value = data[0].ads
    }

    function delEvent() {
        const btn = document.querySelector('footer>div')
        btn.addEventListener('tap', gaibian)
    }

    function gaibian() {
        console.log(this)
        let user = document.querySelector('.user').value.trim()
        let tel = document.querySelector('.tel').value.trim()
        let ads = document.querySelector('.ads').value.trim()
        console.log(user, tel, ads)
            // location.ajax = '../../index.html'
        mui.ajax('/api/datafind', {
            type: 'post',
            data: {
                user: user,
                tel: tel,
                ads: ads,
                _id: _id
            },
            success(re) {
                console.log(re)
                if (re.code == 1) {
                    location.ajax = '../../index.html'
                }
            }
        })
    }
    init()
});