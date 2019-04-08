define(['mui'], function(mui) {
    const xianshi = document.querySelector('.xianshi')

    let ids = 0;

    function init() {
        getfind()
        addfind()
    }

    function addfind() {
        const add = document.querySelector('footer>div')
        add.addEventListener('tap', function() {
            location.href = '../../page/add.html'
        })
    }

    function getfind() {
        mui.ajax('/api/getfind', {
            success(re) {
                console.log(re.data)
                render(re.data)
            }
        })
    }

    function render(data) {
        const main = document.querySelector('main')
        main.innerHTML = data.map((file, index) => {
            return `
                <div  class="div">
                    <p>${file.user}<span>${file.tel}</span></p>
                    <p>${file.ads}</p>
                    <div class="btns">
                        <span><i id='${index}'></i> 设为默认</span>
                        <button id="${file._id}">删除</button>
                        <button id="${file._id}">修改</button>
                    </div>
                </div>
            `
        }).join('')
        addEvent()
    }

    function addEvent() {
        mui('.btns').on('tap', 'button', deldian)
        mui('.btns').on('tap', 'span', moren)
    }

    function moren() {
        let is = document.querySelectorAll('i')
        console.log(is)
        this.children[0].classList.add('active')
        is[ids].classList.remove('active')
        ids = this.children[0].id
    }

    function deldian() {
        console.log(this)
        let ids = this.id
        if (this.innerHTML == '删除') {
            xianshi.style.display = 'block'

            delxianshi(ids)
        } else if (this.innerHTML == '修改') {
            localStorage.setItem('id', JSON.stringify(ids))
            location.href = '../../page/del.html'
        }
    }

    function delxianshi(ids) {
        const queding = document.querySelector('.queding')
        queding.addEventListener('tap', function() {
            xianshi.style.display = 'none';
            mui.ajax('/api/delfind', {
                data: {
                    _id: ids
                },
                success(re) {
                    if (re.code == 1) {
                        getfind()
                    }
                }
            })
        })
        const cha = document.querySelector('.cha')
        cha.addEventListener('tap', function() {
            xianshi.style.display = 'none'
        })
    }
    init()
});