let image = "https://t00.deviantart.net/2j8sOi__1no2944FC4kGZYFSfLg=/fit-in/700x350/filters:fixed_height(100,100):origin()/pre00/e5df/th/pre/i/2018/080/6/a/sleep_paralysis_by_madink2000-dc6itym.jpg"

let end = (image.search(/gif|jpg|png/))
let beginning = (image.search("http"))
let all = image.slice(beginning, end + 3)
console.log(all)
