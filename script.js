let canvas = document.getElementById("canvas")
canvas.width = Math.min(500, window.innerWidth)///10
canvas.height = Math.min(500, window.innerHeight)///10
let ctx = canvas.getContext("2d")
let t = 0//document.getElementById("z-val")
noise.seed(Math.random())
/*let zoom = 120
let backSpeed = 0
let backgroundZoom = 1
if (/Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  backgroundZoom = 30
}*/
let mode = {
  subtractAlpha: false,
  onlyGreen: false,
  redUntil:0.25,
  backSpeed: 0,
  backgroundZoom: 1,
  zoom: 120,
  fallSpeed: 0.01,
  greenPerc: 0.1,
  replaceForeground:true
}
document.getElementById("only-green").addEventListener("click",()=>{
  mode.onlyGreen=event.target.checked
})
document.getElementById("subtAlpha").addEventListener("click",()=>{
  mode.subtractAlpha=event.target.checked
})
document.getElementById("greenPerc").addEventListener("mousemove",()=>{
  mode.greenPerc=Number(event.target.value)
})
document.getElementById("z-speed").addEventListener("mousemove",()=>{
  mode.fallSpeed=Number(event.target.value)
})
document.getElementById("front-zoom").addEventListener("mousemove",()=>{
  mode.zoom=Number(event.target.value)
})
document.getElementById("back-zoom").addEventListener("mousemove",()=>{
  mode.backgroundZoom=Number(event.target.value)
})
document.getElementById("red-until").addEventListener("mousemove",()=>{
  mode.redUntil=Number(event.target.value)
})
document.getElementById("replace-fore").addEventListener("click",()=>{
  mode.replaceForeground=event.target.checked
})
function update() {
  let { subtractAlpha, onlyGreen, backSpeed, backgroundZoom, zoom, fallSpeed, greenPerc, redUntil, replaceForeground } = mode
  t += fallSpeed
  let imData = ctx.createImageData(canvas.width, canvas.height)
  let i = 0
  for (let x = 0; x < canvas.width; x++) {
    for (let y = 0; y < canvas.height; y++) {
      let value = Math.abs(noise.perlin3(x / zoom, y / zoom, t))
      let i = (x + y * canvas.width) * 4
      let r = 0, g = 0, b = 0, a = 1
        if (value > redUntil) {
          r = value
        } else {
          b = value
        }
      if (value < greenPerc||replaceForeground) {
        g = 5 * Math.abs(noise.simplex2(x / backgroundZoom + t * backSpeed, y / backgroundZoom + t * backSpeed)) * value
      }
      else if(onlyGreen){
        r=g=b=0
      }
      // g-=0.1
      if(subtractAlpha){
        a=1-value
      }
      /*if(value>0.5){
        //r=g=b=0
        r=Math.random()*0.5//Math.abs(noise.perlin2(x,y))
        //g=value/2
      }*/
      imData.data[i] = r * 255
      imData.data[i + 1] = g * 255
      imData.data[i + 2] = b * 255
      imData.data[i + 3] = a * 255
      i += 4
    }
  }
  //console.log(i,canvas.width*canvas.height)
  ctx.globalAlpha = 0.001
  ctx.putImageData(imData, 0, 0)
  requestAnimationFrame(update)
}
requestAnimationFrame(update)