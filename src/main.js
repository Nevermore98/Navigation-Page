const $siteList = $(".site-list")
const $lastLi = $siteList.find("li.last") // 读取 localStorage 中 site 键的值
const site = localStorage.getItem("site") // 将值转化为对象
const siteObject = JSON.parse(site)
const hashMap = siteObject || [
  // 默认总是存在 || 后的网址
  {logo: "A", url: "https://www.acfun.cn"},
  {logo: "B", url: "https://www.bilibili.com"},
  {logo: "J", url: "https://juejin.cn/user/3413315881539149"},
  {logo: "Z", url: "https://www.zhihu.com/"},
]
const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(".com", "")
    .replace(".cn", "")
    .replace(".html", "")
    .replace(/\/.*/, "") // 删除 / 之后的所有内容\
    .replace(/^\S/, s => s.toUpperCase()) // 首字母大写
}

const render = () => {
  $siteList.find("li:not(.last)").remove() //注意 :not 之间没有空格
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
      <div class="site">
        <div class="logo">${node.logo}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close">
          <svg class="icon">
            <use xlink:href="#icon-close"></use>
          </svg></div>
      </div>
    </li>`).insertBefore($lastLi)
    $li.on("click", () => {
      window.open(node.url)
    })
    $li.on("click", ".close", (e) => {
      e.stopPropagation() // 阻止冒泡
      hashMap.splice(index, 1)
      render() // 删掉后重新渲染
    })
  })
}

render()

$(".addButton").on("click", () => {
  let url = window.prompt("请输入网址")
  if (url.indexOf("http") !== 0) {
    url = "https://" + url
  }
  console.log(url)
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url,
  })
  render()
})
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap)
  localStorage.setItem("site", string)
}
