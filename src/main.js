let $siteList = $('.siteList')
let $last = $siteList.find('li.last')
let hash = localStorage.getItem('hash')
let hashObj = JSON.parse(hash)
const hashMap = hashObj || [
    { logo: 'B', url: 'https://bilibili.com' },
    { logo: 'A', url: 'https://baidu.com' },
]
const beautifyUrl = (url) => {
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/g, '')
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`
             <li>
                     <div class="site">
                         <div class="logo">${node.logo}</div>
                         <div class="link">${beautifyUrl(node.url)}
                         </div>
                         <div class="close">
                            X
                        </div>
                    </div>
             </li>
             `
        ).insertBefore($last)
        $li.click(() => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    })
}
render()

$('.addButton').click(() => {
    let url = window.prompt('请输入网址')
    if (!url) { return }
    if (url.indexOf('https') !== 0) {
        url = 'https://' + url
    }
    hashMap.push({ logo: beautifyUrl(url)[0].toUpperCase(), url: url })
    render()
})

window.onbeforeunload = () => {
    let string = JSON.stringify(hashMap)
    console.log(string)
    window.localStorage.setItem('hash', string)
}

$(document).on('keydown', (e) => {
    let { key } = e
    hashMap.map(node=>{
        if(node.logo.toLowerCase() === key){
            window.open(node.url)
        }
    })
})